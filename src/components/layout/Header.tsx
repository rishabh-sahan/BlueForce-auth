import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe, LogOut, Menu, User, X } from 'lucide-react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  useEffect(() => {
    // Load preferred language from localStorage safely
    try {
      const savedLang = localStorage.getItem('preferredLanguage');
      if (savedLang) {
        i18n.changeLanguage(savedLang);
      }
    } catch (error) {
      console.warn('Could not access localStorage:', error);
    }
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('preferredLanguage', lng);
    } catch (error) {
      console.warn('Could not save language preference:', error);
    }
    setIsLangDropdownOpen(false);
  };
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            BlueForce
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center flex-1 space-x-6 mx-8">
            <Link to="/" className="text-white hover:text-blue-200 font-medium">
              {t('header.home')}
            </Link>
            <Link to="/about-us" className="text-white hover:text-blue-200 font-medium">
              {t('header.aboutUs')}
            </Link>
            <Link to="/services" className="text-white hover:text-blue-200 font-medium">
              {t('header.services')}
            </Link>
            <Link to="/how-it-works" className="text-white hover:text-blue-200 font-medium">
              {t('header.howItWorks')}
            </Link>
            <li>
              <a href="/browse-workers" className="hover:text-blue-600 transition-colors">Browse Workers</a>
            </li>
          </nav>
          
          {/* Right side elements */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center text-white hover:text-blue-200 focus:outline-none"
              >
                <Globe size={18} className="mr-1" />
                {i18n.language === 'hi' ? 'हिंदी' : i18n.language === 'kn' ? 'ಕನ್ನಡ' : 'English'}
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 text-sm flex items-center ${i18n.language === 'en' ? 'font-bold' : ''}`}
                  >
                    English {i18n.language === 'en' && <span className="ml-2">✓</span>}
                  </button>
                  <button
                    onClick={() => changeLanguage('hi')}
                    className={`block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 text-sm flex items-center ${i18n.language === 'hi' ? 'font-bold' : ''}`}
                  >
                    हिंदी {i18n.language === 'hi' && <span className="ml-2">✓</span>}
                  </button>
                  <button
                    onClick={() => changeLanguage('kn')}
                    className={`block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 text-sm flex items-center ${i18n.language === 'kn' ? 'font-bold' : ''}`}
                  >
                    ಕನ್ನಡ {i18n.language === 'kn' && <span className="ml-2">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {currentUser ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 flex items-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  {t('header.profile')}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </motion.button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
                    <Link
                      to="/profile"
                      className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 text-sm flex items-center"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2 text-blue-600" />
                      {t('header.profile')}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700 text-sm flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2 text-red-600" />
                      {t('header.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-white border border-white rounded-full hover:bg-blue-800"
                  >
                    {t('header.login')}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-white text-blue-700 rounded-full hover:bg-blue-100"
                  >
                    {t('header.register')}
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 pb-4 md:hidden flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white hover:text-blue-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.home')}
            </Link>
            <Link 
              to="/about-us" 
              className="text-white hover:text-blue-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.aboutUs')}
            </Link>
            <Link 
              to="/services" 
              className="text-white hover:text-blue-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.services')}
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-white hover:text-blue-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.howItWorks')}
            </Link>
            
            {/* Language Options */}
            <div className="text-sm text-white opacity-75 mb-2">Select Language:</div>
            <button
              onClick={() => {
                changeLanguage('en');
                setIsMenuOpen(false);
              }}
              className={`flex items-center text-white hover:text-blue-200 ${i18n.language === 'en' ? 'font-bold' : ''}`}
            >
              English {i18n.language === 'en' && <span className="ml-2">✓</span>}
            </button>
            <button
              onClick={() => {
                changeLanguage('hi');
                setIsMenuOpen(false);
              }}
              className={`flex items-center text-white hover:text-blue-200 ${i18n.language === 'hi' ? 'font-bold' : ''}`}
            >
              हिंदी {i18n.language === 'hi' && <span className="ml-2">✓</span>}
            </button>
            <button
              onClick={() => {
                changeLanguage('kn');
                setIsMenuOpen(false);
              }}
              className={`flex items-center text-white hover:text-blue-200 ${i18n.language === 'kn' ? 'font-bold' : ''}`}
            >
              ಕನ್ನಡ {i18n.language === 'kn' && <span className="ml-2">✓</span>}
            </button>

            {currentUser ? (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/profile"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full flex items-center justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  {t('header.profile')}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 w-full flex items-center justify-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('header.logout')}
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-white border border-white rounded-full hover:bg-blue-800 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-blue-700 rounded-full hover:bg-blue-100 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.register')}
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
