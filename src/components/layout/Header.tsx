import { useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { InternalLink } from "@/components/core";
import { ThemeToggle } from "@/components/layout";
import cn from "@/lib/utils";

const navLinks = [
  { label: "compile", href: "#what" },
  { label: "generate", href: "#emit" },
  { label: "plugins", href: "#emit" },
];

/**
 * Layout header with anchor nav and mobile hamburger.
 */
const Header = () => {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  const { pathname } = location;
  useEffect(() => {
    if (pathname) setMobileOpen(false);
  }, [pathname]);

  const handleNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false);

      // Smooth scroll for anchor links on the home page
      if (href.startsWith("#") && location.pathname === "/") {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [location.pathname],
  );

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-shadow",
        scrolled && "shadow-sm",
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + desktop nav */}
          <div className="flex items-center gap-6">
            <InternalLink to="/" variant="unstyled" className="-ml-4">
              <span className="flex items-center gap-3">
                <img
                  src="/favicon.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-10 w-10 shrink-0"
                />
                <h1 className="font-bold font-mono text-lg tracking-tight">
                  odk
                </h1>
              </span>
            </InternalLink>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}

              <InternalLink to="/pricing" variant="ghost">
                Pricing
              </InternalLink>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-md p-2 text-muted-foreground hover:text-foreground md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="border-t pt-2 pb-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}

              <InternalLink
                to="/pricing"
                variant="ghost"
                className="justify-start"
              >
                Pricing
              </InternalLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
