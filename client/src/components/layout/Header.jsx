import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, X, Menu } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      title: 'Platform',
      items: [
        { name: 'Features', href: '/features', description: 'Explore all features' },
        { name: 'How It Works', href: '/how-it-works', description: '3-step process' },
        { name: 'Workspace', href: '/workspace', description: 'Collaborate with teams' },
        { name: 'Security', href: '/security', description: 'Enterprise-grade security' },
      ]
    },
    {
      title: 'Resources',
      items: [
        { name: 'Documentation', href: '/docs', description: 'Get started guides' },
        { name: 'API Reference', href: '/api', description: 'Developer docs' },
        { name: 'Community', href: '/community', description: 'Join discussions' },
        { name: 'Blog', href: '/blog', description: 'Latest updates' },
      ]
    },
    {
      title: 'Solutions',
      items: [
        { name: 'For Founders', href: '/founders', description: 'Validate your ideas' },
        { name: 'For Developers', href: '/developers', description: 'Build together' },
        { name: 'For Teams', href: '/teams', description: 'Collaborate effectively' },
        { name: 'Enterprise', href: '/enterprise', description: 'Scale your startup' },
      ]
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark-secondary/98 backdrop-blur-xl border-b border-border-default shadow-lg' 
          : 'bg-dark-primary/95 backdrop-blur-md border-b border-border-default/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="shrink-0 group">
            <div className="relative px-3 py-1.5 border-2 border-text-tertiary rounded-lg group-hover:border-text-primary transition-all duration-300">
              <div className="absolute inset-0.5 border border-text-tertiary/50 rounded-md group-hover:border-text-primary/50 transition-all duration-300 pointer-events-none" />
              <span className="relative text-lg font-bold text-text-primary font-display tracking-tight">
                PicoForge
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
            {menuItems.map((menu) => (
              <div key={menu.title} className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === menu.title ? null : menu.title)}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-text-body hover:text-text-primary transition-colors rounded-lg hover:bg-dark-tertiary/50"
                >
                  {menu.title}
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === menu.title ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === menu.title && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-dark-secondary border border-border-default rounded-xl shadow-2xl overflow-hidden animate-slide-down">
                    <div className="p-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-4 py-3 rounded-lg hover:bg-dark-tertiary transition-colors group"
                        >
                          <div className="font-medium text-text-primary group-hover:text-accent-purple transition-colors">
                            {item.name}
                          </div>
                          <div className="text-xs text-text-tertiary mt-0.5">
                            {item.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Direct Links */}
            <Link
              to="/explore"
              className="px-4 py-2 text-sm font-medium text-text-body hover:text-text-primary transition-colors rounded-lg hover:bg-dark-tertiary/50"
            >
              Explore
            </Link>
            <Link
              to="/pricing"
              className="px-4 py-2 text-sm font-medium text-text-body hover:text-text-primary transition-colors rounded-lg hover:bg-dark-tertiary/50"
            >
              Pricing
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center">
              {!searchOpen ? (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-tertiary border border-border-default rounded-lg hover:border-text-tertiary transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden lg:inline">Search</span>
                  <kbd className="hidden lg:inline px-1.5 py-0.5 text-xs bg-dark-tertiary rounded border border-border-default">/</kbd>
                </button>
              ) : (
                <form onSubmit={handleSearch} className="relative animate-scale-in">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search ideas, teams..."
                    autoFocus
                    className="w-64 pl-10 pr-10 py-1.5 text-sm bg-dark-tertiary border border-border-default rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-dark-secondary rounded"
                  >
                    <X className="w-3 h-3 text-text-tertiary" />
                  </button>
                </form>
              )}
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-1.5 text-sm font-semibold text-text-body hover:text-text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center px-5 py-1.5 bg-linear-to-r from-accent-purple to-accent-purple-dark text-white text-sm font-semibold rounded-lg shadow-lg shadow-accent-purple/30 hover:shadow-accent-purple/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-text-body hover:text-text-primary transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border-default py-4 animate-slide-down">
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-dark-tertiary border border-border-default rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple"
                />
              </form>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-4">
              {menuItems.map((menu) => (
                <div key={menu.title}>
                  <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    {menu.title}
                  </div>
                  <div className="space-y-1">
                    {menu.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-text-body hover:text-text-primary hover:bg-dark-tertiary rounded-lg transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-border-default space-y-2">
                <Link
                  to="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-text-body hover:text-text-primary hover:bg-dark-tertiary rounded-lg transition-colors"
                >
                  Explore
                </Link>
                <Link
                  to="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-text-body hover:text-text-primary hover:bg-dark-tertiary rounded-lg transition-colors"
                >
                  Pricing
                </Link>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-2 text-center text-sm font-semibold text-text-body hover:text-text-primary border border-border-default rounded-lg hover:bg-dark-tertiary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-2 text-center bg-linear-to-r from-accent-purple to-accent-purple-dark text-white text-sm font-semibold rounded-lg"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;