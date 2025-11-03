import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getMovieDetails, getSimilarMovies } from "../services/tmdb";
import { getImageUrl } from "../config/tmdb";
import { ArrowLeft, X } from "lucide-react";

export default function MovieDetail() {
  const { id, media_type } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [similar, setSimilar] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLIFrameElement | null>(null);

  // Handle "F" key for fullscreen toggle
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "f" && playerRef.current) {
        const iframe = playerRef.current;
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          iframe.requestFullscreen().catch(console.error);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Fetch movie details
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const movieId = Number(id);
      const type = media_type || "movie";

      const movieData = await getMovieDetails(movieId, type);
      setMovie(movieData);

      const similarMovies = await getSimilarMovies(movieId, type);
      setSimilar(similarMovies);
    };
    fetchData();
  }, [id, media_type]);

  // Save to Continue Watching
  const handlePlay = () => {
    if (!movie) return;

    const continueList = JSON.parse(localStorage.getItem("continueWatching") || "[]");

    const exists = continueList.some(
      (item: any) => item.id === movie.id && item.media_type === (media_type || "movie")
    );

    if (!exists) {
      continueList.push({
        id: movie.id,
        title: movie.title || movie.name,
        media_type: media_type || "movie",
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
      });
      localStorage.setItem("continueWatching", JSON.stringify(continueList));
    }

    setIsPlaying(true);
  };

  if (!movie) return <div className="text-center text-white mt-20">Loading...</div>;

  return (
    <div className="min-h-screen text-white bg-black relative">
      {/* 🎥 Video Player */}
      {isPlaying ? (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <iframe
            ref={playerRef}
            src={
              movie.media_type === "tv" || media_type === "tv"
                ? `https://vidsrc-embed.ru/embed/tv?tmdb=${movie.id}&autoplay=1`
                : `https://vidsrc-embed.ru/embed/movie?tmdb=${movie.id}&autoplay=1`
            }
            className="w-full h-full border-none"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
          {/* ❌ Close button */}
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-4 right-6 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full z-[100]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <>
          {/* HERO SECTION */}
          <div className="relative w-full h-[80vh] flex flex-col justify-end p-8 md:p-16 overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

            <div className="absolute top-6 left-6 flex justify-between w-[95%] items-center z-10">
              <button onClick={() => navigate(-1)} className="text-white flex items-center gap-2">
                <ArrowLeft /> Back
              </button>
            </div>

            <div className="relative z-10 max-w-4xl mt-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title || movie.name}</h1>
              <p className="text-gray-300 mb-6 text-lg md:text-xl leading-relaxed">
                {movie.overview}
              </p>
              <button
                onClick={handlePlay}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 text-lg font-semibold"
              >
                ▶ Play
              </button>
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className="p-6 md:p-12">
            {movie.credits && (
              <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {movie.credits.cast.slice(0, 12).map((actor: any) => (
                    <div key={actor.id} className="text-center">
                      <img
                        src={getImageUrl(actor.profile_path)}
                        className="w-28 h-28 object-cover rounded-full mx-auto mb-2"
                        alt={actor.name}
                      />
                      <p className="text-sm">{actor.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold mb-4">You May Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {similar.slice(0, 12).map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() =>
                      navigate(`/details/${sim.media_type || media_type}/${sim.id}`)
                    }
                    className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.05]"
                  >
                    <img
                      src={getImageUrl(sim.poster_path)}
                      className="w-full h-72 object-cover rounded-lg transition-all duration-500 ease-out group-hover:opacity-80"
                      alt={sim.title || sim.name}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-between rounded-b-lg">
                      <h3 className="text-white font-semibold text-base line-clamp-2 pr-2">
                        {sim.title || sim.name}
                      </h3>
                      <div className="flex items-center text-yellow-400 text-sm font-semibold">
                        ★ {sim.vote_average?.toFixed(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}




// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getMovieDetails, getSimilarMovies } from "../services/tmdb";
// import { getImageUrl } from "../config/tmdb";
// import { ArrowLeft, X } from "lucide-react";
// import { useRef } from "react";

// export default function MovieDetail() {
//   const { id, media_type } = useParams();
//   const navigate = useNavigate();
//   const [movie, setMovie] = useState<any>(null);
//   const [similar, setSimilar] = useState<any[]>([]);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const playerRef = useRef<HTMLIFrameElement | null>(null);

//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (e.key.toLowerCase() === "f" && playerRef.current) {
//         const iframe = playerRef.current;
//         if (document.fullscreenElement) {
//           document.exitFullscreen();
//         } else {
//           iframe.requestFullscreen().catch(console.error);
//         }
//       }
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!id) return;
//       const movieId = Number(id);
//       const type = media_type || "movie";

//       const movieData = await getMovieDetails(movieId, type);
//       setMovie(movieData);

//       const similarMovies = await getSimilarMovies(movieId, type);
//       setSimilar(similarMovies);
//     };

//     fetchData();
//   }, [id, media_type]);

//   if (!movie)
//     return <div className="text-center text-white mt-20">Loading...</div>;

//   return (
//     <div className="min-h-screen text-white bg-black relative">
//       {/* 🎥 If playing, show iframe player */}
//       {isPlaying ? (
//         <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
//           <iframe
//             ref={playerRef}
//             src={
//               movie.media_type === "tv" || media_type === "tv"
//                 ? `https://vidsrc-embed.ru/embed/tv?tmdb=${movie.id}&autoplay=1`
//                 : `https://vidsrc-embed.ru/embed/movie?tmdb=${movie.id}&autoplay=1`
//             }
//             className="w-full h-full border-none"
//             allow="autoplay; encrypted-media; fullscreen"
//             allowFullScreen
//           />

//           {/* ❌ Close Button (hidden in fullscreen) */}
//           <button
//             onClick={() => setIsPlaying(false)}
//             className="absolute top-4 right-6 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full z-[100]"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>
//       ) : (
//         <>
//           {/* HERO SECTION */}
//           <div className="relative w-full h-[80vh] flex flex-col justify-end p-8 md:p-16 overflow-hidden">
//             {/* Poster (high-res) */}
//             <img
//               src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
//               alt={movie.title}
//               className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
//             />

//             {/* Gradient Overlay for better blending */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

//             {/* Top controls */}
//             <div className="absolute top-6 left-6 flex justify-between w-[95%] items-center z-10">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="text-white flex items-center gap-2"
//               >
//                 <ArrowLeft /> Back
//               </button>
//             </div>

//             {/* Movie Info */}
//             <div className="relative z-10 max-w-4xl mt-10">
//               <h1 className="text-4xl md:text-6xl font-bold mb-4">
//                 {movie.title || movie.name}
//               </h1>
//               <p className="text-gray-300 mb-6 text-lg md:text-xl leading-relaxed">
//                 {movie.overview}
//               </p>
//               <button
//                 onClick={() => setIsPlaying(true)}
//                 className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 text-lg font-semibold"
//               >
//                 ▶ Play
//               </button>
//             </div>
//           </div>

//           {/* DETAILS SECTION */}
//           <div className="p-6 md:p-12">
//             {/* Cast */}
//             {movie.credits && (
//               <div className="mb-10">
//                 <h2 className="text-2xl font-semibold mb-4">Cast</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
//                   {movie.credits.cast.slice(0, 12).map((actor: any) => (
//                     <div key={actor.id} className="text-center">
//                       <img
//                         src={getImageUrl(actor.profile_path)}
//                         className="w-28 h-28 object-cover rounded-full mx-auto mb-2"
//                         alt={actor.name}
//                       />
//                       <p className="text-sm">{actor.name}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Similar Movies */}
//             <div>
//               <h2 className="text-2xl font-semibold mb-4">You May Also Like</h2>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
//                 {similar.slice(0, 12).map((sim) => (
//                   <div
//                     key={sim.id}
//                     onClick={() =>
//                       navigate(
//                         `/details/${sim.media_type || media_type}/${sim.id}`
//                       )
//                     }
//                     className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.05]"
//                   >
//                     <img
//                       src={getImageUrl(sim.poster_path)}
//                       className="w-full h-72 object-cover rounded-lg transition-all duration-500 ease-out group-hover:opacity-80"
//                       alt={sim.title || sim.name}
//                     />

//                     {/* Overlay info (like home) */}
//                     <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-between rounded-b-lg">
//                       <h3 className="text-white font-semibold text-base line-clamp-2 pr-2">
//                         {sim.title || sim.name}
//                       </h3>
//                       <div className="flex items-center text-yellow-400 text-sm font-semibold">
//                         ★ {sim.vote_average?.toFixed(1)}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
