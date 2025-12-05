import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button, Card, CardHeader, CardTitle, CardContent } from "../ui";
import { useDecors, useCategories } from "../../hooks/useApi";

const CraftPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch data from backend
  const {
    decors,
    loading: decorsLoading,
    error: decorsError,
  } = useDecors({
    category: selectedCategory === "all" ? undefined : selectedCategory,
    search: searchTerm || undefined,
    status: "active",
  });

  const { categories, loading: categoriesLoading } = useCategories();

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleQuickView = (item: any) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const handleAddToCart = (item: any) => {
    alert(`Added ${item.name} to cart!`);
  };

  const handleNextImage = () => {
    if (selectedItem && selectedItem.images && selectedItem.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === selectedItem.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedItem && selectedItem.images && selectedItem.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedItem.images.length - 1 : prev - 1
      );
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const formatPrice = (price: number, originalPrice?: number) => {
    if (originalPrice && originalPrice > price) {
      const discountPercentage = Math.round(
        ((originalPrice - price) / originalPrice) * 100
      );
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-craft-600">${price}</span>
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice}
            </span>
          </div>
          <span className="text-xs text-green-600 font-medium">
            Save {discountPercentage}%
          </span>
        </div>
      );
    }
    return <span className="text-lg font-bold text-craft-600">${price}</span>;
  };

  if (decorsLoading || categoriesLoading) {
    return (
      <div className="section-padding bg-gradient-to-br from-warmGray-50 to-craft-50">
        <div className="container-craft">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-craft-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (decorsError) {
    return (
      <div className="section-padding bg-gradient-to-br from-warmGray-50 to-craft-50">
        <div className="container-craft">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">
              Error loading craft items: {decorsError}
            </p>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-gradient-to-br from-warmGray-50 to-craft-50">
      <div className="container-craft">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 text-warmGray-900">
            Our Craft Collection
          </h1>
          <p className="text-lg text-warmGray-600 max-w-3xl mx-auto">
            Discover our curated selection of handcrafted home decor, furniture,
            and accessories. Each piece tells a story of traditional
            craftsmanship meets contemporary design.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories & Filters */}
          <div className="lg:w-80 space-y-6">
            {/* Search */}
            <Card variant="elegant" className="p-4">
              <div className="relative">
                <Icon
                  icon="mdi:magnify"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search crafts..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-transparent"
                />
              </div>
            </Card>

            {/* Categories */}
            <Card variant="elegant" className="sticky top-6">
              <CardHeader>
                <CardTitle level={3}>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === "all"
                        ? "bg-craft-600 text-white"
                        : "hover:bg-craft-50 text-warmGray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon icon="mdi:palette" className="w-5 h-5" />
                      <span>All Categories</span>
                    </div>
                    <span className="text-sm">({decors.length})</span>
                  </button>

                  {categories
                    .filter((cat) => cat.isActive)
                    .map((category) => (
                      <button
                        key={category._id}
                        onClick={() => handleCategoryChange(category._id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          selectedCategory === category._id
                            ? "bg-craft-600 text-white"
                            : "hover:bg-craft-50 text-warmGray-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon icon="mdi:folder" className="w-5 h-5" />
                          <span>{category.name}</span>
                        </div>
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-warmGray-900">
                {decors.length} {decors.length === 1 ? "item" : "items"} found
                {selectedCategory !== "all" && (
                  <span className="text-craft-600 ml-2">
                    in{" "}
                    {categories.find((c) => c._id === selectedCategory)?.name}
                  </span>
                )}
              </h2>
            </div>

            {/* Products Grid */}
            {decors.length === 0 ? (
              <div className="text-center py-12">
                <Icon
                  icon="mdi:package-variant"
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No items found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? `No items match "${searchTerm}". Try adjusting your search.`
                    : "No items available in this category."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {decors.map((item) => (
                  <Card
                    key={item._id}
                    variant="elegant"
                    className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-100"
                  >
                    <div className="relative overflow-hidden rounded-t-lg">
                      <div className="w-full h-72 bg-gray-50 flex items-center justify-center">
                        <img
                          src={item.images[0] || "/placeholder-craft.jpg"}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          style={{ aspectRatio: "auto" }}
                        />
                      </div>

                      {/* Minimal Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {item.originalPrice &&
                          item.originalPrice > item.price && (
                            <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full shadow-sm">
                              {Math.round(
                                ((item.originalPrice - item.price) /
                                  item.originalPrice) *
                                  100
                              )}
                              % OFF
                            </span>
                          )}
                        {item.stock === 0 && (
                          <span className="px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-full shadow-sm">
                            Sold Out
                          </span>
                        )}
                      </div>

                      {/* Hover View Button */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handleQuickView(item)}
                          className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                          title="View Details"
                        >
                          <Icon
                            icon="mdi:eye"
                            className="w-5 h-5 text-gray-700"
                          />
                        </button>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="font-semibold text-warmGray-900 mb-2 text-lg line-clamp-2">
                        {item.name}
                      </h3>

                      <div className="flex items-center justify-between mb-4">
                        {formatPrice(item.price, item.originalPrice)}
                        {item.featured && (
                          <Icon
                            icon="mdi:star"
                            className="w-5 h-5 text-yellow-400"
                          />
                        )}
                      </div>

                      <div className="flex gap-3 justify-center">
                        <Button
                          onClick={() => handleAddToCart(item)}
                          variant="primary"
                          size="sm"
                          className="flex-1 flex flex-row items-center justify-center"
                          disabled={item.stock === 0}
                          title={
                            item.stock === 0 ? "Out of Stock" : "Add to Cart"
                          }
                        >
                          <Icon
                            icon={
                              item.stock === 0 ? "mdi:close" : "mdi:cart-plus"
                            }
                            className="w-4 h-4"
                          />
                        </Button>
                        <Button
                          onClick={() => handleQuickView(item)}
                          variant="outline"
                          size="sm"
                          className="flex-1 flex flex-row items-center justify-center"
                          title="View Details"
                        >
                          <Icon icon="mdi:eye" className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick View Modal */}
        {isModalOpen && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-warmGray-900">
                    {selectedItem.name}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Icon icon="mdi:close" className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Images */}
                  <div>
                    {selectedItem.images && selectedItem.images.length > 0 ? (
                      <div className="relative">
                        <img
                          src={
                            selectedItem.images[currentImageIndex] ||
                            "/placeholder-craft.jpg"
                          }
                          alt={selectedItem.name}
                          className="w-full h-auto max-h-96 object-contain rounded-lg bg-gray-50"
                          style={{ aspectRatio: "auto" }}
                        />

                        {selectedItem.images.length > 1 && (
                          <>
                            <button
                              onClick={handlePrevImage}
                              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                            >
                              <Icon
                                icon="mdi:chevron-left"
                                className="w-5 h-5"
                              />
                            </button>
                            <button
                              onClick={handleNextImage}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                            >
                              <Icon
                                icon="mdi:chevron-right"
                                className="w-5 h-5"
                              />
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-64 md:h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Icon
                          icon="mdi:image"
                          className="w-16 h-16 text-gray-400"
                        />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div>
                    <div className="mb-6">
                      <div className="flex items-start justify-between">
                        <div>
                          {formatPrice(
                            selectedItem.price,
                            selectedItem.originalPrice
                          )}
                        </div>
                        {selectedItem.featured && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                            <Icon icon="mdi:star" className="w-4 h-4" />
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Rating and Views */}
                      <div className="flex items-center gap-6 mt-3">
                        <div className="flex items-center gap-1 text-sm text-warmGray-600">
                          <Icon
                            icon="mdi:star"
                            className="w-4 h-4 text-yellow-400"
                          />
                          <span className="font-medium">
                            {selectedItem.rating?.average?.toFixed(1) || "0.0"}
                          </span>
                          <span>
                            ({selectedItem.rating?.count || 0} reviews)
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-warmGray-600">
                          <Icon icon="mdi:eye" className="w-4 h-4" />
                          <span>{selectedItem.views || 0} views</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-warmGray-600">
                          <Icon icon="mdi:shopping" className="w-4 h-4" />
                          <span>{selectedItem.salesCount || 0} sold</span>
                        </div>
                      </div>

                      {/* Add to Cart Button - Prominent placement */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <Button
                          onClick={() => handleAddToCart(selectedItem)}
                          variant={
                            selectedItem.stock === 0 ? "outline" : "primary"
                          }
                          size="lg"
                          className={`w-full py-4 text-lg font-semibold !flex !flex-row !items-center !justify-center rounded-md ${
                            selectedItem.stock === 0
                              ? "text-gray-500 border-gray-300"
                              : "bg-craft-600 hover:bg-craft-700 text-white"
                          }`}
                          disabled={selectedItem.stock === 0}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon
                            icon={
                              selectedItem.stock === 0
                                ? "mdi:close-circle"
                                : "mdi:cart-plus"
                            }
                            className="w-5 h-5 mr-3 flex-shrink-0"
                          />
                          <span className="flex-shrink-0">
                            {selectedItem.stock === 0
                              ? "Out of Stock"
                              : "Add to Cart"}
                          </span>
                        </Button>

                        {selectedItem.stock > 0 && selectedItem.stock <= 5 && (
                          <p className="text-sm text-orange-600 mt-2 text-center">
                            <Icon
                              icon="mdi:alert"
                              className="w-4 h-4 inline mr-1"
                            />
                            Only {selectedItem.stock} left in stock!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-warmGray-900 mb-3 text-lg">
                        About this item
                      </h4>
                      <p className="text-warmGray-600 leading-relaxed">
                        {selectedItem.description}
                      </p>
                    </div>

                    {/* Product Info Grid */}
                    <div className="mb-6 grid grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="block text-sm font-medium text-warmGray-500 mb-1">
                          Category
                        </span>
                        <span className="text-warmGray-900">
                          {selectedItem.category?.name || "Uncategorized"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-warmGray-500 mb-1">
                          Availability
                        </span>
                        <span
                          className={`font-medium ${
                            selectedItem.stock > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {selectedItem.stock > 0
                            ? `${selectedItem.stock} in stock`
                            : "Out of stock"}
                        </span>
                      </div>
                      {selectedItem.originalPrice &&
                        selectedItem.originalPrice > selectedItem.price && (
                          <div>
                            <span className="block text-sm font-medium text-warmGray-500 mb-1">
                              You Save
                            </span>
                            <span className="font-medium text-green-600">
                              ${selectedItem.originalPrice - selectedItem.price}{" "}
                              (
                              {Math.round(
                                ((selectedItem.originalPrice -
                                  selectedItem.price) /
                                  selectedItem.originalPrice) *
                                  100
                              )}
                              %)
                            </span>
                          </div>
                        )}
                      <div>
                        <span className="block text-sm font-medium text-warmGray-500 mb-1">
                          Status
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedItem.status === "active"
                              ? "bg-green-100 text-green-800"
                              : selectedItem.status === "out_of_stock"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {selectedItem.status.replace("_", " ").toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-warmGray-500 mb-1">
                          Product ID
                        </span>
                        <span className="text-warmGray-900 font-mono text-sm">
                          {selectedItem._id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Materials */}
                    {selectedItem.materials &&
                      selectedItem.materials.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-medium text-warmGray-900 mb-2">
                            Materials
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedItem.materials.map(
                              (material: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                                >
                                  {material}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {selectedItem.tags && selectedItem.tags.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-medium text-warmGray-900 mb-2">
                          Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.tags.map(
                            (tag: string, index: number) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-craft-100 text-craft-700 text-sm rounded-full"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CraftPage;
