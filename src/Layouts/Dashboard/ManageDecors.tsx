import { useState } from "react";
import { Icon } from "@iconify/react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

interface Decor {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  image: string;
  images?: string[]; // Additional images for gallery
  featured: boolean;
  sku: string;
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
  count: number;
  image: string;
  description: string;
}

const ManageDecors = () => {
  const [activeTab, setActiveTab] = useState("decors");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Decor | Category | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  // @ts-ignore
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const itemsPerPage = 10;

  const categories = [
    {
      id: 1,
      name: "Wall Art",
      count: 23,
      image: "/banner1.jpg",
      description: "Beautiful wall decorations and art pieces",
    },
    {
      id: 2,
      name: "Vases & Pottery",
      count: 18,
      image: "/craft2.jpg",
      description: "Handcrafted ceramic vases and pottery",
    },
    {
      id: 3,
      name: "Textiles",
      count: 31,
      image: "/craft3.jpg",
      description: "Woven textiles and fabric decorations",
    },
    {
      id: 4,
      name: "Wood Crafts",
      count: 15,
      image: "/craft4.jpg",
      description: "Carved wood art and furniture",
    },
    {
      id: 5,
      name: "Plants & Planters",
      count: 22,
      image: "/craft5.jpg",
      description: "Plant accessories and containers",
    },
    {
      id: 6,
      name: "Lighting",
      count: 12,
      image: "/craft6.jpg",
      description: "Decorative lighting solutions",
    },
  ];

  const decors = [
    {
      id: 1,
      name: "Handwoven Basket Set",
      category: "Textiles",
      price: 89.99,
      stock: 15,
      status: "Active",
      image: "/craft1.jpg",
      images: ["/craft1.jpg", "/craft2.jpg", "/craft3.jpg"],
      featured: true,
      sku: "HBS-001",
      createdAt: "2024-10-15",
    },
    {
      id: 2,
      name: "Ceramic Vase Collection",
      category: "Vases & Pottery",
      price: 156.5,
      stock: 8,
      status: "Active",
      image: "/craft2.jpg",
      images: ["/craft2.jpg", "/craft4.jpg"],
      featured: false,
      sku: "CVC-002",
      createdAt: "2024-10-20",
    },
    {
      id: 3,
      name: "Wooden Wall Art",
      category: "Wall Art",
      price: 245.0,
      stock: 5,
      status: "Active",
      image: "/craft3.jpg",
      images: ["/craft3.jpg", "/craft5.jpg", "/craft6.jpg", "/craft7.jpg"],
      featured: true,
      sku: "WWA-003",
      createdAt: "2024-10-25",
    },
    {
      id: 4,
      name: "Macrame Plant Hanger",
      category: "Plants & Planters",
      price: 34.99,
      stock: 0,
      status: "Out of Stock",
      image: "/craft4.jpg",
      images: ["/craft4.jpg"],
      featured: false,
      sku: "MPH-004",
      createdAt: "2024-11-01",
    },
    {
      id: 5,
      name: "Rustic Table Lamp",
      category: "Lighting",
      price: 128.0,
      stock: 12,
      status: "Active",
      image: "/craft5.jpg",
      images: ["/craft5.jpg", "/craft8.jpg"],
      featured: false,
      sku: "RTL-005",
      createdAt: "2024-11-05",
    },
    {
      id: 6,
      name: "Bohemian Throw Pillow",
      category: "Textiles",
      price: 45.99,
      stock: 25,
      status: "Active",
      image: "/craft6.jpg",
      images: ["/craft6.jpg", "/craft9.jpg", "/craft10.jpg"],
      featured: true,
      sku: "BTP-006",
      createdAt: "2024-11-06",
    },
    {
      id: 7,
      name: "Clay Pot Set",
      category: "Vases & Pottery",
      price: 67.5,
      stock: 18,
      status: "Active",
      image: "/craft7.jpg",
      images: ["/craft7.jpg"],
      featured: false,
      sku: "CPS-007",
      createdAt: "2024-11-07",
    },
  ];

  // Filter items based on search query
  const filteredDecors = decors.filter(
    (decor) =>
      decor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      decor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      decor.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalItems =
    activeTab === "decors" ? filteredDecors.length : filteredCategories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentDecors = filteredDecors.slice(startIndex, endIndex);
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  const handleEdit = (item: Decor | Category) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDelete = (item: Decor | Category) => {
    setSelectedItem(item);
    setShowDeleteConfirm(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedImages((prev) => [...prev, ...fileArray]);

      // Create preview URLs
      fileArray.forEach((file) => {
        const url = URL.createObjectURL(file);
        setImagePreviewUrls((prev) => [...prev, url]);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => {
      URL.revokeObjectURL(prev[index]); // Clean up memory
      return prev.filter((_, i) => i !== index);
    });
  };

  const clearImageSelection = () => {
    imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    setSelectedImages([]);
    setImagePreviewUrls([]);
  };

  // Modal components
  const CreateModal = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        showCreateModal ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl flex font-bold text-warmGray-900">
            Add New {activeTab === "decors" ? "Decor" : "Category"}
          </h2>
          <button
            onClick={() => setShowCreateModal(false)}
            className="text-warmGray-500 hover:text-warmGray-700"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        <form className="space-y-4">
          {activeTab === "decors" ? (
            <>
              <div className="flex flex-col gap-4">
                <Input placeholder="Product Name" />
                {/* <Input placeholder="SKU" /> */}
                <Input placeholder="Price" type="number" />
                <Input placeholder="Stock Quantity" type="number" />
                <select className="px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500">
                  <option>Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <select className="px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500">
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              <textarea
                className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500"
                rows={3}
                placeholder="Product Description"
              ></textarea>
              {/* <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" className="rounded" />
                <label htmlFor="featured">Featured Product</label>
              </div> */}
              <div>
                <label className="block text-sm font-medium text-warmGray-700 mb-2">
                  Product Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelection}
                  className="w-full px-3 py-2 border border-warmGray-300 rounded-lg"
                />
                <p className="text-xs text-warmGray-500 mt-1">
                  Select multiple images for the product gallery. The first
                  image will be the main image.
                </p>

                {/* Image Previews */}
                {imagePreviewUrls.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border border-warmGray-200"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1 rounded-b-lg">
                              Main
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearImageSelection}
                      className="mt-2 text-red-600 hover:text-red-700"
                    >
                      Clear All Images
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Input placeholder="Category Name" />
              <textarea
                className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500"
                rows={2}
                placeholder="Category Description"
              ></textarea>
              {/* <div>
                <label className="block text-sm font-medium text-warmGray-700 mb-2">
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-warmGray-300 rounded-lg"
                />
              </div> */}
            </>
          )}
        </form>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">
            Create {activeTab === "decors" ? "Decor" : "Category"}
          </Button>
        </div>
      </div>
    </div>
  );

  const EditModal = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        showEditModal ? "block" : "hidden"
      }`}
    >
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

        {selectedItem && (
          <form className="space-y-4">
            {activeTab === "decors" ? (
              <>
                <div className="flex flex-col gap-4">
                  <Input
                    placeholder="Product Name"
                    defaultValue={(selectedItem as Decor).name}
                  />
                  {/* <Input
                    placeholder="SKU"
                    defaultValue={(selectedItem as Decor).sku}
                  /> */}
                  <Input
                    placeholder="Price"
                    type="number"
                    defaultValue={(selectedItem as Decor).price}
                  />
                  <Input
                    placeholder="Stock Quantity"
                    type="number"
                    defaultValue={(selectedItem as Decor).stock}
                  />
                  <select
                    className="px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500"
                    defaultValue={(selectedItem as Decor).category}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500"
                    defaultValue={(selectedItem as Decor).status}
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
                {/* <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="editFeatured"
                    className="rounded"
                    defaultChecked={(selectedItem as Decor).featured}
                  />
                  <label htmlFor="editFeatured">Featured Product</label>
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-warmGray-700 mb-2">
                    Product Images
                  </label>
                  {/* Show current images if any */}
                  {selectedItem && (selectedItem as Decor).images && (
                    <div className="mb-4">
                      <p className="text-sm text-warmGray-600 mb-2">
                        Current images:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(selectedItem as Decor).images!.map((img, index) => (
                          <div key={index} className="relative">
                            <img
                              src={img}
                              alt={`Current ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border border-warmGray-200"
                            />
                            {index === 0 && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1 rounded-b-lg">
                                Main
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelection}
                    className="w-full px-3 py-2 border border-warmGray-300 rounded-lg"
                  />
                  <p className="text-xs text-warmGray-500 mt-1">
                    Select new images to add to the gallery. Leave empty to keep
                    current images.
                  </p>

                  {/* New image previews */}
                  {imagePreviewUrls.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-warmGray-600 mb-2">
                        New images to add:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {imagePreviewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border border-warmGray-200"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Input
                  placeholder="Category Name"
                  defaultValue={(selectedItem as Category).name}
                />
                <textarea
                  className="w-full px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500"
                  rows={2}
                  placeholder="Category Description"
                  defaultValue={(selectedItem as Category).description}
                ></textarea>
                {/* <div>
                  <label className="block text-sm font-medium text-warmGray-700 mb-2">
                    Category Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-3 py-2 border border-warmGray-300 rounded-lg"
                  />
                </div> */}
              </>
            )}
          </form>
        )}

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">
            Update {activeTab === "decors" ? "Decor" : "Category"}
          </Button>
        </div>
      </div>
    </div>
  );

  const DeleteConfirmation = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        showDeleteConfirm ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-red-100 p-2 rounded-full">
            <Icon icon="mdi:delete" className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-warmGray-900">
              Delete {activeTab === "decors" ? "Decor" : "Category"}
            </h3>
            <p className="text-warmGray-600">This action cannot be undone.</p>
          </div>
        </div>

        {selectedItem && (
          <p className="text-warmGray-700 mb-6">
            Are you sure you want to delete "
            <strong>{selectedItem.name}</strong>"?
            {activeTab === "categories" &&
              ` This will affect ${
                (selectedItem as Category).count
              } items in this category.`}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              // Handle delete logic here
              setShowDeleteConfirm(false);
              setSelectedItem(null);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );

  const Pagination = () => (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-warmGray-700">
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
        {totalItems} results
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Icon icon="mdi:chevron-left" className="w-4 h-4" />}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        ></Button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="min-w-[2rem]"
              >
                {page}
              </Button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={page} className="px-2 text-warmGray-500">
                ...
              </span>
            );
          }
          return null;
        })}

        <Button
          variant="outline"
          size="sm"
          rightIcon={<Icon icon="mdi:chevron-right" className="w-4 h-4" />}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        ></Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-warmGray-50 to-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-warmGray-900 mb-2">
            Manage Inventory
          </h1>
          <p className="text-warmGray-600">
            Organize your decors and categories
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Icon icon="mdi:plus" className="w-5 h-5" />}
          onClick={() => setShowCreateModal(true)}
        >
          Add New {activeTab === "decors" ? "Decor" : "Category"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-warmGray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => handleTabChange("decors")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "decors"
                  ? "border-craft-500 text-craft-600"
                  : "border-transparent text-warmGray-500 hover:text-warmGray-700 hover:border-warmGray-300"
              }`}
            >
              <Icon
                icon="mdi:flower-tulip"
                className="inline-block w-5 h-5 mr-2"
              />
              Decors ({decors.length})
            </button>
            <button
              onClick={() => handleTabChange("categories")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "categories"
                  ? "border-craft-500 text-craft-600"
                  : "border-transparent text-warmGray-500 hover:text-warmGray-700 hover:border-warmGray-300"
              }`}
            >
              <Icon
                icon="mdi:tag-multiple"
                className="inline-block w-5 h-5 mr-2"
              />
              Categories ({categories.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warmGray-400 w-5 h-5"
              />
              <Input
                placeholder={`Search ${activeTab}...`}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Out of Stock</option>
            </select>
            {activeTab === "decors" && (
              <select className="px-3 py-2 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-craft-500">
                <option>All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      {activeTab === "decors" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warmGray-600">Total Decors</p>
                <p className="text-2xl font-bold text-warmGray-900">
                  {decors.length}
                </p>
              </div>
              <Icon
                icon="mdi:cube-outline"
                className="w-8 h-8 text-craft-500"
              />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warmGray-600">In Stock</p>
                <p className="text-2xl font-bold text-green-600">
                  {decors.filter((d) => d.stock > 0).length}
                </p>
              </div>
              <Icon
                icon="mdi:check-circle"
                className="w-8 h-8 text-green-500"
              />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warmGray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {decors.filter((d) => d.stock === 0).length}
                </p>
              </div>
              <Icon icon="mdi:alert-circle" className="w-8 h-8 text-red-500" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warmGray-600">Featured</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {decors.filter((d) => d.featured).length}
                </p>
              </div>
              <Icon icon="mdi:star" className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>
        </div>
      )}

      {/* Data Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === "decors" ? (
            <table className="w-full">
              <thead className="bg-warmGray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-warmGray-200">
                {currentDecors.map((decor) => (
                  <tr key={decor.id} className="hover:bg-warmGray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={decor.image}
                            alt={decor.name}
                            onError={(e) => {
                              e.currentTarget.src = "/decors.webp";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-warmGray-900 flex items-center gap-2">
                            {decor.name}
                            {decor.featured && (
                              <Icon
                                icon="mdi:star"
                                className="w-4 h-4 text-yellow-500"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-warmGray-900">
                      {decor.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-warmGray-900">
                      {decor.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-warmGray-900 font-semibold">
                      ${decor.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`${
                          decor.stock > 10
                            ? "text-green-600"
                            : decor.stock > 0
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {decor.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          decor.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : decor.status === "Out of Stock"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {decor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-warmGray-500">
                      {new Date(decor.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(decor)}
                          className="text-craft-600 hover:text-craft-900"
                        >
                          <Icon icon="mdi:pencil" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(decor)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Icon icon="mdi:delete" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <thead className="bg-warmGray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                    Items Count
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-warmGray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-warmGray-200">
                {currentCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-warmGray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={category.image}
                            alt={category.name}
                            onError={(e) => {
                              e.currentTarget.src = "/banner1.jpg";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-warmGray-900">
                            {category.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-warmGray-900">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-warmGray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-craft-100 text-craft-800">
                        {category.count} items
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-craft-600 hover:text-craft-900"
                        >
                          <Icon icon="mdi:pencil" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Icon icon="mdi:delete" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && <Pagination />}
      </Card>

      {/* Empty State */}
      {((activeTab === "decors" && currentDecors.length === 0) ||
        (activeTab === "categories" && currentCategories.length === 0)) && (
        <div className="text-center py-12">
          <Icon
            icon={
              activeTab === "decors" ? "mdi:flower-tulip" : "mdi:tag-multiple"
            }
            className="w-12 h-12 text-warmGray-400 mx-auto mb-4"
          />
          <h3 className="text-lg font-medium text-warmGray-900 mb-2">
            No {activeTab} found
          </h3>
          <p className="text-warmGray-600 mb-4">
            {searchQuery
              ? `No ${activeTab} match your search criteria.`
              : `Get started by creating your first ${activeTab.slice(0, -1)}.`}
          </p>
          {!searchQuery && (
            <Button
              variant="primary"
              leftIcon={<Icon icon="mdi:plus" className="w-4 h-4" />}
              onClick={() => setShowCreateModal(true)}
            >
              Add New {activeTab === "decors" ? "Decor" : "Category"}
            </Button>
          )}
        </div>
      )}

      {/* Modals */}
      <CreateModal />
      <EditModal />
      <DeleteConfirmation />
    </div>
  );
};

export default ManageDecors;
