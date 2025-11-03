import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Genre } from '../types/movie';

interface GenreFilterProps {
  genres: Genre[];
  selectedGenre: number | null;
  onSelectGenre: (genreId: number | null) => void;
}

export default function GenreFilter({ genres, selectedGenre, onSelectGenre }: GenreFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      setTimeout(() => {
        if (scrollRef.current) {
          setShowLeftButton(scrollRef.current.scrollLeft > 0);
          setShowRightButton(
            scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
          );
        }
      }, 300);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftButton(scrollRef.current.scrollLeft > 0);
      setShowRightButton(
        scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
      );
    }
  };

  return (
    <div className="relative group px-4 sm:px-6 lg:px-12 mb-8">
      {showLeftButton && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex space-x-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <button
          onClick={() => onSelectGenre(null)}
          className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all transform hover:scale-105 ${
            selectedGenre === null
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/50'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre.id)}
            className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all transform hover:scale-105 ${
              selectedGenre === genre.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/50'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {showRightButton && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
