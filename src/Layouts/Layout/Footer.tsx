const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4 md:px-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Section */}
        <div className="md:col-span-2 flex flex-col items-start">
          <h1 className="text-4xl font-bold mb-2">Craftopia</h1>
          <p className="text-gray-400 mb-6">Stay informed about new arrivals.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="md:col-span-3 flex flex-col items-start">
          <h2 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h2>
          <div className="w-full relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-800 text-gray-300 rounded-full py-3 px-4 pr-12 focus:outline-none"
            />
            <button className="absolute right-3 top-2 bg-teal-600 text-white rounded-full px-4 py-2 hover:bg-teal-700 transition duration-300">
              →
            </button>
          </div>
        </div>

        {/* Links Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 col-span-full md:col-span-5 mt-10 md:mt-0">
          {/* Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-3">PAGES</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-gray-300">About</a>
              </li>
              <li>
                <a href="/shop" className="hover:text-gray-300">Shop</a>
              </li>
              <li>
                <a href="/blog" className="hover:text-gray-300">Blog</a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-300">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h3 className="text-lg font-semibold mb-3">SERVICE</h3>
            <ul className="space-y-2">
              <li>
                <a href="/reviews" className="hover:text-gray-300">Reviews</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">Contact Us</a>
              </li>
              <li>
                <a href="/guide" className="hover:text-gray-300">Style Guide</a>
              </li>
              <li>
                <a href="/licensing" className="hover:text-gray-300">Licensing</a>
              </li>
            </ul>
          </div>

          {/* Utility */}
          <div>
            <h3 className="text-lg font-semibold mb-3">UTILITY</h3>
            <ul className="space-y-2">
              <li>
                <a href="/returns" className="hover:text-gray-300">Delivery & Returns</a>
              </li>
              <li>
                <a href="/password" className="hover:text-gray-300">Password</a>
              </li>
              <li>
                <a href="/changelog" className="hover:text-gray-300">Changelog</a>
              </li>
              <li>
                <a href="/error" className="hover:text-gray-300">Error 404</a>
              </li>
            </ul>
          </div>

          {/* Resource */}
          <div>
            <h3 className="text-lg font-semibold mb-3">RESOURCE</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-conditions" className="hover:text-gray-300">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">&copy; 2024 Craftopia. All Rights Reserved.</p>
        <p className="text-gray-500 text-sm">Powered by Yvette.</p>
      </div>
    </footer>
  );
};

export default Footer;
