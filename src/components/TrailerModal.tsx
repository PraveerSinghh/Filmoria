import { useState } from 'react';
import { X } from 'lucide-react';
import type { Movie } from '../types/movie';

interface TrailerModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function TrailerModal({ movie, onClose }: TrailerModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!movie) return null;

  const title = movie.title || movie.name || 'Untitled';

  const embedUrl =
    movie.media_type === 'tv'
      ? `https://vidsrc-embed.ru/embed/tv?tmdb=${movie.id}&autoplay=1`
      : `https://vidsrc-embed.ru/embed/movie?tmdb=${movie.id}&autoplay=1`;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-fade-in"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all transform hover:scale-110 z-50"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Full-Screen Video */}
      <div className="relative w-full h-full">
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        )}

        {!error && (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
          />
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-white bg-black">
            <p className="text-xl">Video unavailable</p>
          </div>
        )}
      </div>
    </div>
  );
}



// import { useState } from 'react';
// import { X } from 'lucide-react';
// import type { Movie } from '../types/movie';

// interface TrailerModalProps {
//   movie: Movie | null;
//   onClose: () => void;
// }

// export default function TrailerModal({ movie, onClose }: TrailerModalProps) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   if (!movie) return null;

//   const title = movie.title || movie.name || 'Untitled';

//   // Determine embed URL based on media_type
//   const embedUrl =
//     movie.media_type === 'tv'
//       ? `https://vidsrc-embed.ru/embed/tv?tmdb=${movie.id}&autoplay=1`
//       : `https://vidsrc-embed.ru/embed/movie?tmdb=${movie.id}&autoplay=1`;

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in p-4 sm:p-8"
//       onClick={handleBackdropClick}
//     >
//       <div className="relative w-[95vw] max-w-sm sm:w-[90vw] sm:max-w-3xl mx-4 sm:mx-auto bg-black rounded-lg overflow-hidden shadow-2xl">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all transform hover:scale-110 z-10"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         {/* Embedded Video */}
//         <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-2xl">
//           {loading && !error && (
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
//             </div>
//           )}

//           {!error && (
//             <iframe
//               className="absolute inset-0 w-full h-full"
//               src={embedUrl}
//               title={title}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               onLoad={() => setLoading(false)}
//               onError={() => {
//                 setLoading(false);
//                 setError(true);
//               }}
//             />
//           )}

//           {error && (
//             <div className="absolute inset-0 flex items-center justify-center text-white">
//               <p className="text-xl">Video unavailable</p>
//             </div>
//           )}
//         </div>

//         {/* Movie/TV Info */}
//         <div className="mt-4 p-4 text-white">
//           <h3 className="text-2xl font-bold">{title}</h3>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { X } from 'lucide-react';
// import type { Movie } from '../types/movie';

// interface TrailerModalProps {
//   movie: Movie | null;
//   onClose: () => void;
// }

// export default function TrailerModal({ movie, onClose }: TrailerModalProps) {
//   if (!movie) return null;

//   const title = movie.title || movie.name || 'Untitled';

//   // Determine the correct embed URL based on media_type
//   const embedUrl =
//     movie.media_type === 'tv'
//       ? `https://vidsrc-embed.ru/embed/tv?tmdb=${movie.id}&autoplay=1`
//       : `https://vidsrc-embed.ru/embed/movie?tmdb=${movie.id}&autoplay=1`;

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in p-4 sm:p-8"
//       onClick={handleBackdropClick}
//     >
//       <div className="relative w-full max-w-4xl mx-4 sm:mx-auto bg-black rounded-lg overflow-hidden shadow-2xl">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all transform hover:scale-110 z-10"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         {/* Embedded Video */}
//         <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-2xl">
//           <iframe
//             className="absolute inset-0 w-full h-full"
//             src={embedUrl}
//             title={title}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>

//         {/* Movie/TV Info */}
//         <div className="mt-4 p-4 text-white">
//           <h3 className="text-2xl font-bold">{title}</h3>
//         </div>
//       </div>
//     </div>
//   );
// }





// import { X } from 'lucide-react';
// import type { Movie } from '../types/movie';

// interface TrailerModalProps {
//   movie: Movie | null;
//   onClose: () => void;
// }

// export default function TrailerModal({ movie, onClose }: TrailerModalProps) {
//   if (!movie) return null;

//   // Construct the VidSrc embed URL
//   // If movie.id is from TMDB, we can use tmdb param
//   // For simplicity, we assume movie.id is TMDB ID
//   const embedUrl = `https://vidsrc-embed.ru/embed/movie?tmdb=${movie.id}&autoplay=1`;

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const title = movie.title || movie.name || 'Untitled';

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in p-4 sm:p-8"
//       onClick={handleBackdropClick}
//     >
//       <div className="relative w-full max-w-4xl mx-4 sm:mx-auto bg-black rounded-lg overflow-hidden shadow-2xl">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all transform hover:scale-110 z-10"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         {/* Video iframe */}
//         <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-2xl">
//           <iframe
//             className="absolute inset-0 w-full h-full"
//             src={embedUrl}
//             title={title}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>

//         {/* Movie Info */}
//         <div className="mt-4 p-4 text-white">
//           <h3 className="text-2xl font-bold">{title}</h3>
//         </div>
//       </div>
//     </div>
//   );
// }





// import { X } from 'lucide-react';
// import type { Movie } from '../types/movie';

// interface TrailerModalProps {
//   movie: Movie | null;
//   onClose: () => void;
// }

// export default function TrailerModal({ movie, onClose }: TrailerModalProps) {
//   if (!movie) return null;

//   // Construct the VidSrc embed URL
//   // If movie.id is from TMDB, we can use tmdb param
//   // For simplicity, we assume movie.id is TMDB ID
//   const embedUrl = `https://vidsrc-embed.ru/embed/movie?tmdb=${movie.id}&autoplay=1`;

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const title = movie.title || movie.name || 'Untitled';

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in p-4 sm:p-8"
//       onClick={handleBackdropClick}
//     >
//       <div className="relative w-full max-w-4xl mx-4 sm:mx-auto bg-black rounded-lg overflow-hidden shadow-2xl">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all transform hover:scale-110 z-10"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         {/* Video iframe */}
//         <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-2xl">
//           <iframe
//             className="absolute inset-0 w-full h-full"
//             src={embedUrl}
//             title={title}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>

//         {/* Movie Info */}
//         <div className="mt-4 p-4 text-white">
//           <h3 className="text-2xl font-bold">{title}</h3>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import { getMovieVideos } from "../services/tmdb";
// import type { Movie, Video } from "../types/movie";

// interface TrailerModalProps {
//   movie: Movie | null;
//   onClose: () => void;
// }

// export default function TrailerModal({ movie, onClose }: TrailerModalProps) {
//   const [trailer, setTrailer] = useState<Video | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!movie) return;

//     const loadTrailer = async () => {
//       setLoading(true);
//       const mediaType = movie.media_type || "movie";
//       const videos = await getMovieVideos(movie.id, mediaType);

//       const trailerVideo =
//         videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
//         videos.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
//         videos[0];

//       setTrailer(trailerVideo || null);
//       setLoading(false);
//     };

//     loadTrailer();
//   }, [movie]);

//   if (!movie) return null;

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in p-4"
//       onClick={handleBackdropClick}
//     >
//       <div className="relative w-[90vw] max-w-2xl sm:max-w-3xl mx-auto bg-black rounded-lg overflow-hidden shadow-2xl">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all transform hover:scale-110 z-10"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         {/* Video */}
//         <div className="relative pt-[56.25%] bg-black">
//           {loading ? (
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
//             </div>
//           ) : trailer ? (
//             <iframe
//               className="absolute inset-0 w-full h-full"
//               src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
//               title={trailer.name}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           ) : (
//             <div className="absolute inset-0 flex items-center justify-center text-white">
//               <p className="text-xl">No trailer available</p>
//             </div>
//           )}
//         </div>

//         {/* Movie Info */}
//         <div className="p-4 text-white">
//           <h3 className="text-2xl font-bold">{movie.title || movie.name}</h3>
//           {trailer && <p className="text-gray-400 mt-1">{trailer.name}</p>}
//         </div>
//       </div>
//     </div>

//     // <div
//     //   className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in p-4 sm:p-8"
//     //   onClick={handleBackdropClick}
//     // >
//     //   <div className="relative w-full max-w-4xl mx-4">
//     //     <button
//     //       onClick={onClose}
//     //       className="absolute -top-10 sm:-top-12 right-0 p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all transform hover:scale-110 z-10"
//     //     >
//     //       <X className="w-6 h-6" />
//     //     </button>

//     //     <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-2xl">
//     //       {loading ? (
//     //         <div className="absolute inset-0 flex items-center justify-center">
//     //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
//     //         </div>
//     //       ) : trailer ? (
//     //         <iframe
//     //           className="absolute inset-0 w-full h-full"
//     //           src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
//     //           title={trailer.name}
//     //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//     //           allowFullScreen
//     //         />
//     //       ) : (
//     //         <div className="absolute inset-0 flex items-center justify-center text-white">
//     //           <p className="text-xl">No trailer available</p>
//     //         </div>
//     //       )}
//     //     </div>

//     //     <div className="mt-4 text-white">
//     //       <h3 className="text-2xl font-bold">{movie.title || movie.name}</h3>
//     //       {trailer && (
//     //         <p className="text-gray-400 mt-1">{trailer.name}</p>
//     //       )}
//     //     </div>
//     //   </div>
//     // </div>
//   );
// }
