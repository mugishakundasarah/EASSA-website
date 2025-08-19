import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/eassa-logo.svg"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#5C0000] to-[#7a0000] text-white sticky top-0 z-50 w-full py-4 shadow">
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="EASSA Logo"  className="h-30 w-auto max-w-none" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-2 text-sm font-medium">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About Us" },
            { to: "/events", label: "Events" },
            { to: "/culture", label: "Culture" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-1 rounded-full transition ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "hover:bg-white/10 text-white/90"
                  }`
                }
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col bg-[#600000] px-4 py-3 space-y-2 text-sm font-medium">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About Us" },
            { to: "/events", label: "Events" },
            { to: "/culture", label: "Culture" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "block px-2 py-2 rounded bg-white/10" : "block px-2 py-2"
                }
                end={item.to === "/"}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
