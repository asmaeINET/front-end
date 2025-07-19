import { Button } from "@/components/ui/button";
import { Ticket, LogOut, Menu, X, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import AuthModal, { AuthModalType } from "../Auth/AuthModal";
import LanguageSwitcher from "../LanguageSwitcher";

const Header = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<AuthModalType>(null);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.tours"), path: "/packages" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const isActivePage = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Check for login parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get("login") === "true" && !isAuthenticated) {
      setAuthModalType("login");
      setAuthModalOpen(true);
    }
  }, [location.search, isAuthenticated]);

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a6fd8a0f28126e05e919b018ce59014268e2990?width=266"
              alt="Tuscany Logo"
              className="w-[126px] h-[130px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-20">
            {/* Navigation Menu */}
            <nav className="flex items-center gap-10">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative pb-1 font-open-sans font-bold text-xl hover:opacity-80 transition-opacity ${
                    isActivePage(item.path)
                      ? "border-b-2 border-orange-500"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Conditional Authentication UI */}
              {isAuthenticated ? (
                /* Account Menu for Logged In Users */
                <div className="relative">
                  <button
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="w-15 h-15 rounded-full border border-blue-300 overflow-hidden hover:border-blue-400 transition-colors"
                  >
                    <img
                      src={
                        user?.avatar ||
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                      }
                      alt={user?.name || "User Avatar"}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {/* Account Dropdown Menu */}
                  {showAccountMenu && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-3xl shadow-lg border border-gray-200 py-0 z-50">
                      <Link
                        to="/account"
                        className="flex items-center gap-2 px-6 py-4 text-gray-900 hover:bg-gray-50 border-b border-gray-300"
                        onClick={() => setShowAccountMenu(false)}
                      >
                        <Ticket className="w-6 h-6 opacity-80" />
                        <span className="font-open-sans text-lg">
                          My Tickets
                        </span>
                      </Link>
                      {user?.role === "admin" && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-2 px-6 py-4 text-gray-900 hover:bg-gray-50 border-b border-gray-300"
                          onClick={() => setShowAccountMenu(false)}
                        >
                          <Settings className="w-6 h-6 opacity-80" />
                          <span className="font-open-sans text-lg">
                            Admin Panel
                          </span>
                        </Link>
                      )}
                      <button
                        className="flex items-center gap-2 px-6 py-4 text-gray-900 hover:bg-gray-50 w-full text-left rounded-b-3xl"
                        onClick={() => {
                          setShowAccountMenu(false);
                          logout();
                        }}
                      >
                        <LogOut className="w-6 h-6 opacity-80" />
                        <span className="font-open-sans text-lg">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Login/Signup Buttons for Guest Users */
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setAuthModalType("login");
                      setAuthModalOpen(true);
                    }}
                    className="font-open-sans font-bold text-xl px-3 py-2.5 rounded-full transition-colors"
                    style={{ color: "rgba(0, 0, 0, 1)" }}
                  >
                    Login
                  </Button>

                  <Button
                    onClick={() => {
                      setAuthModalType("signup");
                      setAuthModalOpen(true);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-open-sans font-bold text-xl px-6 py-2.5 rounded-full transition-colors"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button and Auth */}
          <div className="lg:hidden flex items-center gap-3">
            {isAuthenticated && (
              /* Mobile Account Avatar */
              <div className="relative">
                <button
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="w-10 h-10 rounded-full border border-blue-300 overflow-hidden hover:border-blue-400 transition-colors"
                >
                  <img
                    src={
                      user?.avatar ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    }
                    alt={user?.name || "User Avatar"}
                    className="w-full h-full object-cover"
                  />
                </button>

                {/* Mobile Account Dropdown Menu */}
                {showAccountMenu && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-3xl shadow-lg border border-gray-200 py-0 z-50">
                    <Link
                      to="/account"
                      className="flex items-center gap-2 px-6 py-4 text-gray-900 hover:bg-gray-50 border-b border-gray-300"
                      onClick={() => setShowAccountMenu(false)}
                    >
                      <Ticket className="w-6 h-6 opacity-80" />
                      <span className="font-open-sans text-lg">My Tickets</span>
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2 px-6 py-4 text-gray-900 hover:bg-gray-50 border-b border-gray-300"
                        onClick={() => setShowAccountMenu(false)}
                      >
                        <Settings className="w-6 h-6 opacity-80" />
                        <span className="font-open-sans text-lg">
                          Admin Panel
                        </span>
                      </Link>
                    )}
                    <button
                      className="flex items-center gap-2 px-6 py-4 text-gray-900 hover:bg-gray-50 w-full text-left rounded-b-3xl"
                      onClick={() => {
                        setShowAccountMenu(false);
                        logout();
                      }}
                    >
                      <LogOut className="w-6 h-6 opacity-80" />
                      <span className="font-open-sans text-lg">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-black" />
              ) : (
                <Menu className="w-6 h-6 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-40">
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col gap-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-open-sans font-bold text-lg hover:text-orange-500 transition-colors ${
                      isActivePage(item.path)
                        ? "text-orange-500"
                        : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Language Switcher */}
                <div className="pt-4 border-t border-gray-200">
                  <LanguageSwitcher />
                </div>

                {/* Mobile Auth Buttons for non-authenticated users */}
                {!isAuthenticated && (
                  <div className="flex flex-col gap-4 pt-4 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setAuthModalType("login");
                        setAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="font-open-sans font-bold text-lg px-3 py-2 rounded-full text-gray-900 justify-start"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        setAuthModalType("signup");
                        setAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-open-sans font-bold text-lg px-4 py-2 rounded-full"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          setAuthModalType(null);
        }}
        modalType={authModalType}
        onModalTypeChange={(type) => setAuthModalType(type)}
      />
    </>
  );
};

export default Header;
