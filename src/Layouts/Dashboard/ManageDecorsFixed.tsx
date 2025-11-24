import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useDecors, useCategories } from "../../hooks/useApi";
import { Decor, Category } from "../../services/api";

interface DecorFormData {
  name: string;
  description: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: File[]; // Changed from string[] to File[] for form handling
  status: "active" | "inactive" | "out_of_stock";
  stock: number;
  tags?: string[];
  featured?: boolean;
  materials: string[];
}

interface CategoryFormData {
  name: string;
  description?: string;
}

const ManageDecorsFixed = () => {
  const [activeTab, setActiveTab] = useState("decors");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Decor | Category | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<DecorFormData | CategoryFormData>(
    {} as any
  );
  const [newMaterial, setNewMaterial] = useState("");
  const [newTag, setNewTag] = useState("");

  // Initialize form data when tab or modal changes
  useEffect(() => {
    setNewMaterial("");
    setNewTag("");
    if (activeTab === "decors") {
      setFormData({
        name: "",
        description: "",
        category: "",
        price: 0,
        discountPrice: 0,
        images: [] as File[],
        status: "active",
        stock: 0,
        tags: [],
        featured: false,
        materials: [],
      } as DecorFormData);
    } else {
      setFormData({ name: "", description: "" } as CategoryFormData);
    }
  }, [activeTab, showCreateModal]);
  const itemsPerPage = 10;

  // Backend hooks
  const {
    decors,
    loading: decorsLoading,
    error: decorsError,
    refetch: refetchDecors,
    createDecor,
    updateDecor,
    deleteDecor,
  } = useDecors();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  // Form handlers - stable with useCallback
  const handleFormChange = useCallback((field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFormChange("name", e.target.value);
    },
    [handleFormChange]
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleFormChange("description", e.target.value);
    },
    [handleFormChange]
  );

  const addMaterial = useCallback(() => {
    if (newMaterial.trim()) {
      const currentMaterials = (formData as DecorFormData).materials || [];
      handleFormChange("materials", [...currentMaterials, newMaterial.trim()]);
      setNewMaterial("");
    }
  }, [newMaterial, formData, handleFormChange]);

  const removeMaterial = useCallback(
    (index: number) => {
      const currentMaterials = (formData as DecorFormData).materials || [];
      handleFormChange(
        "materials",
        currentMaterials.filter((_, i) => i !== index)
      );
    },
    [formData, handleFormChange]
  );

  const addTag = useCallback(() => {
    if (newTag.trim()) {
      const currentTags = (formData as DecorFormData).tags || [];
      handleFormChange("tags", [...currentTags, newTag.trim()]);
      setNewTag("");
    }
  }, [newTag, formData, handleFormChange]);

  const removeTag = useCallback(
    (index: number) => {
      const currentTags = (formData as DecorFormData).tags || [];
      handleFormChange(
        "tags",
        currentTags.filter((_, i) => i !== index)
      );
    },
    [formData, handleFormChange]
  );

  // Create/Update handlers
  const handleCreate = async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (activeTab === "decors") {
        const decorData = formData as DecorFormData;

        // Validate required fields
        if (
          !decorData.name ||
          !decorData.category ||
          !decorData.price ||
          !decorData.materials?.length
        ) {
          throw new Error(
            "Please fill all required fields (name, category, price, materials)"
          );
        }

        // Check if we have files to upload
        if (decorData.images && decorData.images.length > 0) {
          // Create FormData for file upload
          const formDataObj = new FormData();
          formDataObj.append("name", decorData.name);
          formDataObj.append("description", decorData.description);
          formDataObj.append("category", decorData.category);
          formDataObj.append("price", decorData.price.toString());
          formDataObj.append("stock", decorData.stock.toString());
          formDataObj.append("status", decorData.status);
          formDataObj.append("materials", JSON.stringify(decorData.materials));
          formDataObj.append("featured", decorData.featured ? "true" : "false");

          if (decorData.discountPrice) {
            formDataObj.append(
              "discountPrice",
              decorData.discountPrice.toString()
            );
          }
          if (decorData.tags?.length) {
            formDataObj.append("tags", JSON.stringify(decorData.tags));
          }

          // Append images
          decorData.images.forEach((file) => {
            formDataObj.append("images", file);
          });

          await createDecor(formDataObj);
        } else {
          // Create without images
          const submitData = {
            name: decorData.name,
            description: decorData.description,
            category: decorData.category,
            price: decorData.price,
            discountPrice: decorData.discountPrice,
            stock: decorData.stock,
            status: decorData.status,
            materials: decorData.materials,
            tags: decorData.tags || [],
            featured: decorData.featured || false,
            images: [] as string[],
          };
          await createDecor(submitData);
        }
      } else {
        await createCategory(formData as CategoryFormData);
      }
      setShowCreateModal(false);
      setFormData({} as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;
    setError(null);
    setIsLoading(true);
    try {
      if (activeTab === "decors") {
        const decorData = formData as DecorFormData;
        // For updates, we'll send JSON data (file uploads not supported for updates yet)
        const updateData = {
          name: decorData.name,
          description: decorData.description,
          category: decorData.category,
          price: decorData.price,
          discountPrice: decorData.discountPrice,
          stock: decorData.stock,
          status: decorData.status,
          materials: decorData.materials,
          tags: decorData.tags || [],
          featured: decorData.featured || false,
        };
        await updateDecor(selectedItem._id, updateData);
      } else {
        await updateCategory(selectedItem._id, formData as CategoryFormData);
      }
      setShowEditModal(false);
      setSelectedItem(null);
      setFormData({} as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setError(null);
    setIsLoading(true);
    try {
      if (activeTab === "decors") {
        await deleteDecor(selectedItem._id);
      } else {
        await deleteCategory(selectedItem._id);
      }
      setShowDeleteConfirm(false);
      setSelectedItem(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setIsLoading(false);
    }
  };

  // Modal handlers
  const openCreateModal = useCallback(() => {
    setFormData(
      activeTab === "decors"
        ? {
            name: "",
            description: "",
            category: "",
            price: 0,
            stock: 0,
            status: "active",
            tags: [],
            materials: [],
            featured: false,
            images: [],
          }
        : {
            name: "",
            description: "",
          }
    );
    setShowCreateModal(true);
  }, [activeTab]);

  const openEditModal = useCallback(
    (item: Decor | Category) => {
      setSelectedItem(item);
      setNewMaterial("");
      setNewTag("");
      if (activeTab === "decors") {
        const decor = item as Decor;
        setFormData({
          name: decor.name,
          description: decor.description,
          category: decor.category,
          price: decor.price,
          discountPrice: decor.discountPrice,
          stock: decor.stock,
          status: decor.status,
          tags: decor.tags || [],
          materials: decor.materials || [],
          featured: decor.featured || false,
          images: [] as File[], // Can't pre-populate files, start with empty array
        });
      } else {
        setFormData({
          name: item.name,
          description: (item as Category).description || "",
        });
      }
      setShowEditModal(true);
    },
    [activeTab]
  );

  // Filter and pagination
  const filteredDecors = React.useMemo(
    () =>
      decors.filter(
        (decor) =>
          decor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          decor.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [decors, searchQuery]
  );

  const filteredCategories = React.useMemo(
    () =>
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [categories, searchQuery]
  );

  const currentItems =
    activeTab === "decors" ? filteredDecors : filteredCategories;
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = currentItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-warmGray-900">
          Manage {activeTab === "decors" ? "Decors" : "Categories"}
        </h1>
        <Button variant="primary" onClick={openCreateModal}>
          <Icon icon="mdi:plus" className="w-5 h-5 mr-2" />
          Add {activeTab === "decors" ? "Decor" : "Category"}
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab("decors")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "decors"
              ? "bg-craft-600 text-white"
              : "text-warmGray-600 hover:text-warmGray-900"
          }`}
        >
          Decors
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "categories"
              ? "bg-craft-600 text-white"
              : "text-warmGray-600 hover:text-warmGray-900"
          }`}
        >
          Categories
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Icon icon="mdi:magnify" className="w-5 h-5" />}
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Items Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-warmGray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                  Description
                </th>
                {activeTab === "decors" && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </>
                )}
                <th className="px-6 py-3 text-right text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warmGray-200">
              {paginatedItems.map((item) => (
                <tr key={item._id} className="hover:bg-warmGray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-warmGray-900">
                      {item.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-warmGray-600 max-w-xs truncate">
                      {activeTab === "decors"
                        ? (item as Decor).description
                        : (item as Category).description}
                    </div>
                  </td>
                  {activeTab === "decors" && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-warmGray-900">
                          ${(item as Decor).price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-warmGray-900">
                          {(item as Decor).stock}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            (item as Decor).status === "active"
                              ? "bg-green-100 text-green-800"
                              : (item as Decor).status === "inactive"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {(item as Decor).status}
                        </span>
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(item)}
                      >
                        <Icon icon="mdi:pencil" className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        <Icon icon="mdi:delete" className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-warmGray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, currentItems.length)} of{" "}
            {currentItems.length} results
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* CREATE MODAL - Fixed: Component defined outside, no recreation! */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-warmGray-900">
                Add New {activeTab === "decors" ? "Decor" : "Category"}
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-warmGray-500 hover:text-warmGray-700"
              >
                <Icon icon="mdi:close" className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {activeTab === "decors" ? (
                <>
                  <Input
                    placeholder="Product Name"
                    value={(formData as DecorFormData).name || ""}
                    onChange={handleNameChange}
                  />
                  <Input
                    placeholder="Price"
                    type="number"
                    value={(formData as DecorFormData).price || ""}
                    onChange={(e) =>
                      handleFormChange("price", Number(e.target.value))
                    }
                  />
                  <Input
                    placeholder="Original Price (optional)"
                    type="number"
                    value={(formData as DecorFormData).discountPrice || ""}
                    onChange={(e) =>
                      handleFormChange("discountPrice", Number(e.target.value))
                    }
                  />
                  <Input
                    placeholder="Stock Quantity"
                    type="number"
                    value={(formData as DecorFormData).stock || ""}
                    onChange={(e) =>
                      handleFormChange("stock", Number(e.target.value))
                    }
                  />
                  <select
                    className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500"
                    value={(formData as DecorFormData).category || ""}
                    onChange={(e) =>
                      handleFormChange("category", e.target.value)
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500"
                    value={(formData as DecorFormData).status || "active"}
                    onChange={(e) => handleFormChange("status", e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>

                  <textarea
                    className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500"
                    rows={3}
                    placeholder="Product Description"
                    value={(formData as DecorFormData).description || ""}
                    onChange={handleDescriptionChange}
                  />

                  <div>
                    <label className="block text-sm font-medium text-warmGray-700 mb-2">
                      Materials (Required)
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add material"
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addMaterial();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={addMaterial}
                        className="px-4 py-2 bg-craft-500 text-white rounded-lg hover:bg-craft-600"
                      >
                        <Icon icon="mdi:plus" className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {((formData as DecorFormData).materials || []).map(
                        (material, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 bg-craft-50 text-craft-700 px-2 py-1 rounded-md text-sm"
                          >
                            <span>{material}</span>
                            <button
                              type="button"
                              onClick={() => removeMaterial(index)}
                              className="text-craft-500 hover:text-craft-700"
                            >
                              <Icon icon="mdi:close" className="w-3 h-3" />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-warmGray-700 mb-2">
                      Tags (Optional)
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-craft-500 text-white rounded-lg hover:bg-craft-600"
                      >
                        <Icon icon="mdi:plus" className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {((formData as DecorFormData).tags || []).map(
                        (tag, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(index)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Icon icon="mdi:close" className="w-3 h-3" />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={(formData as DecorFormData).featured || false}
                      onChange={(e) =>
                        handleFormChange("featured", e.target.checked)
                      }
                      className="rounded border-warmGray-300"
                    />
                    <label
                      htmlFor="featured"
                      className="text-sm text-warmGray-700"
                    >
                      Featured Product
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-warmGray-700 mb-2">
                      Product Images
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        const currentImages =
                          (formData as DecorFormData).images || [];
                        handleFormChange("images", [
                          ...currentImages,
                          ...files,
                        ]);
                      }}
                      className="w-full px-3 py-2 border border-warmGray-300 rounded-lg"
                    />
                    <p className="text-xs text-warmGray-500 mt-1">
                      Select multiple images for the product gallery
                    </p>

                    {/* Display selected images */}
                    {((formData as DecorFormData).images || []).length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-warmGray-700 mb-2">
                          Selected Images (
                          {((formData as DecorFormData).images || []).length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {((formData as DecorFormData).images || []).map(
                            (file, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md text-sm"
                              >
                                <Icon
                                  icon="mdi:image"
                                  className="w-4 h-4 text-gray-600"
                                />
                                <span className="truncate max-w-[120px]">
                                  {file.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentImages =
                                      (formData as DecorFormData).images || [];
                                    handleFormChange(
                                      "images",
                                      currentImages.filter(
                                        (_, i) => i !== index
                                      )
                                    );
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Icon icon="mdi:close" className="w-3 h-3" />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Input
                    placeholder="Category Name"
                    value={(formData as CategoryFormData).name || ""}
                    onChange={handleNameChange}
                  />
                  <textarea
                    className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500"
                    rows={2}
                    placeholder="Category Description"
                    value={(formData as CategoryFormData).description || ""}
                    onChange={handleDescriptionChange}
                  />
                </>
              )}
            </form>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateModal(false);
                  setFormData({} as any);
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleCreate}
                disabled={isLoading}
              >
                {isLoading
                  ? "Creating..."
                  : `Create ${activeTab === "decors" ? "Decor" : "Category"}`}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL - Fixed: Component defined outside, no recreation! */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-warmGray-900">
                Edit {activeTab === "decors" ? "Decor" : "Category"}
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-warmGray-500 hover:text-warmGray-700"
              >
                <Icon icon="mdi:close" className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {activeTab === "decors" ? (
                <>
                  <Input
                    placeholder="Product Name"
                    value={(formData as DecorFormData).name || ""}
                    onChange={handleNameChange}
                  />
                  <Input
                    placeholder="Price"
                    type="number"
                    value={(formData as DecorFormData).price || ""}
                    onChange={(e) =>
                      handleFormChange("price", Number(e.target.value))
                    }
                  />
                  <Input
                    placeholder="Original Price (optional)"
                    type="number"
                    value={(formData as DecorFormData).discountPrice || ""}
                    onChange={(e) =>
                      handleFormChange("discountPrice", Number(e.target.value))
                    }
                  />
                  <Input
                    placeholder="Stock Quantity"
                    type="number"
                    value={(formData as DecorFormData).stock || ""}
                    onChange={(e) =>
                      handleFormChange("stock", Number(e.target.value))
                    }
                  />
                  <select
                    className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500"
                    value={(formData as DecorFormData).category || ""}
                    onChange={(e) =>
                      handleFormChange("category", e.target.value)
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500"
                    value={(formData as DecorFormData).status || "active"}
                    onChange={(e) => handleFormChange("status", e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>

                  <textarea
                    className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500"
                    rows={3}
                    placeholder="Product Description"
                    value={(formData as DecorFormData).description || ""}
                    onChange={handleDescriptionChange}
                  />

                  <div>
                    <label className="block text-sm font-medium text-warmGray-700 mb-2">
                      Materials (Required)
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add material"
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addMaterial();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={addMaterial}
                        className="px-4 py-2 bg-craft-500 text-white rounded-lg hover:bg-craft-600"
                      >
                        <Icon icon="mdi:plus" className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {((formData as DecorFormData).materials || []).map(
                        (material, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 bg-craft-50 text-craft-700 px-2 py-1 rounded-md text-sm"
                          >
                            <span>{material}</span>
                            <button
                              type="button"
                              onClick={() => removeMaterial(index)}
                              className="text-craft-500 hover:text-craft-700"
                            >
                              <Icon icon="mdi:close" className="w-3 h-3" />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-warmGray-700 mb-2">
                      Tags (Optional)
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-craft-500 text-white rounded-lg hover:bg-craft-600"
                      >
                        <Icon icon="mdi:plus" className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {((formData as DecorFormData).tags || []).map(
                        (tag, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(index)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Icon icon="mdi:close" className="w-3 h-3" />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured-edit"
                      checked={(formData as DecorFormData).featured || false}
                      onChange={(e) =>
                        handleFormChange("featured", e.target.checked)
                      }
                      className="rounded border-warmGray-300"
                    />
                    <label
                      htmlFor="featured-edit"
                      className="text-sm text-warmGray-700"
                    >
                      Featured Product
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-warmGray-700 mb-2">
                      Product Images
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        const currentImages =
                          (formData as DecorFormData).images || [];
                        handleFormChange("images", [
                          ...currentImages,
                          ...files,
                        ]);
                      }}
                      className="w-full px-3 py-2 border border-warmGray-300 rounded-lg"
                    />
                    <p className="text-xs text-warmGray-500 mt-1">
                      Select multiple images for the product gallery
                    </p>

                    {/* Display selected images */}
                    {((formData as DecorFormData).images || []).length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-warmGray-700 mb-2">
                          Selected Images (
                          {((formData as DecorFormData).images || []).length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {((formData as DecorFormData).images || []).map(
                            (file, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md text-sm"
                              >
                                <Icon
                                  icon="mdi:image"
                                  className="w-4 h-4 text-gray-600"
                                />
                                <span className="truncate max-w-[120px]">
                                  {file instanceof File
                                    ? file.name
                                    : String(file).split("/").pop() ||
                                      "Unknown"}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentImages =
                                      (formData as DecorFormData).images || [];
                                    handleFormChange(
                                      "images",
                                      currentImages.filter(
                                        (_, i) => i !== index
                                      )
                                    );
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Icon icon="mdi:close" className="w-3 h-3" />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Input
                    placeholder="Category Name"
                    value={(formData as CategoryFormData).name || ""}
                    onChange={handleNameChange}
                  />
                  <textarea
                    className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500"
                    rows={2}
                    placeholder="Category Description"
                    value={(formData as CategoryFormData).description || ""}
                    onChange={handleDescriptionChange}
                  />
                </>
              )}
            </form>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedItem(null);
                  setFormData({} as any);
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdate}
                disabled={isLoading}
              >
                {isLoading
                  ? "Updating..."
                  : `Update ${activeTab === "decors" ? "Decor" : "Category"}`}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL - Fixed: Component defined outside, no recreation! */}
      {showDeleteConfirm && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <Icon icon="mdi:delete" className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-warmGray-900">
                  Delete {activeTab === "decors" ? "Decor" : "Category"}
                </h3>
                <p className="text-warmGray-600">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-warmGray-700 mb-6">
              Are you sure you want to delete "
              <strong>{selectedItem.name}</strong>"?
            </p>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedItem(null);
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDecorsFixed;
