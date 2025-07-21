import { useState } from 'react';
import { Link } from 'react-router-dom';
import menuLogo from '../assets/images/menu-logo.svg';
import linkArrow from '../assets/images/link-arrow.svg';
import mainLogo from '../assets/images/logo.svg';
import menuImg1 from '../assets/images/menu-img1.webp';
import menuImg2 from '../assets/images/menu-img2.webp';
import menuImg3 from '../assets/images/menu-img3.webp';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const navItems = [
    { name: 'Stay', path: '/stay' },
    { name: 'Safari', path: '/safari' },
    { name: 'Wellness', path: '/wellness' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Offers', path: '/offers' },
  ];

  return (
    <header className="header">
      <div className="header-top fixed top-0 z-9999 w-full pt-42">
        <div className="container-fluid">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap items-center gap-x-50 max-1199:gap-x-30">
              <div className="menu-icon flex cursor-pointer flex-col gap-y-5" onClick={toggleNav}>
                {isNavOpen ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="#302D2B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="#302D2B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <>
                    <svg width="32" height="2">
                      <rect width="32" height="2" fill="#302D2B" />
                    </svg>
                    <svg width="20" height="2">
                      <rect width="20" height="2" fill="#302D2B" />
                    </svg>
                    <svg width="32" height="2">
                      <rect width="32" height="2" fill="#302D2B" />
                    </svg>
                  </>
                )}
              </div>
              <div className="sticky-logo hidden">
                <Link to="/">
                  <img src={menuLogo} alt="Kateka" width="194" height="21" />
                </Link>
              </div>
            </div>
            <div className="header-top-right flex flex-wrap items-center gap-x-95 max-1199:gap-x-40 max-1023:hidden">
              <div className="top-navbar">
                <ul className="flex flex-wrap gap-x-32">
                  {navItems.map(item => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className="text-black hover:text-olive transition-colors"
                        onClick={() => setIsNavOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-x-28">
                <Link to="/contact" className="btn btn-link" onClick={() => setIsNavOpen(false)}>
                  <span>
                    <img src={linkArrow} alt="Arrow" width="16" height="14" />
                  </span>{' '}
                  ENQUIRE NOW
                </Link>
                <Link to="/booking" className="btn btn-olive" onClick={() => setIsNavOpen(false)}>
                  Book Now
                </Link>
              </div>
            </div>
            <div className="hidden max-1023:block mobile-logo">
              <div className="logo">
                <Link to="/">
                  <img src={mainLogo} alt="Kateka" width="150" height="100" />
                </Link>
              </div>
            </div>
            <div className="hidden max-1023:block booknowbtn">
              <Link to="/booking" className="btn btn-olive">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`main-nav nav-container ${!isNavOpen ? 'hidden' : ''}`}>
        <div className="menu-wrapper bg-black2 text-white">
          <div className="flex h-screen w-full">
            <div className="menu-wrapper-content flex items-center justify-center w-full px-110">
              <div className="w-full lg:w-4/12">
                <ul className="grid gap-y-20">
                  {navItems.map(item => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className="text-4xl font-light hover:text-olive transition-colors"
                        onClick={toggleNav}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden lg:flex lg:w-8/12 justify-end gap-4">
                {[menuImg1, menuImg2, menuImg3].map((img, i) => (
                  <div key={i}>
                    <img src={img} alt="Menu" className="rounded-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
