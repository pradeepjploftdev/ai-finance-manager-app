import * as url from "./url_helper";
import { ApiCore } from "./api_helper";
const api = new ApiCore();

// Get Menu
const getItems = () => {
  return api.get(url.REST_ITEMS);
};

// Get Menu
const addItem = (event) => {
  return api.post(url.REST_ITEMS, event);
};

// Register
const registerUser = (userData) => {
  return api.post(url.REST_REGISTER, userData);
};

// Login
const loginUser = (userData) => {
  return api.post(url.REST_LOGIN, userData);
};

// Login
const loggedInUser = () => {
  return api.get(url.REST_AUTH_ME);
};

// Logout
const logoutUser = () => {
  return api.post(url.REST_AUTH_LOGOUT);
};

export { getItems, addItem, registerUser, loginUser, loggedInUser, logoutUser };
