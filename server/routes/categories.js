const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const categoriesFilePath = path.join(__dirname, '..', 'data', 'categories.json');

function getCategories() {
  try {
    const rawData = fs.readFileSync(categoriesFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error('Error reading categories file:', err);
    return [];
  }
}

// GET /api/categories
router.get('/', (req, res) => {
  try {
    const categories = getCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories', error: error.message });
  }
});

module.exports = router;
