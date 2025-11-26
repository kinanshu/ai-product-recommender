import OpenAI from "openai";

// Create OpenAI client only if API key exists
const client = process.env.REACT_APP_OPENAI_KEY
  ? new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_KEY })
  : null;

/**
 * Get product recommendations from GPT or fallback
 * @param {string} userQuery - User input e.g. "phone under $500"
 * @param {Array} products - Product list from products.js
 * @returns Array of recommended products with reason
 */
export async function getRecommendations(userQuery, products) {
  // Fallback if OpenAI key is missing
  if (!client) {
    console.warn("OpenAI API key not found. Using fallback filtering.");
    return products
      .filter(p => p.name.toLowerCase().includes(userQuery.toLowerCase()))
      .map(p => ({ id: p.id, reason: "Matches your query (fallback)" }));
  }

  const prompt = `
  User query: "${userQuery}"
  Product list: ${JSON.stringify(products)}

  Recommend the best matching products from the list.
  Return an array of objects in this format:
  [{ "id": product_id, "reason": "why recommended" }]
  `;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    const text = response.choices[0].message.content;

    // Convert GPT response to JS object
    return JSON.parse(text);
  } catch (error) {
    console.error("Error getting AI recommendations:", error);

    // Fallback if GPT fails
    return products
      .filter(p => p.name.toLowerCase().includes(userQuery.toLowerCase()))
      .map(p => ({ id: p.id, reason: "Matches your query (fallback)" }));
  }
} 