const ProductList = ({ products }) => {
  return (
    <div style={{ marginTop: 30 }}>
      <h2>Recommended Products</h2>
      {products.length === 0 && <p>No recommendations yet.</p>}
      <ul>
        {products.map(item => (
          <li key={item.id}>
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
