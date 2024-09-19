import { useState, useEffect } from 'react';

const LandingPage = () => {
  const images = [
    '/banner22.jpg',
    '/banner33.jpg',
    '/banner4.jpg',
    '/banner5.jpg',
    '/banner6.jpg',
    '/banner7.jpg',
    '/banner8.jpg',
    '/banner9.jpg',
    '/banner10.jpg',
  ];


  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, [images.length]);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        transition: 'background-image 1s ease-in-out',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="relative z-10 flex flex-col items-center text-center p-10">
        <h1 className="text-6xl font-extrabold text-white mb-6 leading-tight">
          Crafted with Love,<br /> Made for You
        </h1>
        <p className="text-gray-300 text-lg mb-8 max-w-lg">
          Thank you for visiting Craftopia, where we bring beauty and artistry into your home. We can’t wait to see how you transform your space with our curated decor pieces. Explore a world of artisanal decor that sparks joy and creativity — from rustic wooden accents to modern minimalist designs.
        </p>
        <button className="bg-red-500 hover:bg-red-500 text-white px-6 py-3 rounded-xl text-lg shadow-lg transition-transform transform hover:scale-105">
          Discover More
        </button>
     
      </div>
    </div>
  );
};

export default LandingPage;
