import API from ".";

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
