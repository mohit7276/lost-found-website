const express = require('express');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Item = require('../models/Item');

const router = express.Router();

// Configure Cloudinary (only if credentials are available)
if (process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_CLOUD_NAME !== 'dummy-cloud-name') {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
} else {
  console.log('⚠️  Cloudinary not configured. Image uploads will be disabled.');
}

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (buffer, folder = 'lost-found') => {
  return new Promise((resolve, reject) => {
    if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === 'dummy-cloud-name') {
      // Return dummy URL for development
      resolve({
        secure_url: 'https://via.placeholder.com/400x300?text=Image+Upload+Disabled',
        public_id: 'dummy-image-' + Date.now()
      });
      return;
    }
    
    cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};

// @route   GET /api/items
// @desc    Get all items with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      type,
      category,
      location,
      search,
      page = 1,
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter query
    const filter = { status: 'active' };
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (location) filter.location = new RegExp(location, 'i');
    
    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Sort options
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const items = await Item.find(filter)
      .populate('userId', 'username avatar')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Item.countDocuments(filter);

    res.json({
      items,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({ message: 'Server error fetching items' });
  }
});

// @route   GET /api/items/:id
// @desc    Get single item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('userId', 'username avatar profile.firstName profile.lastName');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Increment view count
    item.views += 1;
    item.lastViewed = new Date();
    await item.save();

    res.json(item);
  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({ message: 'Server error fetching item' });
  }
});

// @route   POST /api/items
// @desc    Create a new item
// @access  Private
router.post('/', 
  passport.authenticate('jwt', { session: false }),
  upload.array('images', 5),
  [
    body('title').notEmpty().trim().isLength({ max: 100 }),
    body('description').notEmpty().trim().isLength({ max: 1000 }),
    body('category').isIn(['Electronics', 'Clothing', 'Books', 'Accessories', 'Sports Equipment', 'Keys', 'Documents', 'Jewelry', 'Bags', 'Other']),
    body('type').isIn(['lost', 'found']),
    body('location').notEmpty().trim(),
    body('dateOccurred').isISO8601(),
    body('contactInfo.phone').optional().trim(),
    body('contactInfo.email').optional().isEmail(),
    body('reward.offered').optional().isBoolean(),
    body('reward.amount').optional().isNumeric({ min: 0 }),
    body('tags').optional().isArray()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        title,
        description,
        category,
        type,
        location,
        specificLocation,
        dateOccurred,
        contactInfo,
        reward,
        tags
      } = req.body;

      // Upload images to Cloudinary
      let images = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          try {
            const result = await uploadToCloudinary(file.buffer);
            images.push({
              url: result.secure_url,
              publicId: result.public_id
            });
          } catch (uploadError) {
            console.error('Image upload error:', uploadError);
          }
        }
      }

      const item = new Item({
        title,
        description,
        category,
        type,
        location,
        specificLocation,
        dateOccurred,
        images,
        contactInfo: {
          phone: contactInfo?.phone || '',
          email: contactInfo?.email || req.user.email,
          preferredMethod: contactInfo?.preferredMethod || 'email'
        },
        reward: {
          offered: reward?.offered || false,
          amount: reward?.amount || 0,
          description: reward?.description || ''
        },
        tags: tags || [],
        userId: req.user._id
      });

      await item.save();
      await item.populate('userId', 'username avatar');

      res.status(201).json({
        message: 'Item posted successfully',
        item
      });
    } catch (error) {
      console.error('Create item error:', error);
      res.status(500).json({ message: 'Server error creating item' });
    }
  }
);

// @route   PUT /api/items/:id
// @desc    Update an item
// @access  Private
router.put('/:id', 
  passport.authenticate('jwt', { session: false }),
  upload.array('images', 5),
  [
    body('title').optional().trim().isLength({ max: 100 }),
    body('description').optional().trim().isLength({ max: 1000 }),
    body('category').optional().isIn(['Electronics', 'Clothing', 'Books', 'Accessories', 'Sports Equipment', 'Keys', 'Documents', 'Jewelry', 'Bags', 'Other']),
    body('status').optional().isIn(['active', 'claimed', 'returned', 'expired']),
    body('location').optional().trim(),
    body('dateOccurred').optional().isISO8601(),
    body('contactInfo.phone').optional().trim(),
    body('contactInfo.email').optional().isEmail(),
    body('reward.offered').optional().isBoolean(),
    body('reward.amount').optional().isNumeric({ min: 0 }),
    body('tags').optional().isArray()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const item = await Item.findById(req.params.id);
      
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      // Check if user owns the item
      if (item.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this item' });
      }

      // Handle new image uploads
      let newImages = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          try {
            const result = await uploadToCloudinary(file.buffer);
            newImages.push({
              url: result.secure_url,
              publicId: result.public_id
            });
          } catch (uploadError) {
            console.error('Image upload error:', uploadError);
          }
        }
      }

      // Update fields
      const updates = req.body;
      if (newImages.length > 0) {
        updates.images = [...item.images, ...newImages];
      }

      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true }
      ).populate('userId', 'username avatar');

      res.json({
        message: 'Item updated successfully',
        item: updatedItem
      });
    } catch (error) {
      console.error('Update item error:', error);
      res.status(500).json({ message: 'Server error updating item' });
    }
  }
);

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user owns the item
    if (item.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    // Delete images from Cloudinary
    for (const image of item.images) {
      if (image.publicId) {
        try {
          await cloudinary.uploader.destroy(image.publicId);
        } catch (error) {
          console.error('Error deleting image from Cloudinary:', error);
        }
      }
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ message: 'Server error deleting item' });
  }
});

// @route   GET /api/items/user/me
// @desc    Get current user's items
// @access  Private
router.get('/user/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { page = 1, limit = 12, type, status } = req.query;

    const filter = { userId: req.user._id };
    if (type) filter.type = type;
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const items = await Item.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Item.countDocuments(filter);

    res.json({
      items,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get user items error:', error);
    res.status(500).json({ message: 'Server error fetching user items' });
  }
});

module.exports = router;
