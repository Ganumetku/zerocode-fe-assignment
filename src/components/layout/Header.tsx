import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 text-black dark:text-white border-b border-black dark:border-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">ZeroCode Chat</h1>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span className="hidden sm:inline">Welcome, {user.name}</span>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 px-4 rounded border border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <>
                    <FiSun className="mr-2" /> Light
                  </>
                ) : (
                  <>
                    <FiMoon className="mr-2" /> Dark
                  </>
                )}
              </button>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="p-2 px-4 rounded border border-gray-400 dark:border-gray-600 hover:bg-red-100 dark:hover:bg-red-700 transition flex items-center"
                aria-label="Logout"
              >
                <FiLogOut className="mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
