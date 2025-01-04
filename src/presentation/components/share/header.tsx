import { Link } from "react-router-dom";
import { Logo } from "./logo";
import { Navigation } from "./navigation";

export const Header = () => {
  return (
    <>
      <div className="w-full flex items-center justify-between border-b-2 mx-auto py-0 md:py-1 fixed top-0 bg-green-400 lg:bg-white z-10">
        <Link className="hover:text-transparent" to="/">
          <div className="hidden lg:flex items-center">
            <Logo size={8} />
            <p className="text-2xl font-['Dela_Gothic_One'] [-webkit-text-stroke:1px_#fff462] ml-2.5">
              Black Jack
            </p>
          </div>
        </Link>
        <Navigation />
      </div>
    </>
  );
};
