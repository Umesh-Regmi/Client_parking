import API from ".";

export const login = (data) => API.post("/login", data);
export const register = (data) => API.post("/register", data);
