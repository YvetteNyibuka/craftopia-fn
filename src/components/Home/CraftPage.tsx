import { useState } from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  ProductCard,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui";

const craftData = [
  {
    id: 1,
    name: "Artisan Diamond Halo Collection",
    image: "/craft1.jpg",
    images: ["/craft1.jpg", "/craft2.jpg", "/craft3.jpg"],
    price: "$269.00",
    originalPrice: "$299.00",
    rating: 5,
    description:
      "Handcrafted with precision and featuring elegant diamond-inspired patterns.",
    category: "wall-art",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 2,
    name: "Elegant Halo Stud Earrings",
    image: "/craft2.jpg",
    images: ["/craft2.jpg", "/craft4.jpg"],
    price: "$472.00",
    rating: 4,
    description: "Sophisticated jewelry pieces perfect for special occasions.",
    category: "jewelry",
    badge: "New",
    inStock: true,
  },
  {
    id: 3,
    name: "Rustic Wooden Accent Piece",
    image: "/craft3.jpg",
    images: ["/craft3.jpg", "/craft5.jpg", "/craft6.jpg", "/craft7.jpg"],
    price: "$459.00",
    rating: 5,
    description: "Unique reclaimed wood creation with natural finish.",
    category: "furniture",
    inStock: true,
  },
  {
    id: 4,
    name: "Custom Ceramic Vase Set",
    image: "/craft4.jpg",
    images: ["/craft4.jpg", "/craft8.jpg"],
    price: "$359.00",
    originalPrice: "$399.00",
    rating: 4,
    description: "Hand-thrown ceramics with glazed finish in earth tones.",
    category: "decor",
    badge: "Sale",
    inStock: true,
  },
  {
    id: 5,
    name: "Woven Textile Wall Hanging",
    image: "/craft5.jpg",
    images: ["/craft5.jpg", "/craft9.jpg", "/craft10.jpg"],
    price: "$189.00",
    rating: 5,
    description: "Traditional weaving techniques meet modern design.",
    category: "textiles",
    inStock: false,
  },
  {
    id: 6,
    name: "Carved Wooden Sculpture",
    image: "/craft6.jpg",
    images: ["/craft6.jpg"],
    price: "$625.00",
    rating: 5,
    description: "Intricate hand-carved piece featuring traditional motifs.",
    category: "sculpture",
    badge: "Limited",
    inStock: true,
  },
];

const categories = [
  { id: "all", name: "View All", icon: "mdi:palette", count: craftData.length },
  {
    id: "wall-art",
    name: "Wall Art & Decor",
    icon: "mdi:image-frame",
    count: craftData.filter((c) => c.category === "wall-art").length,
  },
  { id: "lighting", name: "Lighting & Lamps", icon: "mdi:lightbulb-on", count: 2 },
  {
    id: "textiles",
    name: "Rugs & Textiles",
    icon: "mdi:fabric",
    count: craftData.filter((c) => c.category === "textiles").length,
  },
  {
    id: "furniture",
    name: "Furniture & Storage",
    icon: "mdi:chair-rolling",
    count: craftData.filter((c) => c.category === "furniture").length,
  },
  {
    id: "decor",
    name: "Home Accessories",
    icon: "mdi:home-variant",
    count: craftData.filter((c) => c.category === "decor").length,
  },
  {
    id: "jewelry",
    name: "Handmade Jewelry",
    icon: "mdi:diamond-stone",
    count: craftData.filter((c) => c.category === "jewelry").length,
  },
];

const CraftPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCraft, setSelectedCraft] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredCrafts =
    selectedCategory === "all"
      ? craftData
      : craftData.filter((craft) => craft.category === selectedCategory);

  const sortedCrafts = [...filteredCrafts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", ""))
        );
      case "price-high":
        return (
          parseFloat(b.price.replace("$", "")) -
          parseFloat(a.price.replace("$", ""))
        );
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleAddToCart = (craftId: number) => {
    alert(`Added craft ${craftId} to cart!`);
  };

  const handleQuickView = (craftId: number) => {
    const craft = craftData.find((c) => c.id === craftId);
    if (craft) {
      setSelectedCraft(craft);
      setCurrentImageIndex(0);
      setIsModalOpen(true);
    }
  };

  const handleNextImage = () => {
    if (selectedCraft && selectedCraft.images) {
      setCurrentImageIndex((prev) =>
        prev === selectedCraft.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedCraft && selectedCraft.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedCraft.images.length - 1 : prev - 1
      );
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCraft(null);
    setCurrentImageIndex(0);
  };

  return (
    <div className="section-padding bg-gradient-to-br from-warmGray-50 to-craft-50">
      <div className="container-craft">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-display mb-6 text-warmGray-900">
            Our Craft Collection
          </h1>
          <p className="text-body-large text-warmGray-600 max-w-3xl mx-auto">
            Discover our curated selection of handcrafted home decor, furniture,
            and accessories. Each piece tells a story of traditional
            craftsmanship meets contemporary design.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories & Filters */}
          <div className="lg:w-80 space-y-6">
            {/* Categories */}
            <Card variant="elegant" size="lg" className="sticky top-6">
              <CardHeader>
                <CardTitle level={3}>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                        selectedCategory === category.id
                          ? "bg-craft-500 text-white shadow-craft"
                          : "bg-white hover:bg-craft-50 text-warmGray-700 border border-warmGray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon icon={category.icon} className="w-5 h-5" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          selectedCategory === category.id
                            ? "bg-white/20 text-white"
                            : "bg-warmGray-100 text-warmGray-600"
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-body text-warmGray-600">
                  {filteredCrafts.length}{" "}
                  {filteredCrafts.length === 1 ? "item" : "items"}
                </span>

                {/* View Mode Toggle */}
                <div className="flex bg-warmGray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-1 rounded-md text-sm transition-all ${
                      viewMode === "grid"
                        ? "bg-white text-warmGray-900 shadow-sm"
                        : "text-warmGray-600 hover:text-warmGray-900"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1 rounded-md text-sm transition-all ${
                      viewMode === "list"
                        ? "bg-white text-warmGray-900 shadow-sm"
                        : "text-warmGray-600 hover:text-warmGray-900"
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-3">
                <span className="text-body-small text-warmGray-600">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-warmGray-300 rounded-lg text-sm focus:border-craft-500 focus:ring-2 focus:ring-craft-500 focus:ring-offset-1"
                >
                  <option value="featured">Featured</option>
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedCrafts.map((craft) => (
                  <Card
                    key={craft.id}
                    variant="elegant"
                    hover="lift"
                    className="group overflow-hidden animate-fade-in"
                  >
                    <div className="relative">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={craft.image}
                          alt={craft.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Badge */}
                      {craft.badge && (
                        <span className="absolute top-3 left-3 bg-craft-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                          {craft.badge}
                        </span>
                      )}

                      {/* Preview Button - Shows on hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleQuickView(craft.id)}
                          className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                          Quick Preview
                        </Button>
                      </div>

                      {/* Image Count Indicator */}
                      {craft.images && craft.images.length > 1 && (
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                          <svg
                            className="w-4 h-4 inline mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {craft.images.length}
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-warmGray-900 mb-2 line-clamp-2">
                        {craft.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < craft.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-warmGray-500 ml-1">
                          ({craft.rating})
                        </span>
                      </div>

                      {/* Price and Cart Icon */}
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-xl font-bold text-warmGray-900">
                            {craft.price}
                          </div>
                          {craft.originalPrice && (
                            <div className="text-sm text-warmGray-500 line-through">
                              {craft.originalPrice}
                            </div>
                          )}
                        </div>

                        {/* Cart Icon Button */}
                        {craft.inStock ? (
                          <Button
                            variant="primary"
                            size="icon"
                            onClick={() => handleAddToCart(craft.id)}
                            className="rounded-full hover:scale-110 transition-transform duration-200"
                            title="Add to Cart"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 17a2 2 0 100 4 2 2 0 000-4zM9 17a2 2 0 100 4 2 2 0 000-4z"
                              />
                            </svg>
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled
                            className="rounded-full bg-gray-200 cursor-not-allowed text-gray-500"
                            title="Out of Stock"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 17a2 2 0 100 4 2 2 0 000-4zM9 17a2 2 0 100 4 2 2 0 000-4z"
                              />
                            </svg>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedCrafts.map((craft) => (
                  <Card
                    key={craft.id}
                    variant="default"
                    hover="lift"
                    className="animate-fade-in"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          src={craft.image}
                          alt={craft.name}
                          className="w-full h-48 md:h-full object-cover rounded-l-xl"
                        />
                      </div>
                      <CardContent className="md:w-2/3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-heading-3 text-warmGray-900">
                              {craft.name}
                            </h3>
                            {craft.badge && (
                              <span className="bg-terracotta-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                {craft.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-body text-warmGray-600 mb-4">
                            {craft.description}
                          </p>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-sm ${
                                    i < craft.rating
                                      ? "text-yellow-400"
                                      : "text-warmGray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-sm text-warmGray-500">
                              ({craft.rating}/5)
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xl font-bold text-warmGray-900">
                              {craft.price}
                            </div>
                            {craft.originalPrice && (
                              <div className="text-sm text-warmGray-500 line-through">
                                {craft.originalPrice}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickView(craft.id)}
                            >
                              Quick View
                            </Button>
                            {craft.inStock ? (
                              <Button
                                variant="primary"
                                size="icon"
                                onClick={() => handleAddToCart(craft.id)}
                                className="rounded-full"
                                title="Add to Cart"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 17a2 2 0 100 4 2 2 0 000-4zM9 17a2 2 0 100 4 2 2 0 000-4z"
                                  />
                                </svg>
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled
                                className="rounded-full bg-gray-200 text-gray-500"
                                title="Out of Stock"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 17a2 2 0 100 4 2 2 0 000-4zM9 17a2 2 0 100 4 2 2 0 000-4z"
                                  />
                                </svg>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More / Pagination */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-12">
                Load More Items
              </Button>
              <p className="text-body-small text-warmGray-500 mt-4">
                Showing {sortedCrafts.length} of {craftData.length} items
              </p>
            </div>
          </div>
        </div>

        {/* Image Gallery Modal */}
        {isModalOpen && selectedCraft && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-4 py-8">
              <div className="fixed inset-0 bg-black/70" onClick={closeModal} />
              <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-auto">
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Gallery Section */}
                  <div className="relative">
                    {/* Main Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={
                          selectedCraft.images?.[currentImageIndex] ||
                          selectedCraft.image
                        }
                        alt={selectedCraft.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Navigation Arrows - Only show if more than 1 image */}
                      {selectedCraft.images &&
                        selectedCraft.images.length > 1 && (
                          <>
                            <button
                              onClick={handlePrevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 19l-7-7 7-7"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={handleNextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </>
                        )}

                      {/* Image Counter */}
                      {selectedCraft.images &&
                        selectedCraft.images.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                            {currentImageIndex + 1} /{" "}
                            {selectedCraft.images.length}
                          </div>
                        )}
                    </div>

                    {/* Thumbnail Gallery */}
                    {selectedCraft.images &&
                      selectedCraft.images.length > 1 && (
                        <div className="flex gap-2 p-4 overflow-x-auto">
                          {selectedCraft.images.map(
                            (image: string, index: number) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                  index === currentImageIndex
                                    ? "border-craft-600 ring-2 ring-craft-200"
                                    : "border-gray-200 hover:border-craft-400"
                                }`}
                              >
                                <img
                                  src={image}
                                  alt={`${selectedCraft.name} ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            )
                          )}
                        </div>
                      )}
                  </div>

                  {/* Product Details Section */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        {selectedCraft.badge && (
                          <span className="inline-block bg-craft-600 text-white text-xs px-2 py-1 rounded-full mb-3">
                            {selectedCraft.badge}
                          </span>
                        )}
                        <h2 className="text-2xl font-bold text-warmGray-900 mb-2">
                          {selectedCraft.name}
                        </h2>
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < selectedCraft.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-sm text-warmGray-600 ml-2">
                            ({selectedCraft.rating}.0)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl font-bold text-warmGray-900">
                          {selectedCraft.price}
                        </span>
                        {selectedCraft.originalPrice && (
                          <span className="text-xl text-warmGray-500 line-through">
                            {selectedCraft.originalPrice}
                          </span>
                        )}
                      </div>
                      <p className="text-warmGray-600 leading-relaxed">
                        {selectedCraft.description}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={closeModal}
                      >
                        Close
                      </Button>
                      {selectedCraft.inStock ? (
                        <Button
                          variant="primary"
                          className="flex-1"
                          onClick={() => {
                            handleAddToCart(selectedCraft.id);
                            closeModal();
                          }}
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <Button variant="ghost" className="flex-1" disabled>
                          Out of Stock
                        </Button>
                      )}
                    </div>
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