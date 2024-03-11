const ProductForm = () => {
  return (
    <>
      <h2>Add Game to The Store</h2>
      <form action="">
        <input type="text" placeholder="ID" name="id" />
        <input type="text" placeholder="Game Title" name="title" />
        <input type="number" placeholder="Price" name="price" />
        <button>Add Price</button>
      </form>
    </>
  );
};

export default ProductForm;
