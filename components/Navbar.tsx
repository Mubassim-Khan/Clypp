import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Navbar = ({ movie }: { movie: any }) => {
  return (
    <nav className="w-full flex justify-center mt-6">
      <div
        className="backdrop-blur-md bg-zinc-900/70 rounded-2xl px-8 py-3 shadow-lg flex items-center"
        style={{ width: "fit-content" }}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{movie.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </nav>
  );
};

export default Navbar;
