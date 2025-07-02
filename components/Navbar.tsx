import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname, useSearchParams } from "next/navigation";
import { genres } from "../lib/fetchMovie";

const Navbar = ({ title }: { title: string }) => {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : undefined;

  // Try to get genre from URL param or path
  let genreName = "";
  if (searchParams && searchParams.has("genre")) {
    const genreCode = Number(searchParams.get("genre"));
    genreName = genres.find((g) => g.code === genreCode)?.name || "";
  } else {
    // Try to extract from path: /genre-name/id/movie-name
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts.length > 2) {
      // Try to match genre name from path
      const maybeGenre = pathParts[0].replace(/-/g, " ");
      const found = genres.find((g) => g.name.toLowerCase() === maybeGenre.toLowerCase());
      if (found) genreName = found.name;
    }
  }

  return (
    <nav className="w-full flex justify-center mt-4">
      <div
        className="backdrop-blur-sm bg-zinc-900/50 rounded-2xl px-8 py-3 shadow-lg flex items-center"
        style={{ width: "fit-content" }}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="font-semibold text-base" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {genreName && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="font-semibold text-base"
                    href={`/?genre=${encodeURIComponent(
                      genres.find((g) => g.name === genreName)?.code ?? ""
                    )}`}
                  >
                    {genreName}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage className="text-base">
                {title || "Not Found!"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </nav>
  );
};

export default Navbar;
