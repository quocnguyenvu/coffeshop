import axiosClient from "./axios";



export const deleteCategory = async (id) => {
  const { data } = await axiosClient.delete(`category/${id}`);
  return data;
}

export const createCategory = async (category) => {
  const { data } = await axiosClient.post("category/create", category);
  return data;
}

export const updateCategory = async (category) => {
  const { data } = await axiosClient.patch(`category/${category._id}`, category);
  return data;
}