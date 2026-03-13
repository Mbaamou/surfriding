import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";

export const useProducts = (searchTerm = "") => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts(searchTerm);
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return { products, loading, error };
};
