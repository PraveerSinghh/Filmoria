import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import type { Movie } from "../types/movie";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onPlayMovie: (movie: Movie) => void;
  small?: boolean; // ✅ NEW PROP
}

export default function MovieRow({ title, movies, onPlayMovie, small = false }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const navigate = useNavigate();

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(() => {
        if (rowRef.current) {
          setShowLeftButton(rowRef.current.scrollLeft > 0);
          setShowRightButton(
            rowRef.current.scrollLeft <
              rowRef.current.scrollWidth - rowRef.current.clientWidth - 10
          );
        }
      }, 300);
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      setShowLeftButton(rowRef.current.scrollLeft > 0);
      setShowRightButton(
        rowRef.current.scrollLeft <
          rowRef.current.scrollWidth - rowRef.current.clientWidth - 10
      );
    }
  };

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovieId(movie.id);
    onPlayMovie(movie);
  };

  if (movies.length === 0) return null;

  return (
    <div className="relative px-4 sm:px-6 lg:px-12 mb-10">
      <h2 className={`text-white font-bold mb-4 ${small ? "text-xl" : "text-2xl"}`}>
        {title}
      </h2>

      {showLeftButton && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black/90 text-white p-3 rounded-r-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      <div
        ref={rowRef}
        onScroll={handleScroll}
        className={`flex space-x-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2 ${
          small ? "gap-2" : ""
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onPlay={() =>
              navigate(`/details/${movie.media_type || "movie"}/${movie.id}`)
            }
            selectedMovieId={selectedMovieId}
            small={small} // ✅ Pass down
          />
        ))}
      </div>

      {showRightButton && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black/90 text-white p-3 rounded-l-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}





// import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ ADD THIS
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import MovieCard from "./MovieCard";
// import type { Movie } from "../types/movie";

// interface MovieRowProps {
//   title: string;
//   movies: Movie[];
//   onPlayMovie: (movie: Movie) => void;
// }

// export default function MovieRow({
//   title,
//   movies,
//   onPlayMovie,
// }: MovieRowProps) {
//   const rowRef = useRef<HTMLDivElement>(null);
//   const [showLeftButton, setShowLeftButton] = useState(false);
//   const [showRightButton, setShowRightButton] = useState(true);
//   const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null); // ✅ Track selected movie
//   const navigate = useNavigate(); // ✅ ADD THIS

//   const scroll = (direction: "left" | "right") => {
//     if (rowRef.current) {
//       const scrollAmount = direction === "left" ? -800 : 800;
//       rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

//       setTimeout(() => {
//         if (rowRef.current) {
//           setShowLeftButton(rowRef.current.scrollLeft > 0);
//           setShowRightButton(
//             rowRef.current.scrollLeft <
//               rowRef.current.scrollWidth - rowRef.current.clientWidth - 10
//           );
//         }
//       }, 300);
//     }
//   };

//   const handleScroll = () => {
//     if (rowRef.current) {
//       setShowLeftButton(rowRef.current.scrollLeft > 0);
//       setShowRightButton(
//         rowRef.current.scrollLeft <
//           rowRef.current.scrollWidth - rowRef.current.clientWidth - 10
//       );
//     }
//   };

//   // ✅ Custom play handler that updates the selected movie
//   const handlePlayMovie = (movie: Movie) => {
//     setSelectedMovieId(movie.id);
//     onPlayMovie(movie);
//   };

//   if (movies.length === 0) return null;

//   return (
//     <div className="relative px-4 sm:px-6 lg:px-12 mb-12">
//       <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

//       {showLeftButton && (
//         <button
//           onClick={() => scroll("left")}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black/90 text-white p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-r-lg"
//         >
//           <ChevronLeft className="w-8 h-8" />
//         </button>
//       )}

//       <div
//         ref={rowRef}
//         onScroll={handleScroll}
//         className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         {movies.map((movie) => (
//           <MovieCard
//             key={movie.id}
//             movie={movie}
//             onPlay={() =>
//               navigate(`/details/${movie.media_type || "movie"}/${movie.id}`)
//             } // ✅ Directly navigate
//             selectedMovieId={selectedMovieId}
//           />
//         ))}
//       </div>

//       {showRightButton && (
//         <button
//           onClick={() => scroll("right")}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black/90 text-white p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-l-lg"
//         >
//           <ChevronRight className="w-8 h-8" />
//         </button>
//       )}
//     </div>
//   );
// }
