import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: "mdi:leaf",
      title: "Sustainable",
      description: "Eco-friendly materials and practices in every creation",
    },
    {
      icon: "mdi:hand-heart",
      title: "Handcrafted",
      description: "Each piece lovingly made by skilled artisan hands",
    },
    {
      icon: "mdi:earth",
      title: "Global Impact",
      description: "Supporting communities and artisans worldwide",
    },
    {
      icon: "mdi:diamond-stone",
      title: "Quality First",
      description: "Premium materials and timeless design principles",
    },
  ];

  const journey = [
    {
      year: "2019",
      title: "The Beginning",
      description:
        "Founded with a dream to connect homes with authentic handcrafted beauty",
      image: "/banner1.jpg",
    },
    {
      year: "2021",
      title: "Global Network",
      description:
        "Partnered with artisans from 30+ countries, creating a worldwide craft community",
      image: "/banner2.jpg",
    },
    {
      year: "2023",
      title: "Sustainability Focus",
      description:
        "Achieved 90% eco-friendly material sourcing and zero-waste workshops",
      image: "/banner3.jpg",
    },
    {
      year: "2025",
      title: "Your Story",
      description:
        "Continuing to bring artisan magic into homes across the globe",
      image: "/banner4.jpg",
    },
  ];

  return (
    <div id="about" className="min-h-screen bg-gradient-to-b from-warmGray-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/about-hero.jpg')",
            filter: "brightness(0.3) contrast(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-orange-300/30 rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-orange-400/20 rounded-lg rotate-45 animate-spin-slow" />

        <div
          className={`relative z-10 text-center max-w-4xl px-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-6">
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mb-4" />
            <span className="text-orange-300 text-sm tracking-[0.3em] uppercase font-light">
              Our Journey
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-white leading-tight mb-8">
            Crafting Stories,
            <br />
            <span className="text-5xl md:text-7xl font-light italic text-orange-300">
              One Piece at a Time
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            From humble workshops to global artisan networks, discover how
            passion, purpose, and craftsmanship shaped the{" "}
            <span className="text-orange-300 font-medium">Craftopia story</span>
            .
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-warmGray-800 mb-6">
              What Drives Us
            </h2>
            <div className="w-20 h-[3px] bg-gradient-to-r from-orange-400 to-terracotta-500 mx-auto mb-6" />
            <p className="text-xl text-warmGray-600 max-w-3xl mx-auto leading-relaxed">
              Every piece we create is infused with values that matter to us and
              to the world we share.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                variant="elegant"
                className="group p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <Icon icon={value.icon} className="w-12 h-12 text-craft-500" />
                </div>
                <h3 className="text-xl font-semibold text-warmGray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-warmGray-600 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gradient-to-r from-craft-50 to-sage-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-warmGray-800 mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-warmGray-600 max-w-2xl mx-auto">
              Real results from our commitment to quality, sustainability, and
              global artisan support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              variant="elegant"
              className="text-center p-12 group hover:shadow-2xl transition-all duration-500"
            >
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-craft-500 to-sage-500 mb-4 group-hover:scale-105 transition-transform duration-300">
                98%
              </div>
              <h3 className="text-xl font-semibold text-warmGray-800 mb-2">
                Customer Joy
              </h3>
              <p className="text-warmGray-600 leading-relaxed">
                Customers who say our pieces brought warmth and character to
                their homes
              </p>
            </Card>

            <Card
              variant="elegant"
              className="text-center p-12 group hover:shadow-2xl transition-all duration-500"
            >
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-forest-500 to-terracotta-500 mb-4 group-hover:scale-105 transition-transform duration-300">
                90%
              </div>
              <h3 className="text-xl font-semibold text-warmGray-800 mb-2">
                Eco-Friendly
              </h3>
              <p className="text-warmGray-600 leading-relaxed">
                Of our materials are sustainably sourced and environmentally
                responsible
              </p>
            </Card>

            <Card
              variant="elegant"
              className="text-center p-12 group hover:shadow-2xl transition-all duration-500"
            >
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-terracotta-500 to-sage-500 mb-4 group-hover:scale-105 transition-transform duration-300">
                30+
              </div>
              <h3 className="text-xl font-semibold text-warmGray-800 mb-2">
                Global Reach
              </h3>
              <p className="text-warmGray-600 leading-relaxed">
                Countries where we partner with local artisans and craftspeople
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-warmGray-800 mb-6">
              Our Journey Through Time
            </h2>
            <div className="w-20 h-[3px] bg-gradient-to-r from-orange-400 to-terracotta-500 mx-auto mb-6" />
            <p className="text-xl text-warmGray-600 max-w-3xl mx-auto leading-relaxed">
              From a small workshop dream to a global community of artisans and
              craft lovers.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-craft-300 via-sage-300 to-terracotta-300" />

            <div className="space-y-16">
              {journey.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "pr-8" : "pl-8"
                    }`}
                  >
                    <Card
                      variant="elegant"
                      className="p-8 group hover:shadow-xl transition-all duration-500"
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-gradient-to-r from-craft-500 to-sage-500 text-white px-4 py-2 rounded-full font-bold">
                          {milestone.year}
                        </div>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-warmGray-800 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-warmGray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </Card>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-craft-500 to-sage-500 rounded-full border-4 border-white shadow-lg" />

                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "pl-8" : "pr-8"
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                      <img
                        src={milestone.image}
                        alt={milestone.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback for missing images
                          e.currentTarget.src = "/team2.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artisan Spotlight */}
      <section className="py-20 bg-gradient-to-r from-sage-50 to-craft-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-orange-200 rounded-2xl -z-10" />
              <img
                src="/artisan-hero.jpg"
                alt="Master artisan at work"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "/team2.jpg";
                }}
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold text-craft-600">500+</div>
                <div className="text-sm text-warmGray-600">
                  Skilled Artisans
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-warmGray-800 mb-6">
                Meet Our Artisan Family
              </h2>
              <div className="w-20 h-[3px] bg-gradient-to-r from-orange-400 to-terracotta-500 mb-6" />
              <p className="text-xl text-warmGray-600 leading-relaxed mb-6">
                Behind every Craftopia piece is a passionate artisan whose hands
                tell stories of tradition, skill, and love for their craft.
              </p>
              <p className="text-lg text-warmGray-600 leading-relaxed mb-8">
                From wood carvers in Indonesia to textile artists in Peru, our
                global network of makers brings diverse techniques and cultural
                richness to every creation. We ensure fair wages, safe working
                conditions, and respect for traditional methods.
              </p>
              <Button
                variant="forest"
                size="lg"
                className="group px-8 py-4 text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <span className="flex items-center gap-3">
                  Meet Our Artisans
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
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/cta-bg.jpg')",
            filter: "brightness(0.3)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-craft-900/80 to-sage-900/80" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Join Our Story
          </h2>
          <div className="w-24 h-[3px] bg-gradient-to-r from-orange-400 to-terracotta-500 mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-12 max-w-3xl mx-auto">
            Every piece you choose becomes part of your story and continues the
            legacy of skilled artisans. Discover handcrafted treasures that
            transform houses into homes.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              variant="terracotta"
              size="xl"
              className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-12 py-4 text-lg shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <span className="flex items-center gap-3">
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
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
