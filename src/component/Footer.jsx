import { Link } from "react-router-dom";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

// import ecoCycleLogo from "../assets/ecocycle-logo.png";

function Footer() {
  return (
    <footer className="border-t border-[#e3e9e4] bg-white text-[#18352a]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16">
        {/* Main footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/ecocycle.png"
                alt="EcoCycle"
                className="h-20 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-md text-[15px] leading-7 text-[#68766f]">
              Building cleaner communities through responsible waste
              collection, recycling, transparent reporting and meaningful
              rewards.
            </p>

            <Link
              to="/signup"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0d4f38] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#083d2b]"
            >
              Join EcoCycle
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#18352a]">
              Explore
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              <Link
                to="/"
                className="w-fit text-[15px] text-[#68766f] transition hover:text-[#2d8b57]"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="w-fit text-[15px] text-[#68766f] transition hover:text-[#2d8b57]"
              >
                About
              </Link>

              <a
                href="/#how-it-works"
                className="w-fit text-[15px] text-[#68766f] transition hover:text-[#2d8b57]"
              >
                How It Works
              </a>

              <a
                href="/#rewards"
                className="w-fit text-[15px] text-[#68766f] transition hover:text-[#2d8b57]"
              >
                Rewards
              </a>

              <Link
                to="/contact"
                className="w-fit text-[15px] text-[#68766f] transition hover:text-[#2d8b57]"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#18352a]">
              Contact
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-[#2d8b57]"
                />

                <a
                  href="mailto:support@ecocycle.com"
                  className="text-[15px] text-[#68766f] transition hover:text-[#2d8b57]"
                >
                  support@ecocycle.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#2d8b57]"
                />

                <p className="text-[15px] leading-6 text-[#68766f]">
                  Supporting cleaner communities through connected
                  environmental services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-[#e3e9e4]" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 text-sm text-[#68766f] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} EcoCycle. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              to="/"
              className="transition hover:text-[#2d8b57]"
            >
              Privacy
            </Link>

            <Link
              to="/"
              className="transition hover:text-[#2d8b57]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;