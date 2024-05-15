export default function AddToCart() {
  function addToCart() {
    console.log("click add to cart");
  }

  return (
    <>
      <div>Quantity</div>
      <p>1</p>
      <button>+</button>
      <button>_</button>
      <br />
      <button onClick={addToCart()}>Add to Cart</button>
    </>
  );
}
