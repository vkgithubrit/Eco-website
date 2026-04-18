import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  getProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>("/products");
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>("/products/categories");
    return response.data;
  },
};
