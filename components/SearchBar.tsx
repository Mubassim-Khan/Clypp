"use client";

import { genres } from "../lib/fetchMovie";

interface SearchBarProps {
  selectedGenre: number | undefined;
  onGenreChange: (genreCode: number | undefined) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  selectedGenre,
  onGenreChange,
}) => {
  return (
    <div className="mb-6 flex items-center gap-2 mr-5">
      <label htmlFor="genre-select" className="font-semibold">
        Genre:
      </label>
      <select
        id="genre-select"
        value={selectedGenre ?? "netflix"}
        onChange={(e) => {
          const val = e.target.value;
          onGenreChange(val === "netflix" ? undefined : Number(val));
        }}
        className="border border-[#171717] rounded px-2 py-1 outline-none"
      >
        <option value="netflix">Netflix Originals</option>
        {genres.map((g) => (
          <option className="bg-gray-950" key={g.code} value={g.code}>
            {g.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
