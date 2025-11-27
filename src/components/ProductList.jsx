const ProductList = ({ products }) => {
  return (
    <div style={{ marginTop: 30 }}>
      
      <h2 className="sparkle-text sparkle-animate">Recommended Products</h2>

      {products.length === 0 && (
        <p className="sparkle-text sparkle-animate">
          No recommendations yet.
        </p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map(item => (
          <li
            key={item.id}
            className="product-card sparkle-text sparkle-animate"
            style={{ textAlign: "left" }}
          >
            <strong>{item.name}</strong> — ${item.price}
            <br />
            <small>{item.reason}</small>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default ProductList;
