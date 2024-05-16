export const getCartDetails = async (userid) => {
  //orderController.getOrder
  const url = `/api/product/${userid}`;
  const response = await fetch(url);
  const myResults = await response.json();
  return myResults;
};

// get cart details using user Id
