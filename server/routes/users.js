const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/users/profile/:id
// @desc    Get user profile by ID
// @access  Public
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -googleId');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Server error fetching user profile' });
  }
});

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const Item = require('../models/Item');
    
    const stats = {
      totalPosts: await Item.countDocuments({ userId: req.user._id }),
      lostItems: await Item.countDocuments({ userId: req.user._id, type: 'lost' }),
      foundItems: await Item.countDocuments({ userId: req.user._id, type: 'found' }),
      activePosts: await Item.countDocuments({ userId: req.user._id, status: 'active' }),
      claimedItems: await Item.countDocuments({ userId: req.user._id, status: 'claimed' }),
      returnedItems: await Item.countDocuments({ userId: req.user._id, status: 'returned' })
    };

    res.json(stats);
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error fetching user stats' });
  }
});

module.exports = router;
