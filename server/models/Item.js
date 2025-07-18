const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Electronics',
      'Clothing',
      'Books',
      'Accessories',
      'Sports Equipment',
      'Keys',
      'Documents',
      'Jewelry',
      'Bags',
      'Other'
    ]
  },
  type: {
    type: String,
    required: true,
    enum: ['lost', 'found']
  },
  status: {
    type: String,
    enum: ['active', 'claimed', 'returned', 'expired'],
    default: 'active'
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  specificLocation: {
    type: String,
    trim: true
  },
  dateOccurred: {
    type: Date,
    required: true
  },
  images: [{
    url: String,
    publicId: String
  }],
  contactInfo: {
    phone: String,
    email: String,
    preferredMethod: {
      type: String,
      enum: ['email', 'phone', 'both'],
      default: 'email'
    }
  },
  reward: {
    offered: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Number,
      min: 0
    },
    description: String
  },
  tags: [String],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  lastViewed: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: function() {
      // Auto-expire after 90 days
      return new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
itemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Text search index
itemSchema.index({
  title: 'text',
  description: 'text',
  location: 'text',
  tags: 'text'
});

// Location and category index for filtering
itemSchema.index({ location: 1, category: 1, type: 1, status: 1 });

// Date index for sorting
itemSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Item', itemSchema);
