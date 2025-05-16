import { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Code, Briefcase, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const navLinks = [
    { name: 'Home', action: () => navigate('/') },
    { name: 'About', action: () => scrollToSection('about') },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', action: () => scrollToSection('contact') },
  ];

  const authLinks = isAuthenticated && user?.isAdmin
    ? [
        { name: 'Admin', path: '/admin', icon: <Briefcase className="w-5 h-5" /> },
        { name: 'Skills', path: '/admin/skills', icon: <Code className="w-5 h-5" /> },
        { 
          name: 'Logout', 
          action: handleLogout, 
          icon: <LogOut className="w-5 h-5" /> 
        },
      ]
    : isAuthenticated
      ? [
          { 
            name: 'Logout', 
            action: handleLogout, 
            icon: <LogOut className="w-5 h-5" /> 
          },
        ]
      : [
          { name: 'Login', path: '/login', icon: <User className="w-5 h-5" /> },
        ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/"
          className="flex items-center space-x-2 text-blue-900 font-bold text-xl"
        >
          <Code className="w-7 h-7" />
          <span>DevPortfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => 
            link.path ? (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-blue-700 ${
                    isActive ? 'text-blue-700' : 'text-gray-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ) : (
              <button
                key={link.name}
                onClick={link.action}
                className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors"
              >
                {link.name}
              </button>
            )
          )}

          <div className="h-6 w-px bg-gray-300"></div>

          {authLinks.map((link) => 
            link.action ? (
              <button
                key={link.name}
                onClick={link.action}
                className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
              >
                {link.icon}
                <span>{link.name}</span>
              </button>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-1 text-sm font-medium transition-colors hover:text-blue-700 ${
                    isActive ? 'text-blue-700' : 'text-gray-600'
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            )
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => 
                link.path ? (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-base py-2 font-medium transition-colors hover:text-blue-700 ${
                        isActive ? 'text-blue-700' : 'text-gray-600'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => {
                      if (link.action) link.action();
                      setIsOpen(false);
                    }}
                    className="text-base py-2 font-medium text-gray-600 hover:text-blue-700 transition-colors text-left"
                  >
                    {link.name}
                  </button>
                )
              )}

              <div className="h-px w-full bg-gray-200 my-2"></div>

              {authLinks.map((link) => 
                link.action ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      link.action();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 text-base py-2 font-medium text-red-600 hover:text-red-800 transition-colors"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </button>
                ) : (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 text-base py-2 font-medium transition-colors hover:text-blue-700 ${
                        isActive ? 'text-blue-700' : 'text-gray-600'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </NavLink>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;