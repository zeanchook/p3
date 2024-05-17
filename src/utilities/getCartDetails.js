export const getCartDetails = async (userid) => {
  //orderController.getOrder
  //! to update route path folder
  const url = `/api/product/getuseOrder/${userid}`;
  console.log(url);
  const response = await fetch(url);
  const myResults = await response.json();
  return myResults;
};

//update
export const updateCartDetails = async (body) => {
  const url = `/api/orders/update`;
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  const cartDetail = await response.json();
  return cartDetail;
};
//create
export const createCartDetails = async (orderId, orderLine) => {
  const url = `/api/orders/update/${orderId}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(orderLine),
  });
  const cartDetail = await response.json();

  return cartDetail;
};
