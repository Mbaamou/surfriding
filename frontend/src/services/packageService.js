import API from "./api";

export const getPackages = (search = "") => API.get(`/packages?search=${search}`);
export const getPackageById = (id) => API.get(`/packages/${id}`);
