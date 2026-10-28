import { Avatar, Button } from "@heroui/react";
import { Cardano } from "iconsax-reactjs";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { UserTokenProvider } from "../AuthUserContext/AuthUserContext";

function Navbar() {
  const [isUserDataOpen, setIsUserDataOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { userData, setUserData } = useContext(UserTokenProvider);
  const router = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user_token");
    setUserData(null);
    router("/login");
    setIsUserDataOpen(false);
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md shadow-rose-100 fixed w-full z-20 top-0 inset-s-0 border-b border-rose-100">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/posts"
          className="flex items-center gap-2 rtl:space-x-reverse"
        >
          <Cardano size="32" color="#C9A0A0" />
          <span className="text-2xl font-semibold tracking-wide text-ink">
            Orbit
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userData ? (
            <button
              onClick={(_) => setIsUserDataOpen(!isUserDataOpen)}
              type="button"
              className="flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-rose-200 transition-transform duration-200 hover:scale-105"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <Avatar>
                <Avatar.Image alt="John Doe" src={userData?.photo} />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
            </button>
          ) : (
            <div className="flex gap-3">
              <Link to="/login">
                <Button className="bg-main-color text-white pointer-events-none shadow-md shadow-rose-300/40 transition-transform duration-200 hover:scale-105">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-main-color text-white pointer-events-none shadow-md shadow-rose-300/40 transition-transform duration-200 hover:scale-105">
                  Register
                </Button>
              </Link>
            </div>
          )}

          {/* Dropdown menu */}
          <div
            className={`z-50 absolute top-full bg-white right-0 ${
              isUserDataOpen ? "block" : "hidden"
            } bg-neutral-primary-medium border border-rose-100 rounded-base shadow-lg shadow-rose-200/50 w-44`}
            id="user-dropdown"
          >
            <div className="px-4 py-3 text-sm border-b border-rose-100">
              <span className="block text-heading font-medium">
                {userData?.name}
              </span>
              <span className="block text-body truncate">
                {userData?.email}
              </span>
            </div>
            <ul
              className="p-2 text-sm text-body font-medium"
              aria-labelledby="user-menu-button"
            >
              <li
                onClick={(_) => {
                  router("/profile");
                  setIsUserDataOpen(false);
                }}
                className="inline-flex items-center w-full p-2 cursor-pointer hover:bg-comment-bg hover:text-ink rounded transition-colors"
              >
                Profile
              </li>

              <li
                onClick={(_) => {
                  router("/change-password");
                  setIsUserDataOpen(false);
                }}
                className="inline-flex items-center w-full p-2 cursor-pointer hover:bg-comment-bg hover:text-ink rounded transition-colors"
              >
                Change Password
              </li>
              <li
                onClick={(_) => handleLogout()}
                className="inline-flex items-center w-full p-2 cursor-pointer hover:bg-comment-bg hover:text-ink rounded transition-colors"
              >
                Sign out
              </li>
            </ul>
          </div>

          <button
            onClick={(_) => setIsOpen(!isOpen)}
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            {userData && (
              <li>
                <NavLink
                  to="/posts"
                  className={function ({ isActive }) {
                    return `block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0 text-2xl transition-colors ${isActive ? "text-main-color" : "text-ink"}`;
                  }}
                  aria-current="page"
                >
                  Posts
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
