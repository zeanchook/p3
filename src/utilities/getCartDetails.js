export const getCartDetails = async () => {
  const url = `/api/product/order/66437634e28e59e815435276`;
  const response = await fetch(url);
  const myResults = await response.json();
  return myResults;
};
