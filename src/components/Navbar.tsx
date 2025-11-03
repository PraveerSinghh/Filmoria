import { useState, useEffect } from "react";
import { Search, User, ChevronDown } from "lucide-react";

interface NavbarProps {
  onSearch: (query: string) => void;
  onNavigate: (section: "home" | "tv" | "movies") => void; // ✅ removed 'mylist'
  onLogoClick: () => void;
  currentSection: string;
}

export default function Navbar({
  onSearch,
  onNavigate,
  onLogoClick,
  currentSection,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-sm"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <button
              onClick={onLogoClick}
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-80 transition-opacity cursor-pointer"
            >
              FILMORIA
            </button>

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => onNavigate("home")}
                className={`text-sm font-medium transition-all duration-200 hover:text-white relative ${
                  currentSection === "home" ? "text-white" : "text-gray-300"
                }`}
              >
                Home
                {currentSection === "home" && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
                )}
              </button>
              <button
                onClick={() => onNavigate("tv")}
                className={`text-sm font-medium transition-all duration-200 hover:text-white relative ${
                  currentSection === "tv" ? "text-white" : "text-gray-300"
                }`}
              >
                TV Shows
                {currentSection === "tv" && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
                )}
              </button>
              <button
                onClick={() => onNavigate("movies")}
                className={`text-sm font-medium transition-all duration-200 hover:text-white relative ${
                  currentSection === "movies" ? "text-white" : "text-gray-300"
                }`}
              >
                Movies
                {currentSection === "movies" && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
                )}
              </button>
              {/* <button
                onClick={() => onNavigate('mylist')}
                className={`text-sm font-medium transition-all duration-200 hover:text-white relative ${
                  currentSection === 'mylist' ? 'text-white' : 'text-gray-300'
                }`}
              >
                My List
                {currentSection === 'mylist' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
                )}
              </button> */}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {showSearch ? (
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);
                    onSearch(value); // ✅ live update to parent
                  }}
                  placeholder="Search titles..."
                  className="w-64 px-4 py-2 bg-black/60 border border-purple-600/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-all"
                  autoFocus
                  onBlur={() => {
                    if (!searchQuery) setShowSearch(false);
                  }}
                />
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-white transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-black/95 border border-purple-600/30 rounded-lg overflow-hidden">
                  <button className="w-full px-4 py-3 text-left text-sm text-white hover:bg-purple-600/20 transition-colors">
                    Profile
                  </button>
                  <button className="w-full px-4 py-3 text-left text-sm text-white hover:bg-purple-600/20 transition-colors">
                    Watch History
                  </button>
                  <button className="w-full px-4 py-3 text-left text-sm text-white hover:bg-purple-600/20 transition-colors border-t border-purple-600/20">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
