import { useState } from "react";
import { useParams } from "react-router-dom";
import debug from "debug";

const log = debug("mern:pages:AddToCart");

export default function AddToCart({ productId }) {
  const [quantity, setQuantity] = useState(1);
  const { userId } = useParams();

  console.log(productId);
  // const userId = "6644c1099fbe48e26e5525e8";

  function handleIncreaseQty() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function handleDecreaseQty() {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }

  function handleAddToCart() {
    const orderData = {
      user_id: userId,
      orderLines: [
        {
          product_id: productId,
          orderQty: quantity,
        },
      ],
    };
    log(`Adding ${quantity} ${productId} to the cart`);

    fetch(`/api/orders/${userId}/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Order created successfully");
        } else {
          throw new Error("Failed to create order");
        }
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  }

  return (
    <div>
      <div>Quantity</div>
      <p>{quantity}</p>
      <button onClick={handleIncreaseQty}>+</button>
      <button onClick={handleDecreaseQty}>-</button>
      <br />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
