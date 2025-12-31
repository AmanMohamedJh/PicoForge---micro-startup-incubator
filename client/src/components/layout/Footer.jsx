import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, MessageCircle, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Explore Ideas', href: '/explore' },
      { name: 'Roadmap', href: '/roadmap' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Contributing', href: '/contributing' },
      { name: 'GitHub', href: 'https://github.com', external: true },
      { name: 'Community', href: '/community' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'License (MIT)', href: '/license' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: MessageCircle, href: 'https://discord.com', label: 'Discord' },
  ];

  return (
    <footer className="relative bg-dark-primary border-t border-border-default">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent-purple/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <Link to="/" className="inline-block mb-4">
                <div className="relative px-4 py-2 border-2 border-text-tertiary rounded-lg hover:border-text-primary transition-all duration-300">
                  {/* Inner border */}
                  <div className="absolute inset-1 border border-text-tertiary/50 rounded-md hover:border-text-primary/50 transition-all duration-300 pointer-events-none" />
                  
                  {/* Logo text */}
                  <span className="relative text-xl font-bold text-text-primary font-display tracking-tight">
                    PicoForge
                  </span>
                </div>
              </Link>

              <p className="text-text-tertiary text-sm leading-relaxed mb-6 max-w-sm">
                Turn raw ideas into real startups. A collaborative platform where builders validate concepts, find teams, and ship together.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-lg bg-dark-secondary border border-border-default flex items-center justify-center text-text-tertiary hover:text-accent-purple hover:border-accent-purple transition-all duration-300 hover:-translate-y-1"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Product */}
              <div>
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
                  Product
                </h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-text-tertiary hover:text-text-primary transition-colors inline-flex items-center gap-1 group"
                        >
                          {link.name}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
                  Legal
                </h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-default py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-tertiary text-center sm:text-left">
              © {new Date().getFullYear()} PicoForge. Open source under{' '}
              <Link to="/license" className="text-accent-purple hover:text-accent-purple-light transition-colors">
                MIT License
              </Link>
            </p>
            <p className="text-sm text-text-tertiary flex items-center gap-1">
              Made with{' '}
              <span className="text-red-500">Love</span>{' '}
              by the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;