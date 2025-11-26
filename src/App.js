import React, { useState } from "react";
import { products } from "./data/products";
import { getRecommendations } from "./api/openai";
import ProductList from "./components/ProductList";

function App() {
  const [input, setInput] = useState("");
  const [recommended, setRecommended] = useState([]);

  const search = async () => {
    const rec = await getRecommendations(input, products);

    const merged = rec.map(r => {
      const prod = products.find(p => p.id === r.id);
      return { ...prod, reason: r.reason };
    });

    setRecommended(merged);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>AI Product Recommender</h1>

      <input
        type="text"
        placeholder="e.g., phone under $500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: 10, width: 300 }}
      />

      <button
        onClick={search}
        style={{ padding: "10px 20px", marginLeft: 10 }}
      >
        Recommend
      </button>

      <ProductList products={recommended} />
    </div>
  );
}

export default App;
