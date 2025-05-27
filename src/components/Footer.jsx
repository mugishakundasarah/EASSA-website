import { Link } from "react-router-dom";  // (import if using Link for any internal pages; not strictly needed for this simple footer)

const Footer = () => {
  return (
    <footer className="bg-[#5C0000] text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-2">EASSA</h3>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          {[1, 2, 3].map((col) => (
            <div key={col}>
              <h4 className="text-sm font-semibold mb-2">Topic</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
                <li><a href="#">Page</a></li>
              </ul>
            </div>
          ))}
        </div>
      </footer>
  );
}

export default Footer;
