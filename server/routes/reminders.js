const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const remindersFilePath = path.join(__dirname, '..', 'data', 'reminders.json');
const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');

function getReminders() {
  try {
    if (!fs.existsSync(remindersFilePath)) {
      return [];
    }
    const rawData = fs.readFileSync(remindersFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error('Error reading reminders file:', err);
    return [];
  }
}

function saveReminders(reminders) {
  try {
    fs.writeFileSync(remindersFilePath, JSON.stringify(reminders, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving reminders file:', err);
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

function calculateDaysLeft(targetDateStr) {
  const targetDate = new Date(targetDateStr);
  const now = new Date();
  // Clear time part
  targetDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diffTime = targetDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// GET /api/reminders
router.get('/', (req, res) => {
  try {
    const reminders = getReminders();
    const products = getProducts();

    const enriched = reminders.map(r => {
      const daysLeft = r.date ? calculateDaysLeft(r.date) : r.daysLeft;
      const suggestedProduct = r.suggestedProductId ? products.find(p => p.id === r.suggestedProductId) : null;
      return {
        ...r,
        daysLeft,
        suggestedProduct
      };
    });

    // Sort by soonest upcoming
    enriched.sort((a, b) => (a.daysLeft ?? 999) - (b.daysLeft ?? 999));

    res.json({
      success: true,
      count: enriched.length,
      data: enriched
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reminders', error: error.message });
  }
});

// POST /api/reminders
router.post('/', (req, res) => {
  try {
    const { title, person, occasion, date, budget, notify } = req.body;

    if (!title || !person || !occasion || !date) {
      return res.status(400).json({
        success: false,
        message: 'Title, person, occasion, and date are required fields'
      });
    }

    const reminders = getReminders();
    const products = getProducts();

    // Auto-pick a suggested product matching occasion / budget
    const budgetNum = Number(budget) || 2000;
    const match = products.find(p => p.price <= budgetNum && (p.occasions.includes(occasion.toLowerCase()) || p.isTrending)) || products[0];

    const newReminder = {
      id: `rem-${Date.now()}`,
      title: title.trim(),
      person: person.trim(),
      occasion: occasion.trim(),
      date,
      daysLeft: calculateDaysLeft(date),
      budget: budgetNum,
      suggestedProductId: match ? match.id : null,
      notify: Boolean(notify)
    };

    reminders.push(newReminder);
    saveReminders(reminders);

    res.status(201).json({
      success: true,
      message: 'Occasion reminder created successfully',
      data: {
        ...newReminder,
        suggestedProduct: match
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create reminder', error: error.message });
  }
});

// DELETE /api/reminders/:id
router.delete('/:id', (req, res) => {
  try {
    let reminders = getReminders();
    const initialLength = reminders.length;
    reminders = reminders.filter(r => r.id !== req.params.id);

    if (reminders.length === initialLength) {
      return res.status(404).json({ success: false, message: 'Reminder not found' });
    }

    saveReminders(reminders);

    res.json({
      success: true,
      message: 'Reminder deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete reminder', error: error.message });
  }
});

module.exports = router;
