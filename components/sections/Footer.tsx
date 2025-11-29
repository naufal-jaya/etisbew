import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              IEEE <span className="text-accent-cyan">IPB</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Advancing technology for humanity through innovation, education,
              and collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-gray-300 hover:text-accent-cyan transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-gray-300 hover:text-accent-cyan transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#team"
                  className="text-gray-300 hover:text-accent-cyan transition-colors"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-accent-cyan transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-300 hover:text-accent-cyan transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-300">
                <Mail size={18} className="text-accent-cyan" />
                <span>contact@ieee.ipb.ac.id</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Phone size={18} className="text-accent-cyan" />
                <span>+62 xxx xxxx xxxx</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <MapPin size={18} className="text-accent-cyan" />
                <span>IPB University, Bogor</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} IEEE Student Branch IPB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
