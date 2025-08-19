import { Link } from "react-router-dom";  // (import if using Link for any internal pages; not strictly needed for this simple footer)
import { FaInstagram, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-[#5C0000] text-white py-12 border-t-4" style={{ borderColor: 'var(--accent)' }}>
      <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">EASSA</h3>
          <p className="text-sm text-gray-200 max-w-xs">East African Stanford Students Association</p>
          <div className="flex space-x-4 mt-4">
            <a href="https://instagram.com/eassa_stanford" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex items-center gap-2 hover:opacity-90">
              <FaInstagram /> <span className="sr-only">Instagram</span>
            </a>
            <a href="mailto:stanfordeassa@outlook.com" aria-label="Email" className="flex items-center gap-2 hover:opacity-90">
              <FaEnvelope /> <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Explore</h4>
          <ul className="space-y-1 text-sm text-gray-200">
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/events" className="hover:underline">Events</a></li>
            <li><a href="/culture" className="hover:underline">Culture</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">Mailing List</h4>
          <p className="text-sm text-gray-200">eassa-students@lists.stanford.edu</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2">We say</h4>
          <p className="text-sm text-gray-200">Karibu sana — you are most welcome.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
