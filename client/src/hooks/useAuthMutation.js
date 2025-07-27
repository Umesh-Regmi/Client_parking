import { useMutation } from "@tanstack/react-query";
import { login, register } from "../api/auth";

export const useAuthMutation = (type = "login") => {
  const mutationFn = type === "login" ? login : register;

  return useMutation({
    mutationFn,
  });
};
