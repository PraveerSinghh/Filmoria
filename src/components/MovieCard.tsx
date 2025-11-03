import { useState } from 'react';
import { Star } from 'lucide-react';
import { getImageUrl } from '../config/tmdb';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  selectedMovieId?: number | null;
  small?: boolean; // ✅ Added for compact rows
}

export default function MovieCard({ movie, onPlay, selectedMovieId, small = false }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const title = movie.title || movie.name || 'Untitled';
  const rating = movie.vote_average?.toFixed(1) || 'N/A';

  const isSelected = selectedMovieId === movie.id;

  return (
    <div
      onClick={() => onPlay(movie)}
      className={`group relative flex-shrink-0 cursor-pointer transition-transform duration-300 
      ${small ? 'w-36 sm:w-40' : 'w-48 sm:w-56'}
      ${isSelected ? 'scale-[1.06] z-10' : 'hover:scale-[1.06] hover:z-10'}
      `}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        {/* 🎬 Movie Poster */}
        <img
          src={getImageUrl(movie.poster_path)}
          alt={title}
          className={`w-full object-cover transition-all duration-500 ease-out 
          ${small ? 'h-52 sm:h-56' : 'h-72 sm:h-80'}
          ${imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            if (!imageError) {
              setImageError(true);
              e.currentTarget.src = getImageUrl(null);
            }
          }}
          loading="lazy"
        />

        {/* 🕓 Loading skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}

        {/* ✨ Hover/Select ring effect */}
        <div
          className={`absolute inset-0 rounded-lg transition-all duration-500 ease-in-out 
          ${
            isSelected
              ? 'ring-2 ring-purple-600 shadow-[0_0_25px_rgba(168,85,247,0.4)] opacity-100'
              : 'group-hover:ring-purple-600 group-hover:opacity-100 opacity-0 ring-transparent'
          }
          `}
        />

        {/* 🎞️ Movie info (shows on hover or if selected) */}
        <div
          className={`
            absolute bottom-0 left-0 right-0
            transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
            ${small ? 'p-2' : 'p-3'} 
            bg-black/40 backdrop-blur-md rounded-b-lg flex items-center justify-between
            border-t border-purple-600/20
            ${
              isSelected
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
            }
          `}
        >
          <h3
            className={`text-white font-semibold ${
              small ? 'text-sm line-clamp-1' : 'text-base sm:text-lg line-clamp-2'
            } pr-2`}
          >
            {title}
          </h3>
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star className={small ? 'w-4 h-4' : 'w-5 h-5'} />
            <span
              className={`${small ? 'text-xs font-medium' : 'text-sm sm:text-base font-semibold'}`}
            >
              {rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}










// import { useState } from 'react';
// import { Play, Plus, Star } from 'lucide-react';
// import { getImageUrl } from '../config/tmdb';
// import type { Movie } from '../types/movie';

// interface MovieCardProps {
//   movie: Movie;
//   onPlay: (movie: Movie) => void;
// }

// export default function MovieCard({ movie, onPlay }: MovieCardProps) {
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   const title = movie.title || movie.name || 'Untitled';
//   const rating = movie.vote_average.toFixed(1);

//   return (
//     <div className="group relative flex-shrink-0 w-48 sm:w-56 cursor-pointer transition-transform duration-200 hover:scale-105 hover:z-10">
//       <div className="relative overflow-hidden rounded-lg shadow-lg">
//         <img
//           src={getImageUrl(movie.poster_path)}
//           alt={title}
//           className={`w-full h-72 sm:h-80 object-cover transition-all duration-300 ${
//             imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
//           }`}
//           onLoad={() => setImageLoaded(true)}
//           onError={(e) => {
//             if (!imageError) {
//               setImageError(true);
//               e.currentTarget.src = getImageUrl(null);
//             }
//           }}
//           loading="lazy"
//         />

//         {!imageLoaded && !imageError && (
//           <div className="absolute inset-0 bg-gray-800 animate-pulse" />
//         )}

//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//         <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-purple-600 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] opacity-0 group-hover:opacity-100" />
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//         <div className="bg-black/95 backdrop-blur-sm rounded-lg p-4 space-y-3 border border-purple-600/30">
//           <h3 className="text-white font-semibold text-sm line-clamp-2">{title}</h3>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-1 text-yellow-400">
//               <Star className="w-4 h-4 fill-current" />
//               <span className="text-xs font-medium">{rating}</span>
//             </div>

//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => onPlay(movie)}
//                 className="p-2 bg-white hover:bg-purple-600 text-black hover:text-white rounded-full transition-all transform hover:scale-110"
//               >
//                 <Play className="w-4 h-4 fill-current" />
//               </button>

//               <button className="p-2 bg-white/20 hover:bg-purple-600 text-white rounded-full transition-all transform hover:scale-110">
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
