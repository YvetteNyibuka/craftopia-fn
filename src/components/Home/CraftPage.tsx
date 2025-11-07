import { useState } from "react";
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
    price: "$625.00",
    rating: 5,
    description: "Intricate hand-carved piece featuring traditional motifs.",
    category: "sculpture",
    badge: "Limited",
    inStock: true,
  },
];

const categories = [
  { id: "all", name: "View All", icon: "🎨", count: craftData.length },
  {
    id: "wall-art",
    name: "Wall Art & Decor",
    icon: "🖼️",
    count: craftData.filter((c) => c.category === "wall-art").length,
  },
  { id: "lighting", name: "Lighting & Lamps", icon: "💡", count: 2 },
  {
    id: "textiles",
    name: "Rugs & Textiles",
    icon: "🧵",
    count: craftData.filter((c) => c.category === "textiles").length,
  },
  {
    id: "furniture",
    name: "Furniture & Storage",
    icon: "🪑",
    count: craftData.filter((c) => c.category === "furniture").length,
  },
  {
    id: "decor",
    name: "Home Accessories",
    icon: "🏺",
    count: craftData.filter((c) => c.category === "decor").length,
  },
  {
    id: "jewelry",
    name: "Handmade Jewelry",
    icon: "💎",
    count: craftData.filter((c) => c.category === "jewelry").length,
  },
];

const CraftPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
    alert(`Quick view for craft ${craftId}`);
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
                        <span className="text-xl">{category.icon}</span>
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
                  <ProductCard
                    key={craft.id}
                    image={craft.image}
                    imageAlt={craft.name}
                    title={craft.name}
                    description={craft.description}
                    price={craft.price}
                    originalPrice={craft.originalPrice}
                    rating={craft.rating}
                    badge={craft.badge}
                    inStock={craft.inStock}
                    onAddToCart={() => handleAddToCart(craft.id)}
                    onQuickView={() => handleQuickView(craft.id)}
                    className="animate-fade-in"
                  />
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
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-warmGray-900">
                              {craft.price}
                            </span>
                            {craft.originalPrice && (
                              <span className="text-sm text-warmGray-500 line-through">
                                {craft.originalPrice}
                              </span>
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
                                size="sm"
                                onClick={() => handleAddToCart(craft.id)}
                              >
                                Add to Cart
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" disabled>
                                Out of Stock
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

    
      </div>
    </div>
  );
};

export default CraftPage;
