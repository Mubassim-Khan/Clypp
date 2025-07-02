export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl mt-4">Page Not Found</p>
        <a href="/" className="text-blue-400 mt-6 inline-block underline">
          Go back home
        </a>
      </div>
    </div>
  );
}
