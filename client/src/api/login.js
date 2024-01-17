import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import axiosClient from "./axios";

const loginUser = async (credentials) => {
  const response = await axiosClient.post(
    "login",
    credentials
  );

  if (!response.token) {
    throw new Error("Invalid credentials");
  }

  return response.token;
};

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation(loginUser, {
    onSuccess: (token) => {
      localStorage.setItem("token", token);

      navigate("/admin");
    },
  });
};
