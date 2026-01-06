import { Code, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl">
              <Code className="w-6 h-6" />
              <span>Pavan Kumar</span>
            </Link>
            <p className="text-blue-200 text-sm">
              Showcasing innovative web development projects 
              and solutions with modern technologies.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/Pavan-009" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="www.linkedin.com/in/pavan009" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="text-blue-200 hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <a href="/contact" className="text-blue-200 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <address className="not-italic text-blue-200 space-y-2">
              <p>Guntur</p>
              <p>Email: pavankumar.99gpk@gmail.com</p>
              <p>Phone: +91 9502396821</p>
            </address>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200 text-sm">
          <p>&copy; {currentYear} DevPortfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;