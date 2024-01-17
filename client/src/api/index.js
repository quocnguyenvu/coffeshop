import { useQuery } from "react-query";
import axiosClient from "./axios";

export const useProduct = ({ limit, sort }) =>
  useQuery("products", async () => {
    const { data } = await axiosClient.get("/api/products", {
      params: { limit, sort },
    });
    return data;
  });
