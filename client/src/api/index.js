import axios from "axios";
import { useQuery } from "react-query";

export const useProduct = ({ limit, sort }) =>
  useQuery("products", async () => {
    const { data } = await axios.get("/api/products", {
      params: { limit, sort },
    });
    return data;
  });
