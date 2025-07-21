import { Link } from 'react-router-dom';
import logo from '../assets/images/menu-logo.svg';
import linkArrow from '../assets/images/link-arrow.svg';
import facebook from '../assets/images/facebook.svg';
import instagram from '../assets/images/instagram.svg';

export default function Footer() {
  const mainLinks = [
    { name: 'HOME', path: '/' },
    { name: 'STAY', path: '/stay' },
    { name: 'SAFARI', path: '/safari' },
    { name: 'WELLNESS', path: '/wellness' },
    { name: 'EXPERIENCES', path: '/experiences' },
    { name: 'OFFERS', path: '/offers' },
  ];

  const secondaryLinks = [
    { name: 'ABOUT US', path: '/about' },
    { name: 'DINING', path: '/dining' },
    { name: 'CONSERVATION', path: '/conservation' },
    { name: 'FACILITIES', path: '/facilities' },
    { name: 'LOCATION', path: '/location' },
    { name: 'BLOG', path: '/blog' },
    { name: 'RATES', path: '/rates' },
    { name: 'GALLERY', path: '/gallery' },
  ];
  return (
    <footer className="footer pb-30">
      <div className="container-fluid">
        <div className="newsletter bg-olive py-70">
          <div className="text-center">
            <h5 className="text-white">join our newsletter</h5>
            <p className="text-white pt-10">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
        <div className="footer-btm bg-black2 px-65 pb-40">
          <div className="flex justify-between py-60 border-b border-white max-767:flex-col max-767:items-center max-767:gap-y-30">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Kateka" width="164" height="48" />
              </Link>
            </div>
            <h6 className="text-white text-center max-w-436">
              Bespoke luxury lodge where wellness meets wilderness
            </h6>
            <div className="flex items-center gap-x-20 max-767:flex-col max-767:gap-y-20">
              <Link to="/contact" className="btn btn-link btn-link-white">
                <span>
                  <img src={linkArrow} alt="Arrow" width="16" height="14" />
                </span>
                ENQUIRE NOW
              </Link>
              <Link to="/booking" className="btn btn-white">
                Book Now
              </Link>
            </div>
          </div>
          <div className="footer-navbar pt-80 flex flex-col items-center gap-y-10">
            <ul className="flex flex-wrap justify-center gap-x-24 max-767:gap-x-15">
              {mainLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white hover:text-olive transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap justify-center gap-x-24 max-767:gap-x-15">
              {secondaryLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white hover:text-olive transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="sicon flex gap-x-30 mt-20">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={facebook} alt="Facebook" width="24" height="24" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={instagram} alt="Instagram" width="24" height="24" />
              </a>
            </div>
          </div>
          <div className="text-white flex justify-between pt-40 pb-20 border-t border-white max-767:flex-col max-767:items-center max-767:gap-y-20">
            <p>© 2025 Kateka. All rights reserved.</p>
            <ul className="flex gap-x-20">
              <li>
                <Link to="/terms" className="hover:text-olive transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-olive transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
