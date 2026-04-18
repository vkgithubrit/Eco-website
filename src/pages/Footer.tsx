
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-400">
            VivekStore
          </h2>
          <p className="text-gray-400 mt-3 text-sm">
            Your trusted shopping destination for quality products and best prices.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-white">
                Cart
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white">
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Contact
          </h3>
          <p className="text-gray-400 text-sm">
            Email: vivekkumar090902@gmail.com
          </p>
          <p className="text-gray-400 text-sm">
            Phone: +91 88732XXXXX
          </p>
          <p className="text-gray-400 text-sm">
            India
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © 2026 Vivek Store. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;