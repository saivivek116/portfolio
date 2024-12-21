import React from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { href: "#home", text: "Home" },
    { href: "#about", text: "About" },
    { href: "#education", text: "Education" },
    { href: "#experience", text: "Experience" },
    { href: "#projects", text: "Projects" },
    { href: "#skills", text: "Skills" },
    { href: "#contact", text: "Contact" },
  ];

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-900">VSV</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-gray-900"
              >
                {link.text}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/saivivek116" target='_blank' className="text-gray-700 hover:text-gray-900">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/vsaivivek" target='_blank' className="text-gray-700 hover:text-gray-900">
              <Linkedin size={20} />
            </a>
            <a href="mailto:saivivek116@gmail.com" className="text-gray-700 hover:text-gray-900">
              <Mail size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;