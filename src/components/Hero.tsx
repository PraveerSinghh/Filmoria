import { useState, useEffect } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { getImageUrl, BACKDROP_SIZE } from '../config/tmdb';
import type { Movie } from '../types/movie';

interface HeroProps {
  movie: Movie | null;
  onPlayTrailer: () => void;
}

export default function Hero({ movie, onPlayTrailer }: HeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!movie) {
    return (
      <div className="relative h-screen w-full bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="animate-pulse text-purple-600">Loading...</div>
      </div>
    );
  }

  const title = movie.title || movie.name || 'Untitled';
  const releaseYear = movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0];
  const rating = movie.vote_average.toFixed(1);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={getImageUrl(movie.backdrop_path, BACKDROP_SIZE)}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = getImageUrl(movie.poster_path, BACKDROP_SIZE);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      </div>

      <div className="relative h-full flex items-center px-4 sm:px-6 lg:px-12 max-w-[1920px] mx-auto">
        <div className="max-w-2xl space-y-6 pt-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl animate-fade-in">
            {title}
          </h1>

          <div className="flex items-center space-x-4 text-sm">
            <span className="px-3 py-1 bg-purple-600/80 backdrop-blur-sm text-white rounded font-semibold">
              ★ {rating}
            </span>
            {releaseYear && (
              <span className="text-gray-300 font-medium">{releaseYear}</span>
            )}
            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded text-xs font-medium">
              {movie.media_type === 'tv' ? 'TV Show' : 'Movie'}
            </span>
          </div>

          <p className="text-white text-lg leading-relaxed line-clamp-3 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {movie.overview || 'No description available.'}
          </p>

          <div className="flex items-center space-x-4">
            <button
              onClick={onPlayTrailer}
              className="flex items-center space-x-2 px-8 py-3 bg-white hover:bg-gray-200 text-black rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-600/50"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>Play</span>
            </button>

            <button className="flex items-center space-x-2 px-8 py-3 bg-gray-500/30 hover:bg-gray-500/50 text-white rounded-lg font-semibold transition-all backdrop-blur-sm border border-white/20">
              <Info className="w-6 h-6" />
              <span>More Info</span>
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all border border-white/20"
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
