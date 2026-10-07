const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');

function getProducts() {
  try {
    const rawData = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error('Error reading products file:', err);
    return [];
  }
}

// GET /api/products
router.get('/', (req, res) => {
  try {
    let products = getProducts();
    const { category, occasion, search, minPrice, maxPrice, sort, trending } = req.query;

    if (category && category !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (occasion && occasion !== 'all') {
      const occ = occasion.toLowerCase();
      products = products.filter(p => 
        p.occasions && p.occasions.some(o => o.toLowerCase().includes(occ) || occ.includes(o.toLowerCase()))
      );
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.aiTag && p.aiTag.toLowerCase().includes(q)) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(q))
      );
    }

    if (minPrice) {
      const min = Number(minPrice);
      if (!isNaN(min)) {
        products = products.filter(p => p.price >= min);
      }
    }

    if (maxPrice) {
      const max = Number(maxPrice);
      if (!isNaN(max)) {
        products = products.filter(p => p.price <= max);
      }
    }

    if (trending === 'true') {
      products = products.filter(p => p.isTrending);
    }

    if (sort) {
      if (sort === 'price-asc') {
        products.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-desc') {
        products.sort((a, b) => b.price - a.price);
      } else if (sort === 'rating') {
        products.sort((a, b) => b.rating - a.rating);
      } else if (sort === 'discount') {
        products.sort((a, b) => b.discountPercent - a.discountPercent);
      }
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
  }
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  try {
    const products = getProducts();
    const product = products.find(p => p.id === req.params.id || p.slug === req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch product', error: error.message });
  }
});

module.exports = router;
