import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Calculator, FileText, LogOut, Home, Info, Phone, Shield } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/cost-calculator", label: "Cost Calculator", icon: Calculator },
    { path: "/maintenance-calculator", label: "Maintenance Calculator", icon: Calculator },
    { path: "/exit-options", label: "Exit Options", icon: LogOut },
    { path: "/blog", label: "Blog", icon: FileText },
    { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 hover-elevate active-elevate-2 rounded-md px-3 py-2">
              <Calculator className="h-6 w-6 text-primary" />
              <span className="text-xl font-sans font-bold">CalculateTimeshare</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location === item.path ? "secondary" : "ghost"}
                  size="sm"
                  data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  asChild
                >
                  <Link href={item.path}>
                    {item.label}
                  </Link>
                </Button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button variant="default" data-testid="button-get-exit-quote" asChild>
                <Link href="/cost-calculator">
                  Get Exit Quote
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={location === item.path ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    data-testid={`mobile-nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    asChild
                  >
                    <Link href={item.path} onClick={() => setMobileMenuOpen(false)}>
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
              <Button variant="default" className="w-full" data-testid="mobile-button-get-exit-quote" asChild>
                <Link href="/cost-calculator" onClick={() => setMobileMenuOpen(false)}>
                  Get Exit Quote
                </Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Sticky CTA Button - Fixed bottom-right on scroll */}
      <div className="fixed bottom-8 right-8 z-40 hidden lg:block">
        <Button 
          size="lg" 
          variant="default"
          className="shadow-2xl animate-pulse hover:animate-none"
          data-testid="button-floating-cta"
          asChild
        >
          <Link href="/cost-calculator">
            <Calculator className="h-5 w-5 mr-2" />
            Get Free Quote
          </Link>
        </Button>
      </div>
    </>
  );
}
