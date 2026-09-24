import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

// import ecoCycleLogo from "../assets/ecocycle-logo.png";

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const isHome = location.pathname === "/";
  const isAbout = location.pathname === "/about";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <nav className="mx-auto flex h-[88px] max-w-[1920px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex shrink-0 items-center"
          aria-label="EcoCycle Home"
        >
          <img
            src="/ecocycle.png"
            alt="EcoCycle"
            className="h-[65px] w-auto object-contain sm:h-20"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-10 lg:flex">
          <Link
            to="/"
            className={`relative py-2 text-[17px] font-medium transition ${
              isHome
                ? "text-green-600"
                : "text-[#18352a] hover:text-green-600"
            }`}
          >
            Home

            {isHome && (
              <span className="absolute bottom-[-13px] left-0 h-[3px] w-full rounded-full bg-green-600" />
            )}
          </Link>

          <Link
            to="/about"
            className={`relative py-2 text-[17px] font-medium transition ${
              isAbout
                ? "text-green-600"
                : "text-[#18352a] hover:text-green-600"
            }`}
          >
            About

            {isAbout && (
              <span className="absolute bottom-[-13px] left-0 h-[3px] w-full rounded-full bg-green-600" />
            )}
          </Link>

          <Link
            to="/how-it-works"
            className="py-2 text-[17px] font-medium text-[#18352a] transition hover:text-green-600"
          >
            How it works
          </Link>

          <Link
            to="/rewards"
            className="py-2 text-[17px] font-medium text-[#18352a] transition hover:text-green-600"
          >
            Rewards
          </Link>

          <Link
            to="/contact"
            className="py-2 text-[17px] font-medium text-[#18352a] transition hover:text-green-600"
          >
            Contact
          </Link>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link
            to="/login"
            className="text-[17px] font-medium text-[#18352a] transition hover:text-green-600"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-full bg-[#0d4f38] px-8 py-3.5 text-[17px] font-medium text-white transition hover:bg-[#083d2b]"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-[#18352a] transition hover:bg-gray-100 lg:hidden"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="flex flex-col">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`rounded-lg px-4 py-3.5 text-base font-medium ${
                  isHome
                    ? "bg-green-50 text-green-600"
                    : "text-[#18352a] hover:bg-gray-50"
                }`}
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={closeMobileMenu}
                className={`rounded-lg px-4 py-3.5 text-base font-medium ${
                  isAbout
                    ? "bg-green-50 text-green-600"
                    : "text-[#18352a] hover:bg-gray-50"
                }`}
              >
                About
              </Link>

              <Link
                href="/#how-it-works"
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3.5 text-base font-medium text-[#18352a] hover:bg-gray-50"
              >
                How It Works
              </Link>

              <Link
                href="/#rewards"
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3.5 text-base font-medium text-[#18352a] hover:bg-gray-50"
              >
                Rewards
              </Link>

              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3.5 text-base font-medium text-[#18352a] hover:bg-gray-50"
              >
                Contact
              </Link>

              <div className="mt-4 flex gap-3 border-t border-gray-100 pt-5">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex-1 rounded-full border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-[#18352a]"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="flex-1 rounded-full bg-[#0d4f38] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Nav;