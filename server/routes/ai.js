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
    return [];
  }
}

// POST /api/ai/match - 60-second gift quiz matching algorithm
router.post('/match', (req, res) => {
  try {
    const { recipient, occasion, ageGroup, interests = [], budget, pincode } = req.body;

    if (!recipient && !occasion) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least a recipient or occasion to match gifts.'
      });
    }

    const products = getProducts();
    const budgetNum = Number(budget) || 10000;
    const recipientClean = (recipient || '').toLowerCase();
    const occasionClean = (occasion || '').toLowerCase();
    const interestList = Array.isArray(interests) 
      ? interests.map(i => i.toLowerCase()) 
      : String(interests).toLowerCase().split(',').map(s => s.trim()).filter(Boolean);

    // Score each product
    const scoredProducts = products.map(product => {
      let score = 50; // base score

      // 1. Occasion matching (up to +25)
      if (occasionClean && product.occasions) {
        const hasOccasion = product.occasions.some(o => 
          occasionClean.includes(o.toLowerCase()) || o.toLowerCase().includes(occasionClean)
        );
        if (hasOccasion) score += 25;
      }

      // 2. Recipient matching (up to +20)
      if (recipientClean && product.recipientTypes) {
        const hasRecipient = product.recipientTypes.some(r =>
          recipientClean.includes(r.toLowerCase()) || r.toLowerCase().includes(recipientClean)
        );
        if (hasRecipient) score += 20;
      }

      // 3. Interests & hobbies matching (up to +20)
      if (interestList.length > 0) {
        let interestMatches = 0;
        const textToSearch = `${product.name} ${product.description} ${product.aiTag} ${product.categoryName}`.toLowerCase();
        
        interestList.forEach(item => {
          if (textToSearch.includes(item)) {
            interestMatches++;
          }
        });
        score += Math.min(20, interestMatches * 10);
      }

      // 4. Budget fit (up to +15)
      if (product.price <= budgetNum) {
        score += 15;
      } else if (product.price <= budgetNum * 1.25) {
        score += 5; // close to budget
      } else {
        score -= 10;
      }

      // 5. High rating bonus (+5)
      if (product.rating >= 4.8) {
        score += 5;
      }

      // Cap match percentage at 99%
      const matchScore = Math.min(99, Math.max(65, Math.round(score)));

      // Generate custom AI reason based on selections
      let aiReason = `Perfect emotional fit for ${recipient || 'your loved one'}`;
      if (occasionClean && occasionClean.includes('diwali')) {
        aiReason = `Auspicious festive pick with handcrafted brass & royal presentation`;
      } else if (occasionClean && occasionClean.includes('wedding')) {
        aiReason = `Heirloom-grade celebratory luxury with complimentary wax seal greeting`;
      } else if (occasionClean && occasionClean.includes('anniversary')) {
        aiReason = `Deep emotional resonance crafted for lasting memories and milestones`;
      } else if (interestList.some(i => i.includes('tech') || i.includes('music'))) {
        aiReason = `Selected for tech flair paired with sophisticated rose gold aesthetics`;
      } else if (interestList.some(i => i.includes('coffee') || i.includes('tea'))) {
        aiReason = `Artisanal single-origin brew experience thoughtfully packaged`;
      }

      return {
        ...product,
        matchScore,
        customAIReason: aiReason
      };
    });

    // Sort descending by match score
    scoredProducts.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      success: true,
      meta: {
        recipient,
        occasion,
        ageGroup,
        budget: budgetNum,
        pincode: pincode || 'Pan-India',
        totalMatches: scoredProducts.length
      },
      results: scoredProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'AI match calculation failed', error: error.message });
  }
});

// POST /api/ai/chat - Intelligent gift assistant
router.post('/chat', (req, res) => {
  try {
    const { message = '' } = req.body;
    const lower = message.toLowerCase().trim();
    const products = getProducts();

    if (!lower) {
      return res.status(400).json({ success: false, message: 'Message cannot be empty' });
    }

    let reply = '';
    let suggestedProducts = [];
    let quickFollowUps = [];

    // Check for budget mentions
    let detectedBudget = null;
    const priceMatch = lower.match(/(?:under|below|less than|budget of)?\s*(?:₹|rs\.?|inr)?\s*(\d{3,5})/i);
    if (priceMatch) {
      detectedBudget = parseInt(priceMatch[1], 10);
    }

    // Determine category or occasion intent
    if (lower.includes('diwali') || lower.includes('festival') || lower.includes('pooja')) {
      reply = `Namaste! For Diwali and festive celebrations, Indian households cherish gifts that bring light, fragrance, and sweetness. Here are our top hand-picked festive selections that include our signature royal packaging and custom wax-sealed greeting note:`;
      suggestedProducts = products.filter(p => p.occasions.includes('diwali')).slice(0, 3);
      quickFollowUps = [
        'Under ₹1000 gifts',
        'Can you add a custom handwritten letter?',
        'What about edible gourmet hampers?'
      ];
    } else if (lower.includes('wedding') || lower.includes('shaadi') || lower.includes('couple')) {
      reply = `Weddings call for meaningful heirloom gifts that stand out amidst traditional envelopes! Here are our most elegant couple-oriented gifts with personalization options:`;
      suggestedProducts = products.filter(p => p.occasions.includes('wedding')).slice(0, 3);
      quickFollowUps = [
        'Gifts for the bride and groom',
        'Personalized photo keepsakes',
        'Express 24-hr delivery to Mumbai'
      ];
    } else if (lower.includes('anniversary') || lower.includes('romantic') || lower.includes('wife') || lower.includes('husband')) {
      reply = `Anniversaries celebrate shared milestones! The #1 favorite is our Personalized LED Pine Wood Frame or artisanal Kashmiri Silk Stole. Here are heartfelt romantic choices:`;
      suggestedProducts = products.filter(p => p.occasions.includes('anniversary') || p.id === 'prod-1' || p.id === 'prod-8').slice(0, 3);
      quickFollowUps = [
        'How does the LED frame photo upload work?',
        'Gifts under ₹1500',
        'See all anniversary gifts'
      ];
    } else if (lower.includes('birthday') || lower.includes('bday')) {
      reply = `Happy birthday planning! Whether it's for a tech lover, music enthusiast, or someone who treasures memories, these are our highest-rated birthday delights:`;
      suggestedProducts = products.filter(p => p.occasions.includes('birthday')).slice(0, 3);
      quickFollowUps = [
        'Gifts for sister',
        'Gifts for brother',
        'Same-day or 24-hr delivery options'
      ];
    } else if (lower.includes('delivery') || lower.includes('pincode') || lower.includes('shipping') || lower.includes('fast')) {
      reply = `We provide Pan-India Express shipping! Over 18,000+ PIN codes across Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, and Kolkata receive delivery within 24 to 48 hours via Bluedart and Delhivery with fragile safety wrap.`;
      suggestedProducts = products.slice(0, 2);
      quickFollowUps = [
        'Check PIN code 110001',
        'Is Cash on Delivery available?',
        'Track my order'
      ];
    } else if (lower.includes('under') || detectedBudget) {
      const budget = detectedBudget || 1000;
      reply = `Here are our top recommended treasures strictly under ₹${budget.toLocaleString('en-IN')}, every single one packaged in our signature festive gift box:`;
      suggestedProducts = products.filter(p => p.price <= budget).slice(0, 3);
      if (suggestedProducts.length === 0) {
        suggestedProducts = products.slice(0, 2);
      }
      quickFollowUps = [
        'Show more under ₹1000',
        'Can I include a gift wrap?',
        'Start 60-Second AI Quiz'
      ];
    } else {
      reply = `I would love to help you find the perfect gift! Tell me a bit about who you are gifting (e.g., Mom, Husband, Colleague, Friend) and the occasion, or pick one of these popular gifting recommendations:`;
      suggestedProducts = products.filter(p => p.isTrending).slice(0, 3);
      quickFollowUps = [
        'Gifts for Diwali',
        'Gifts for Parents',
        'Gifts under ₹1000',
        'Tech gifts for brother'
      ];
    }

    res.json({
      success: true,
      reply,
      products: suggestedProducts,
      quickFollowUps
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'AI chat processing failed', error: error.message });
  }
});

module.exports = router;
