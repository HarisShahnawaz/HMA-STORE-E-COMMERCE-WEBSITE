const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../models/Product');

router.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(500).json({
        error: 'Gemini API key is not configured. Please add GEMINI_API_KEY to your .env file.'
      });
    }

    // Fetch all products from MongoDB to provide as live context
    const products = await Product.find({}, 'name price originalPrice category isNew isSale aiRecommended');

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const systemInstruction = `
You are HMA Assistant, the premium, friendly, and expert AI styling and shopping assistant for the HMA-Store, a top-tier clothing brand in Pakistan.

Your goal is to help users find the perfect outfits, answer queries about prices, categories, new arrivals, sales, and deliver outstanding styling recommendations using our LIVE product catalog.

Here is the LIVE catalog of products currently in our MongoDB database:
${JSON.stringify(products, null, 2)}

Strict Guidelines:
1. Recommend ONLY products that actually exist in the live catalog above. Do not invent names, prices, or categories.
2. If the user asks about a product category (e.g. "Men", "Women", "Kids"), list some of the best items in that category.
3. If they ask for sales or discounts, recommend products that have "isSale: true" or compare their "price" and "originalPrice" to show their savings.
4. When listing products, format them beautifully in markdown:
   - Use bullet points.
   - Use **bold** for product names.
   - Specify the price clearly (e.g., "Rs. 2,500").
   - Mention if it is a **New Arrival** (isNew: true) or an **AI Pick** (aiRecommended: true).
5. If the user asks for a recommendation (e.g. "suggest a cool outfit for a party"), creatively group 2-3 products together (e.g., a shirt, trousers, and a blazer) from the catalog and explain why they look great together.
6. Support general store questions:
   - Shipping: Free shipping on orders over Rs. 30,000 across Pakistan! Standard shipping takes 3-5 working days.
   - Returns: 7-day hassle-free exchange or return policy.
   - Payments: Cash on Delivery (COD) and safe online card payments are fully accepted.
   - Sizes: We offer sizes XS, S, M, L, XL, XXL.
7. Keep your replies friendly, concise, and professional. Ensure the answers are easy to read inside a compact chat window.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction
    });

 
    const formattedHistory = [];
    if (history && Array.isArray(history)) {
      // Skip the initial welcome message from the bot so history matches standard turn order
      const historyToFormat = history.slice(1);
      for (const msg of historyToFormat) {
        formattedHistory.push({
          role: msg.from === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }

    const chat = model.startChat({
      history: formattedHistory
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const replyText = response.text();

    res.json({ reply: replyText });
  } catch (err) {
    console.error('Error in /api/assistant/chat:', err);
    res.status(500).json({ error: 'Failed to generate assistant response ' + err.message });
  }
});

module.exports = router;
