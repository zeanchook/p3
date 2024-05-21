import sendRequest from "./send-request";

export const getCartDetails = () => {
  return sendRequest(`/api/orders/getUserOrders/`);
};

//update
export const updateCartDetails = async (body, orderId) => {
  const url = `/api/orders/update/${orderId}`;
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
  const url = `/api/orders/create/${orderId}`;
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

//delete
export const deleteCartItem = async (orderId) => {
  const url = `/api/orders/update/${orderId}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(url, {
    method: "DELETE",
    headers: headers,
  });
  const cartDetail = await response.json();
  return cartDetail;
};
