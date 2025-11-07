import { useState, useEffect } from "react";
import { Button } from "../ui/Button";

const LandingPage = () => {
  const images = [
    "/banner22.jpg",
    "/banner33.jpg",
    "/banner4.jpg",
    "/banner5.jpg",
    "/banner6.jpg",
    "/banner7.jpg",
    "/banner8.jpg",
    "/banner9.jpg",
    "/banner10.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Floating particles animation data
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Dynamic Background with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-out transform scale-105"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          filter: "brightness(0.4) contrast(1.2) saturate(1.1)",
        }}
      />

      {/* Gradient Overlays for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-orange-900/20" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/10 animate-float"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Artistic Geometric Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-lg rotate-45 animate-spin-slow" />
      <div className="absolute top-1/3 right-20 w-16 h-16 border-2 border-white/20 rotate-12 animate-bounce-slow" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 lg:px-12">
        <div
          className={`flex flex-col items-center text-center max-w-5xl transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Decorative Top Element */}
          <div className="mb-8 relative">
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent mb-4" />
            <div className="text-orange-300 text-sm tracking-[0.3em] uppercase font-light">
              Artisan Collection
            </div>
          </div>

          {/* Main Heading with Artistic Typography */}
          <h1 className="relative mb-8">
            <span className="block text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-white leading-[0.9] font-serif tracking-tight">
              Crafted with
            </span>
            <span className="block text-6xl lg:text-7xl font-light text-orange-300 mt-2 italic tracking-wide">
              Love & Soul
            </span>

            {/* Decorative Underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-[3px] bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
          </h1>

          {/* Enhanced Description */}
          <div className="relative mb-12 max-w-3xl">
            <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed font-light mb-6">
              Welcome to{" "}
              <span className="text-orange-300 font-medium">Craftopia</span>,
              where every piece tells a story of
              <span className="text-white font-medium">
                {" "}
                artistry and passion
              </span>
              .
            </p>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Discover handcrafted treasures that transform spaces into
              sanctuaries of beauty. From{" "}
              <span className="text-orange-200">
                rustic wooden masterpieces
              </span>{" "}
              to
              <span className="text-orange-200">
                {" "}
                contemporary minimalist marvels
              </span>{" "}
              — each creation is born from the hearts of skilled artisans.
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <Button
              variant="terracotta"
              size="xl"
              className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-12 py-4 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-orange-500/25"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Collection
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="group border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full transition-all duration-300 hover:border-orange-300"
            >
              <span className="flex items-center gap-2">
                Watch Story
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Image Navigation Dots */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-orange-400 scale-125 shadow-lg shadow-orange-400/50"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
