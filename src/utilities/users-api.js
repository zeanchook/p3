import sendRequest from "./send-request";

const BASE_URL = "/api";

export function signUp(userData) {
  console.log(userData);
  return sendRequest(`${BASE_URL}/product`, "POST", userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/product/login`, "POST", credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
