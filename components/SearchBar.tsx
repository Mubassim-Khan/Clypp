"use client";

import * as React from "react";
import { genres } from "../lib/fetchMovie";
import { MdMovie } from "react-icons/md";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  selectedGenre: number | undefined;
  onGenreChange: (genreCode: number | undefined) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  selectedGenre,
  onGenreChange,
}) => {
  const [open, setOpen] = React.useState(false);

  const selectedLabel =
    selectedGenre === undefined
      ? "Netflix Originals"
      : genres.find((g) => g.code === selectedGenre)?.name ?? "Select Genre";

  return (
    <div className="mb-6 flex items-center gap-2 mr-5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[220px] justify-between bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-950 hover:text-white"
          >
            <span className="flex items-center gap-2">
              <MdMovie className="text-[#ededed]" />
              {selectedLabel}
            </span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[220px] p-0 bg-zinc-900 text-white border-zinc-800">
          <Command className="bg-zinc-900 text-white">
            <CommandInput
              placeholder="Search genre..."
              className="placeholder:text-zinc-400"
            />
            <CommandList>
              <CommandEmpty>No genre found.</CommandEmpty>
              <ScrollArea className="h-48">
                <CommandGroup heading="Genres">
                  <CommandItem
                    value="netflix"
                    onSelect={() => {
                      onGenreChange(undefined);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedGenre === undefined
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    Netflix Originals
                  </CommandItem>

                  {genres.map((g) => (
                    <CommandItem
                      key={g.code}
                      value={g.name.toLowerCase()}
                      onSelect={() => {
                        onGenreChange(g.code);
                        setOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedGenre === g.code ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {g.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;
