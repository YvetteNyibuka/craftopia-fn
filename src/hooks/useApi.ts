import { useState, useEffect } from "react";
import { apiService, Category, Decor } from "../services/api";

// Categories hook
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getCategories();
      if (response.success) {
        // Backend returns { categories: Category[], pagination: {...} }
        setCategories(response.data.categories || []);
      } else {
        setError(response.message || "Failed to fetch categories");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (categoryData: {
    name: string;
    description?: string;
  }) => {
    try {
      const response = await apiService.createCategory(categoryData);
      if (response.success) {
        setCategories((prev) => [...prev, response.data]);
        return response.data;
      } else {
        throw new Error(response.message || "Failed to create category");
      }
    } catch (err) {
      throw err;
    }
  };

  const updateCategory = async (
    id: string,
    categoryData: { name?: string; description?: string; isActive?: boolean }
  ) => {
    try {
      const response = await apiService.updateCategory(id, categoryData);
      if (response.success) {
        setCategories((prev) =>
          prev.map((cat) => (cat._id === id ? response.data : cat))
        );
        return response.data;
      } else {
        throw new Error(response.message || "Failed to update category");
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const response = await apiService.deleteCategory(id);
      if (response.success) {
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
      } else {
        throw new Error(response.message || "Failed to delete category");
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

// Decors hook
export const useDecors = (params?: {
  category?: string;
  featured?: boolean;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const [decors, setDecors] = useState<Decor[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDecors = async (fetchParams?: typeof params) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getDecors(fetchParams || params);
      if (response.success) {
        setDecors(response.data.decors);
        setTotalPages(response.data.pages);
        setCurrentPage(response.data.page);
        setTotal(response.data.total);
      } else {
        setError(response.message || "Failed to fetch decors");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecors();
  }, [
    params?.category,
    params?.featured,
    params?.status,
    params?.search,
    params?.page,
    params?.limit,
  ]);

  const createDecor = async (
    decorData:
      | FormData
      | {
          name: string;
          description: string;
          category: string;
          price: number;
          discountPrice?: number;
          images: string[];
          stock: number;
          materials: string[];
          tags?: string[];
          featured?: boolean;
        }
  ) => {
    try {
      const response = await apiService.createDecor(decorData);
      if (response.success) {
        setDecors((prev) => [response.data, ...prev]);
        return response.data;
      } else {
        throw new Error(response.message || "Failed to create decor");
      }
    } catch (err) {
      throw err;
    }
  };

  const updateDecor = async (id: string, decorData: Partial<Decor>) => {
    try {
      const response = await apiService.updateDecor(id, decorData);
      if (response.success) {
        setDecors((prev) =>
          prev.map((decor) => (decor._id === id ? response.data : decor))
        );
        return response.data;
      } else {
        throw new Error(response.message || "Failed to update decor");
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteDecor = async (id: string) => {
    try {
      const response = await apiService.deleteDecor(id);
      if (response.success) {
        setDecors((prev) => prev.filter((decor) => decor._id !== id));
      } else {
        throw new Error(response.message || "Failed to delete decor");
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    decors,
    totalPages,
    currentPage,
    total,
    loading,
    error,
    refetch: fetchDecors,
    createDecor,
    updateDecor,
    deleteDecor,
  };
};

// Single decor hook
export const useDecor = (id: string | undefined) => {
  const [decor, setDecor] = useState<Decor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDecor = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getDecor(id);
      if (response.success) {
        setDecor(response.data);
      } else {
        setError(response.message || "Failed to fetch decor");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDecor();
    }
  }, [id]);

  return {
    decor,
    loading,
    error,
    refetch: fetchDecor,
  };
};
