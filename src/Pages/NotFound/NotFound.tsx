import { Link } from "react-router";

function NotFound() {
  return (
    <div className="pt-32 flex flex-col items-center gap-3 text-center fade-up">
      <h1 className="text-8xl font-bold text-main-color">404</h1>
      <h2 className="text-2xl font-semibold text-ink">Page Not Found</h2>
      <Link to="/posts" className="mt-2 px-6 py-2 rounded-full bg-main-color text-white shadow-md shadow-rose-300/40 transition-transform duration-200 hover:scale-105">
        Back to Posts
      </Link>
    </div>
  );
}
export default NotFound;