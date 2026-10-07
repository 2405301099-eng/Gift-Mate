const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const wishlistFilePath = path.join(__dirname, '..', 'data', 'wishlist.json');
const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');

function getWishlist() {
  try {
    if (!fs.existsSync(wishlistFilePath)) {
      return [];
    }
    const rawData = fs.readFileSync(wishlistFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error('Error reading wishlist file:', err);
    return [];
  }
}

function saveWishlist(wishlist) {
  try {
    fs.writeFileSync(wishlistFilePath, JSON.stringify(wishlist, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving wishlist file:', err);
    return false;
  }
}

function getProducts() {
  try {
    const rawData = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (err) {
    return [];
  }
}

// GET /api/wishlist
router.get('/', (req, res) => {
  try {
    const wishlistIds = getWishlist();
    const products = getProducts();
    const populated = wishlistIds.map(id => products.find(p => p.id === id)).filter(Boolean);

    res.json({
      success: true,
      count: wishlistIds.length,
      itemIds: wishlistIds,
      items: populated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch wishlist', error: error.message });
  }
});

// POST /api/wishlist
router.post('/', (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: 'productId is required' });
    }

    let wishlistIds = getWishlist();
    const exists = wishlistIds.includes(productId);

    if (exists) {
      wishlistIds = wishlistIds.filter(id => id !== productId);
    } else {
      wishlistIds.push(productId);
    }

    saveWishlist(wishlistIds);

    const products = getProducts();
    const populated = wishlistIds.map(id => products.find(p => p.id === id)).filter(Boolean);

    res.json({
      success: true,
      isSaved: !exists,
      count: wishlistIds.length,
      itemIds: wishlistIds,
      items: populated,
      message: exists ? 'Removed from wishlist' : 'Added to wishlist'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update wishlist', error: error.message });
  }
});

// DELETE /api/wishlist/:id
router.delete('/:id', (req, res) => {
  try {
    const productId = req.params.id;
    let wishlistIds = getWishlist();
    wishlistIds = wishlistIds.filter(id => id !== productId);
    saveWishlist(wishlistIds);

    const products = getProducts();
    const populated = wishlistIds.map(id => products.find(p => p.id === id)).filter(Boolean);

    res.json({
      success: true,
      count: wishlistIds.length,
      itemIds: wishlistIds,
      items: populated,
      message: 'Item removed from wishlist'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove from wishlist', error: error.message });
  }
});

module.exports = router;
