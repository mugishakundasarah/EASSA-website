import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/eassa-logo.png"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#5C0000] to-[#7a0000] text-white sticky top-0 z-50 w-full shadow">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between gap-2 px-3 py-1 sm:gap-3 sm:px-4 md:gap-4">
        {/* Logo — tall mark; narrow screens reserve space for the menu button */}
        <Link
          to="/"
          className="flex min-w-0 max-w-[calc(100%-2.75rem)] items-center sm:max-w-none md:flex-1"
        >
          <img
            src={logo}
            alt="EASSA"
            className="h-16 w-auto object-contain object-left sm:h-20 md:h-24 lg:h-28 xl:h-32"
            width={500}
            height={500}
            decoding="async"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex shrink-0 items-center gap-1 lg:gap-2 text-sm font-medium">
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
                  `px-2.5 py-0.5 rounded-full transition ${
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
          type="button"
          className="md:hidden shrink-0 rounded-md p-1 -mr-0.5 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
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
        <ul className="md:hidden flex flex-col border-t border-white/10 bg-[#600000] px-3 py-2 space-y-1 text-sm font-medium sm:px-4">
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
                  isActive ? "block rounded bg-white/10 px-2 py-1.5" : "block px-2 py-1.5"
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
