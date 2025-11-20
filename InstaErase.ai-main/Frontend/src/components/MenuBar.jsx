import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  useClerk,
  UserButton,
  useUser,
} from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';

const Menubar = () => {
  const { credit } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openSignIn, openSignUp } = useClerk();
  const { user } = useUser();

  const openRegister = () => {
    setMenuOpen(false);
    openSignUp({});
  };
  const openLogin = () => {
    setMenuOpen(false);
    openSignIn({});
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link className="flex items-center space-x-2" to="/">
        <img
          src={assets.logo}
          alt="logo"
          className="h-10 w-10 object-contain"
        />
        <span className="text-2xl font-bold text-indigo-700">
          InstaErase.<span className="text-gray-400">ai</span>
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <SignedOut>
          <button
            onClick={openLogin}
            className="text-gray-700 cursor-pointer font-medium hover:text-indigo-600 transition-colors duration-300"
          >
            Login
          </button>
          <button
            onClick={openRegister}
            className="bg-indigo-50 cursor-pointer text-indigo-700 px-4 py-2 rounded-full font-medium hover:bg-indigo-100 transition-all duration-300"
          >
            Sign Up
          </button>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-4">
            {/* Credits */}
            <div className="flex items-center bg-gray-100 px-4 py-1.5 rounded-full gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <img src={assets.credits} alt="credits" className="h-5 w-5" />
              <span className="text-sm font-medium text-gray-700">
                Credits: {credit}
              </span>
            </div>
            {/* Greeting */}
            <span className="hidden sm:inline text-gray-600 font-semibold">
              Hi, {user?.fullName}
            </span>
            <UserButton />
          </div>
        </SignedIn>
      </div>

      {/* Mobile Hamburger */}
      <div className="flex md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg w-48 p-4 flex flex-col gap-3 z-50">
          <SignedOut>
            <button
              onClick={openLogin}
              className="text-gray-700 font-medium hover:text-indigo-600 transition-colors duration-300 text-left w-full"
            >
              Login
            </button>
            <button
              onClick={openRegister}
              className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-medium hover:bg-indigo-100 transition-all duration-300 w-full text-center"
            >
              Sign Up
            </button>
          </SignedOut>

          <SignedIn>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                <img src={assets.credits} alt="credits" className="h-5 w-5" />
                <span className="text-sm font-medium text-gray-700">
                  Credits: {credit}
                </span>
              </div>
              <span className="font-semibold text-gray-600">
                Hi, {user?.fullName}
              </span>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      )}
    </nav>
  );
};

export default Menubar;
