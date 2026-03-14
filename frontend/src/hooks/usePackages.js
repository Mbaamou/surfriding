import { useState, useEffect } from "react";
import { getPackages } from "../services/packageService";

export const usePackages = (searchTerm = "") => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await getPackages(searchTerm);
        setPackages(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [searchTerm]);

  return { packages, loading, error };
};
