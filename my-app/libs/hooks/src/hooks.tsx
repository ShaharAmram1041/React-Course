import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchProductById,
  fetchProducts,
  type Product,
  type ProductDetails,
} from "./productApi";

export function useProductsQuery() {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    enabled: false,
  });
}

export function useProductQuery(id?: string) {
  return useQuery<ProductDetails, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });
}

export function useProductsInfiniteQuery() {
  return useInfiniteQuery<Product[], Error>({
    queryKey: ["products", "infinite"],
    queryFn: () => fetchProducts(),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, pages) => pages.length + 1,
  });
}

export function useCreateProductMutation() {
  return useMutation({
    mutationFn: async (input: unknown) => input,
  });
}
