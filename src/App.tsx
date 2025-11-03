import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";
import GenreFilter from "./components/GenreFilter";
import {
  getTrending,
  getPopular,
  getTopRated,
  getNowPlaying,
  getTVShows,
  getMoviesByGenre,
  searchMovies,
  getGenres,
} from "./services/tmdb";
import type { Movie, Genre } from "./types/movie";
import MovieDetail from "./pages/MovieDetail";

function Home() {
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<Movie[]>([]);
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  // 🔍 Search-related
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Misc
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState<"home" | "tv" | "movies">("home");
  const [continueWatching, setContinueWatching] = useState<Movie[]>([]);

  const navigate = useNavigate();
  const homeRef = useRef<HTMLDivElement>(null);
  const tvRef = useRef<HTMLDivElement>(null);
  const moviesRef = useRef<HTMLDivElement>(null);

  // ✅ Genre map
  const GENRE_MAP: { [key: string]: number } = {
    Animation: 16,
    Adventure: 12,
    Comedy: 35,
    Drama: 18,
    Horror: 27,
    Crime: 80,
    Documentary: 99,
  };

  // ✅ States for each genre
  const [animation, setAnimation] = useState<Movie[]>([]);
  const [adventure, setAdventure] = useState<Movie[]>([]);
  const [comedy, setComedy] = useState<Movie[]>([]);
  const [drama, setDrama] = useState<Movie[]>([]);
  const [horror, setHorror] = useState<Movie[]>([]);
  const [crime, setCrime] = useState<Movie[]>([]);
  const [documentary, setDocumentary] = useState<Movie[]>([]);

  // ✅ Load Continue Watching
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("continueWatching") || "[]");
    setContinueWatching(stored);
  }, []);

  // ✅ Load main data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const [
        trendingData,
        popularData,
        topRatedData,
        nowPlayingData,
        tvData,
        genresData,
      ] = await Promise.all([
        getTrending(),
        getPopular(),
        getTopRated(),
        getNowPlaying(),
        getTVShows(),
        getGenres(),
      ]);

      setTrending(trendingData);
      setPopular(popularData);
      setTopRated(topRatedData);
      setNowPlaying(nowPlayingData);
      setTVShows(tvData);
      setGenres(genresData);

      if (trendingData.length > 0) setHeroMovie(trendingData[0]);

      // ✅ Fetch specific genres
      const genreData = await Promise.all([
        getMoviesByGenre(GENRE_MAP.Animation),
        getMoviesByGenre(GENRE_MAP.Adventure),
        getMoviesByGenre(GENRE_MAP.Comedy),
        getMoviesByGenre(GENRE_MAP.Drama),
        getMoviesByGenre(GENRE_MAP.Horror),
        getMoviesByGenre(GENRE_MAP.Crime),
        getMoviesByGenre(GENRE_MAP.Documentary),
      ]);

      setAnimation(genreData[0]);
      setAdventure(genreData[1]);
      setComedy(genreData[2]);
      setDrama(genreData[3]);
      setHorror(genreData[4]);
      setCrime(genreData[5]);
      setDocumentary(genreData[6]);

      setLoading(false);
    };

    loadInitialData();
  }, []);

  // ✅ Genre filtering
  useEffect(() => {
    if (selectedGenre) {
      const loadGenreMovies = async () => {
        const movies = await getMoviesByGenre(selectedGenre);
        setGenreMovies(movies);
      };
      loadGenreMovies();
    } else {
      setGenreMovies([]);
    }
  }, [selectedGenre]);

  // ✅ Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim().length >= 3) {
        setIsSearching(true);
        const results = await searchMovies(searchQuery);
        setSearchResults(results);
      } else if (searchQuery.trim().length === 0) {
        setIsSearching(false);
        setSearchResults([]);
        setCurrentSection("home"); // ✅ Go back to home automatically
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleNavigation = (section: "home" | "tv" | "movies") => {
    setCurrentSection(section);
    setIsSearching(false);
    setSearchQuery("");
    const refs = { home: homeRef, tv: tvRef, movies: moviesRef };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogoClick = () => {
    setCurrentSection("home");
    setIsSearching(false);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMovieClick = (movie: Movie) => {
    navigate(`/details/${movie.media_type || "movie"}/${movie.id}`);
  };

  // ✅ Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 text-xl font-semibold">Loading Filmoria...</p>
        </div>
      </div>
    );
  }

  // ✅ UI
  return (
    <div className="min-h-screen bg-black">
      <Navbar
        onSearch={handleSearchChange}
        onNavigate={handleNavigation}
        onLogoClick={handleLogoClick}
        currentSection={currentSection}
      />

      {/* Hero Section */}
      {!isSearching && (
        <div ref={homeRef}>
          <Hero movie={heroMovie} onPlayTrailer={() => handleMovieClick(heroMovie!)} />
        </div>
      )}

      <div className={`relative ${!isSearching ? "-mt-20" : "mt-28"} z-10 pb-20`}>
        {!isSearching && (
          <div className="mt-20 mb-12"> {/* ✅ Added spacing here */}
            <GenreFilter
              genres={genres}
              selectedGenre={selectedGenre}
              onSelectGenre={setSelectedGenre}
            />
          </div>
        )}

        <div className="space-y-12">
          {!isSearching && continueWatching.length > 0 && (
            <MovieRow
              title="Continue Watching"
              movies={continueWatching}
              onPlayMovie={handleMovieClick}
              small
            />
          )}

          {isSearching ? (
            searchResults.length > 0 ? (
              <div className="mt-10">
                <MovieRow
                  title={`Search Results for "${searchQuery}"`}
                  movies={searchResults}
                  onPlayMovie={handleMovieClick}
                />
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400 text-xl">
                {searchQuery.length >= 3
                  ? `No movies found matching "${searchQuery}".`
                  : "Type at least 3 letters to search."}
              </div>
            )
          ) : (
            <>
              {currentSection === "home" && (
                <>
                  {selectedGenre && genreMovies.length > 0 && (
                    <MovieRow
                      title={genres.find((g) => g.id === selectedGenre)?.name || "Genre"}
                      movies={genreMovies}
                      onPlayMovie={handleMovieClick}
                    />
                  )}

                  <MovieRow title="Trending Now" movies={trending} onPlayMovie={handleMovieClick} />
                  <MovieRow title="Popular on Filmoria" movies={popular} onPlayMovie={handleMovieClick} />

                  {/* ✅ Custom categories */}
                  <MovieRow title="Animation" movies={animation} onPlayMovie={handleMovieClick} />
                  <MovieRow title="Adventure" movies={adventure} onPlayMovie={handleMovieClick} />
                  <MovieRow title="Comedy" movies={comedy} onPlayMovie={handleMovieClick} />
                  <MovieRow title="Drama" movies={drama} onPlayMovie={handleMovieClick} />
                  <MovieRow title="Horror" movies={horror} onPlayMovie={handleMovieClick} />
                  <MovieRow title="Crime" movies={crime} onPlayMovie={handleMovieClick} />
                  <MovieRow title="Documentary" movies={documentary} onPlayMovie={handleMovieClick} />
                </>
              )}

              {currentSection === "tv" && (
                <MovieRow title="TV Shows" movies={tvShows} onPlayMovie={handleMovieClick} />
              )}

              {currentSection === "movies" && (
                <>
                  <MovieRow title="Popular Movies" movies={popular} onPlayMovie={handleMovieClick} />
                  <MovieRow title="Top Rated Movies" movies={topRated} onPlayMovie={handleMovieClick} />
                  <MovieRow title="Now Playing" movies={nowPlaying} onPlayMovie={handleMovieClick} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:media_type/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}








// import { useState, useEffect, useRef } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import MovieRow from "./components/MovieRow";
// import GenreFilter from "./components/GenreFilter";
// import NowPlaying from "./components/NowPlaying";
// import TrailerModal from "./components/TrailerModal";
// import {
//   getTrending,
//   getPopular,
//   getTopRated,
//   getNowPlaying,
//   getTVShows,
//   getMoviesByGenre,
//   searchMovies,
//   getGenres,
// } from "./services/tmdb";
// import type { Movie, Genre } from "./types/movie";
// import MovieDetail from "./pages/MovieDetail";

// function Home() {
//   const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
//   const [trending, setTrending] = useState<Movie[]>([]);
//   const [popular, setPopular] = useState<Movie[]>([]);
//   const [topRated, setTopRated] = useState<Movie[]>([]);
//   const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
//   const [tvShows, setTVShows] = useState<Movie[]>([]);
//   const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
//   const [genres, setGenres] = useState<Genre[]>([]);
//   const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
//   const [searchResults, setSearchResults] = useState<Movie[]>([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [currentSection, setCurrentSection] = useState<
//     "home" | "tv" | "movies" | "mylist"
//   >("home");
//   const [myList, setMyList] = useState<Movie[]>([]);
//   const navigate = useNavigate();

//   const homeRef = useRef<HTMLDivElement>(null);
//   const tvRef = useRef<HTMLDivElement>(null);
//   const moviesRef = useRef<HTMLDivElement>(null);
//   const myListRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const loadInitialData = async () => {
//       setLoading(true);
//       const [
//         trendingData,
//         popularData,
//         topRatedData,
//         nowPlayingData,
//         tvData,
//         genresData,
//       ] = await Promise.all([
//         getTrending(),
//         getPopular(),
//         getTopRated(),
//         getNowPlaying(),
//         getTVShows(),
//         getGenres(),
//       ]);

//       setTrending(trendingData);
//       setPopular(popularData);
//       setTopRated(topRatedData);
//       setNowPlaying(nowPlayingData);
//       setTVShows(tvData);
//       setGenres(genresData);

//       if (trendingData.length > 0) setHeroMovie(trendingData[0]);
//       setLoading(false);
//     };

//     loadInitialData();
//   }, []);

//   useEffect(() => {
//     if (selectedGenre) {
//       const loadGenreMovies = async () => {
//         const movies = await getMoviesByGenre(selectedGenre);
//         setGenreMovies(movies);
//       };
//       loadGenreMovies();
//     } else {
//       setGenreMovies([]);
//     }
//   }, [selectedGenre]);

//   const handleSearch = async (query: string) => {
//     if (!query.trim()) {
//       setIsSearching(false);
//       setSearchResults([]);
//       return;
//     }

//     setIsSearching(true);
//     const results = await searchMovies(query);
//     setSearchResults(results);
//   };

//   const handleNavigation = (section: "home" | "tv" | "movies" | "mylist") => {
//     setCurrentSection(section);
//     setIsSearching(false);
//     setSearchResults([]);

//     const refs = { home: homeRef, tv: tvRef, movies: moviesRef, mylist: myListRef };
//     refs[section].current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleLogoClick = () => {
//     setCurrentSection("home");
//     setIsSearching(false);
//     setSearchResults([]);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleMovieClick = (movie: Movie) => {
//     navigate(`/movie/${movie.id}`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
//           <p className="text-purple-600 text-xl font-semibold">Loading Filmoria...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black">
//       <Navbar
//         onSearch={handleSearch}
//         onNavigate={handleNavigation}
//         onLogoClick={handleLogoClick}
//         currentSection={currentSection}
//       />

//       <div ref={homeRef}>
//         <Hero movie={heroMovie} onPlayTrailer={() => handleMovieClick(heroMovie!)} />
//       </div>

//       <div className="relative -mt-20 z-10 pb-20">
//         {!isSearching && (
//           <div className="mt-12 mb-12">
//             <GenreFilter
//               genres={genres}
//               selectedGenre={selectedGenre}
//               onSelectGenre={setSelectedGenre}
//             />
//           </div>
//         )}

//         <div className="space-y-12">
//           {isSearching && searchResults.length > 0 && (
//             <div className="mt-24">
//               <MovieRow title="Search Results" movies={searchResults} onPlayMovie={handleMovieClick} />
//             </div>
//           )}

//           {isSearching && searchResults.length === 0 && (
//             <div className="text-center py-20 text-gray-400 text-xl">
//               No movies found. Try a different search.
//             </div>
//           )}

//           {!isSearching && currentSection === "home" && (
//             <>
//               {selectedGenre && genreMovies.length > 0 && (
//                 <MovieRow
//                   title={genres.find((g) => g.id === selectedGenre)?.name || "Genre"}
//                   movies={genreMovies}
//                   onPlayMovie={handleMovieClick}
//                 />
//               )}
//               <MovieRow title="Trending Now" movies={trending} onPlayMovie={handleMovieClick} />
//               <MovieRow title="Popular on Filmoria" movies={popular} onPlayMovie={handleMovieClick} />
//               <MovieRow title="Top Rated" movies={topRated} onPlayMovie={handleMovieClick} />
//               <MovieRow title="Now Playing" movies={nowPlaying} onPlayMovie={handleMovieClick} />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/details/:media_type/:id" element={<MovieDetail />} />
//       </Routes>
//     </Router>
//   );
// }
