const craftData = [
  {
    id: 1,
    name: 'Diamond Halo Stud Dolor',
    image: '/craft1.jpg',
    price: '$269.00',
    rating: 5,
  },
  {
    id: 2,
    name: 'Diamond Halo Stud Earrings',
    image: '/craft2.jpg',
    price: '$472.00',
    rating: 4,
  },
  {
    id: 3,
    name: 'Kiamond Halo Stud Cum',
    image: '/craft3.jpg',
    price: '$459.00',
    rating: 3,
  },
  {
    id: 4,
    name: 'Kiamond Halo Stud Cum',
    image: '/craft4.jpg',
    price: '$459.00',
    rating: 3,
  },
  {
    id: 5,
    name: 'Kiamond Halo Stud Cum',
    image: '/craft5.jpg',
    price: '$459.00',
    rating: 3,
  },
  {
    id: 6,
    name: 'Kiamond Halo Stud Cum',
    image: '/craft6.jpg',
    price: '$459.00',
    rating: 3,
  },
  // Add more crafts here
];

const CraftPage = () => {

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full p-6 md:p-10">
      {/* Left Section: Categories */}
      <div className="w-full md:w-1/4 bg-teal-700 text-white h-fit rounded-xl p-6 relative mb-6 md:mb-0">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Home Decor</h2>
        <ul className="space-y-8">
          <li className="bg-white text-teal-700 rounded-full px-4 py-2">
            Wall Art & Decor
          </li>
          <li className="bg-white text-teal-700 rounded-full px-4 py-2">
            Lighting & Lamps
          </li>
          <li className="bg-white text-teal-700 rounded-full px-4 py-2">
            Rugs & Carpets
          </li>
          <li className="bg-white text-teal-700 rounded-full px-4 py-2">
            Curtains & Blinds
          </li>
          <li className="bg-white text-teal-700 rounded-full px-4 py-2">
            View All
          </li>
        </ul>
        <div
          className="absolute bottom-0 left-0 right-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/craft-background.jpg')`, height: '100px' }}
        ></div>
      </div>

      {/* Right Section: Craft Cards */}
      <div className="w-full md:w-3/4 relative">
        <div className="flex overflow-hidden w-full rounded-xl ">

          <div
            className="grid gap-6 grid-col-1 md:grid-cols-2 md:gap-4 md:p-4 lg:grid-cols-4 lg:gap-6 lg:p-6 transition-transform duration-500 ease-in-out w-[100%] "
          >
            {craftData.map((craft) => (
              <div
                key={craft.id}
                className="w-full bg-white rounded-lg shadow-xl border p-4 relative flex-shrink-0"
              >
                <img
                  src={craft.image}
                  alt={craft.name}
                  className="w-full h-72 object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-opacity-50 transition-opacity">
                  <button className="bg-red-500 text-white px-4 py-2 rounded-full">Add to Cart</button>
                </div>
                <h3 className="text-lg md:text-xl font-bold mt-4">{craft.name}</h3>
                <div className="flex items-center space-x-1">
                  {Array(craft.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  {Array(5 - craft.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-gray-300">★</span>
                    ))}
                </div>
                <p className="text-lg mt-2">{craft.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftPage;
