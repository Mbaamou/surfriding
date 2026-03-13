import API from "./api";

export const getProducts = (search = "") => API.get(`/products?search=${search}`);
export const getProductById = (id) => API.get(`/products/${id}`);
