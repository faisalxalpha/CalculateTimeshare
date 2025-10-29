
import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavLinks = [
  { href: "/cost-calculator", label: "Cost Calculator" },
  { href: "/maintenance-calculator", label: "Maintenance Calculator" },
  { href: "/exit-options", label: "Exit Options" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const mobileNavLinks = [...mainNavLinks, { href: "/contact", label: "Contact Us" }];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between md:grid md:grid-cols-3">
        {/* Logo */}
        <div className="flex items-center md:justify-start">
          <Link href="/" className="flex items-center">
            <img src="/favicon.png" alt="TUG Logo" className="h-8" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center justify-center space-x-4 md:flex">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-sm font-medium",
                location === link.href && "font-bold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons & Mobile Menu */}
        <div className="flex items-center justify-end space-x-2">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "hidden md:inline-flex"
            )}
          >
            Contact Us
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                {isOpen ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 pt-6">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium",
                      location === link.href && "font-bold"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
