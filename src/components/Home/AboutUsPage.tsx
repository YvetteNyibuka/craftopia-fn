const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">Our Story</h1>
        <p className="text-lg md:text-xl mt-4 text-gray-600 max-w-2xl mx-auto">
          At Craftopia, we believe in turning simple materials into beautiful home decor pieces that inspire joy and connection. Our mission is to craft sustainable, handmade pieces that bring life to your home while supporting artisans globally.
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white border p-8 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold text-gray-800">98%</h2>
          <p className="text-center text-gray-600 mt-2">Customer satisfaction rate, reflecting our commitment to quality.</p>
        </div>
        <div className="bg-white border p-8 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold text-gray-800">90%</h2>
          <p className="text-center text-gray-600 mt-2">Our furniture is made from eco-friendly materials.</p>
        </div>
        <div className="bg-white border p-8 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold text-gray-800">30+</h2>
          <p className="text-center text-gray-600 mt-2">We source our materials & products from over 30 countries.</p>
        </div>
      </section>

      {/* Image Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img src="/team2.jpg" alt="Craft team at work" className="w-full h-64  lg:h-[40rem] object-cover rounded-lg" />
          <p className="text-lg text-gray-600 mt-4">Our team passionately creating unique crafts with love and dedication.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img src="/decors.webp" alt="Craft products" className="w-full h-64 lg:h-[40rem] object-cover rounded-lg" />
          <p className="text-lg text-gray-600 mt-4">Handmade products that reflect our commitment to quality and sustainability.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Crafting with Purpose</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Our mission is to create products that not only beautify your home but also support sustainable practices and local artisans. From sourcing eco-friendly materials to ensuring fair wages for our craftsmen, we are dedicated to making a positive impact on both your living spaces and the environment.
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Get to Know Us Better</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
          Whether you're looking for unique home decor or want to know more about our sustainable practices, we're here to help. Visit our shop to explore more!
        </p>
        <a href="/shop" className="inline-block mt-6 px-8 py-4 bg-teal-600 text-white text-lg rounded-lg shadow hover:bg-teal-700 transition duration-300">Visit Our Shop</a>
      </section>
    </div>
  );
};

export default AboutUsPage;
