"use client";

import { genres } from "../lib/fetchMovie";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <Select
        value={selectedGenre?.toString() ?? "netflix"}
        onValueChange={(val) => {
          onGenreChange(val === "netflix" ? undefined : Number(val));
        }}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Select a genre" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 text-white border-zinc-800">
          <ScrollArea className="h-48 w-full">
            <SelectGroup>
              <SelectLabel className="text-zinc-300">Genres</SelectLabel>
              <SelectItem
                value="netflix"
                className="bg-zinc-900 text-white hover:bg-zinc-800"
              >
                Netflix Originals
              </SelectItem>
              {genres.map((g) => (
                <SelectItem
                  key={g.code}
                  value={g.code.toString()}
                  className="bg-zinc-900 text-white hover:bg-zinc-800"
                >
                  {g.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
