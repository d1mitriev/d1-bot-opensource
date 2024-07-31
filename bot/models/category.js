const mongoose = require('mongoose');

const сategorySchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    description: { 
        type: String,
        required: true,
    },
    emoji: { 
        type: String,
        required: true,
    },
  });

  const Category = mongoose.models['category_lists'] || mongoose.model('category_lists', сategorySchema);

  module.exports = Category
