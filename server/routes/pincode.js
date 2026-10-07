const express = require('express');
const router = express.Router();

const METRO_PINCODES = {
  '11': { city: 'New Delhi', state: 'Delhi NCR', hours: 24, express: true },
  '12': { city: 'Gurugram / Faridabad', state: 'Haryana', hours: 24, express: true },
  '20': { city: 'Noida / Ghaziabad', state: 'Uttar Pradesh', hours: 24, express: true },
  '40': { city: 'Mumbai', state: 'Maharashtra', hours: 24, express: true },
  '41': { city: 'Pune', state: 'Maharashtra', hours: 36, express: true },
  '56': { city: 'Bengaluru', state: 'Karnataka', hours: 24, express: true },
  '50': { city: 'Hyderabad', state: 'Telangana', hours: 36, express: true },
  '60': { city: 'Chennai', state: 'Tamil Nadu', hours: 36, express: true },
  '70': { city: 'Kolkata', state: 'West Bengal', hours: 48, express: true }
};

// POST /api/pincode/check
router.post('/check', (req, res) => {
  try {
    const { pincode } = req.body;
    const cleanPin = String(pincode || '').trim();

    if (!cleanPin || !/^\d{6}$/.test(cleanPin)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 6-digit Indian PIN code'
      });
    }

    const prefix = cleanPin.substring(0, 2);
    const metroInfo = METRO_PINCODES[prefix];

    if (metroInfo) {
      return res.json({
        success: true,
        pincode: cleanPin,
        city: metroInfo.city,
        state: metroInfo.state,
        deliveryHours: metroInfo.hours,
        estimatedDelivery: `${metroInfo.hours} Hours`,
        courier: 'Bluedart Express Air',
        freeGiftWrap: true,
        waxSealIncluded: true,
        cashOnDelivery: true
      });
    }

    // Default pan-India tier-2/tier-3
    return res.json({
      success: true,
      pincode: cleanPin,
      city: 'Pan-India Delivery Hub',
      state: 'All India',
      deliveryHours: 48,
      estimatedDelivery: '48 - 72 Hours',
      courier: 'Delhivery Surface & Air',
      freeGiftWrap: true,
      waxSealIncluded: true,
      cashOnDelivery: true
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'PIN code verification failed', error: error.message });
  }
});

module.exports = router;
