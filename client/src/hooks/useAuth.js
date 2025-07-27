import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("Parsed user from localStorage:", parsedUser);
      } else {
        console.log("No user found in localStorage");
      }

      if (storedToken) {
        setToken(storedToken);
        console.log("Token found:", storedToken);
      } else {
        console.log("No token found in localStorage");
      }
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
    }

    setLoading(false);
  }, []);

  return { user, token, loading };
};
