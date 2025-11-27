import React, { useState } from "react";
import { products } from "./data/products";
import { getRecommendations } from "./api/openai.js";
import ProductList from "./components/ProductList";
import "./App.css";

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
  <div className="App">
    <h1 className="sparkle-animate">AI Product Recommender</h1>

    <input
      className="sparkle-text"
      type="text"
      placeholder="e.g., phone under $500"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />

    <button className="sparkle-animate" onClick={search}>
      Recommend
    </button>

    <ProductList products={recommended} />
  </div>
);
}
export default App;
