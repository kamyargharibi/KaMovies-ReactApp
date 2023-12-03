import { Fragment, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import { Transition, Menu } from "@headlessui/react";
import SearchBox from "./SearchBox";
import logo from "../../assets/images/logo.png";
import MobileMenu from "./MobileMenu";
import useFetch from "../../hooks/useFetch";
import DarkMode from "./DarkMode";
import SelectLanguage from "./SelectLanguage";
import { useTranslation } from "react-i18next";
import { MoviesList, TvList } from "./GenresData";

const Navbar = ({ navbarPin }) => {
  // Menu mobile
  const [mobileMenu, setMobileMenu] = useState(false);
  // Current open or open mobile menu
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  // Search box
  const [isOpen, setIsOpen] = useState(false);
  // Navigation pages
  const navigate = useNavigate();
  // Location " Y "
  const location = useLocation();

  // Fetch genres List
  const { data: movieGenres } = useFetch("/genre/movie/list");
  const { data: tvGenres } = useFetch("/genre/tv/list");

  // Navigate navbar items
  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
  };

  // Handle mobile menu onclick
  const handleMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
  };

  // Translate texts
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`w-full sm:max-h-14 sm:h-14 max-h-12 h-12 flex items-center justify-between backdrop-blur-sm bg-white/30 dark:bg-white/20 backdrop-brightness-90  duration-500 sm:-translate-y-0 !z-50`}
    >
      <div className="max-w-screen-xl w-full mx-auto">
        <div className="max-w-7xl w-full h-16 mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              {/* Logo image */}
              <div
                className="flex flex-shrink-0 items-center sm:p-1 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img className="h-6 w-auto" src={logo} alt="Ka Movie" />
              </div>
              <div className="hidden sm:me-6 sm:flex items-center">
                <div className="flex space-x-1">
                  {/* Movie Categories */}
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md pe-3 py-2 ms-5 text-sm font-medium text-primary-g80 hover:text-primary-g70 dark:text-secondary-g20 dark:hover:text-secondary-g30 outline-none duration-200">
                        {t("navbar.titles.movies")}
                        <FiChevronDown
                          className="ms-2 -ms-1 h-5 w-5 text-primary-g80 dark:text-secondary-g20 dark:hover:text-secondary-g30"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    {/* Animations dropdown menu */}
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className={`${
                          !navbarPin && "hidden"
                        } absolute left-0 rtl:right-3 mt-4 w-56 origin-top-right divide-y divide-secondary-g20 dark:divide-secondary-g60 rounded-md bg-white dark:bg-primary-g80 shadow-lg ring-5 ring-black ring-opacity-5 outline-none`}
                      >
                        {i18n.dir() === "ltr" ? (
                          <div className="px-1 py-1">
                            {/* Movie genres data for ltr direction */}
                            {movieGenres?.genres?.map((item) => {
                              return (
                                <Menu.Item key={item.id}>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        navigate(`/genre/movie/${item.id}`)
                                      }
                                      className={`${
                                        active
                                          ? "bg-secondary-v50 text-white"
                                          : "text-primary-g80 dark:text-secondary-g20"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm duration-150`}
                                    >
                                      {item.name}
                                    </button>
                                  )}
                                </Menu.Item>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="px-1 py-1">
                            {/* Movie genres data for rtl direction */}
                            {MoviesList.map((item) => {
                              return (
                                <Menu.Item key={item.id}>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        navigate(`/genre/movie/${item.id}`)
                                      }
                                      className={`${
                                        active
                                          ? "bg-secondary-v50 text-white"
                                          : "text-primary-g80 dark:text-secondary-g20"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm duration-150`}
                                    >
                                      {item.name}
                                    </button>
                                  )}
                                </Menu.Item>
                              );
                            })}
                          </div>
                        )}
                        <div className="px-1 py-1 border-t border-gray-500">
                          {/* Last link on dropdown menu */}
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => navigationHandler("movie")}
                                className={`${
                                  active
                                    ? "bg-secondary-v50 text-white"
                                    : "text-secondary-v60"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {t("navbar.category.movies")}
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  {/* TV Shows Categories */}
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium text-primary-g80 hover:text-primary-g70  dark:text-secondary-g20 dark:hover:text-secondary-g30 outline-none duration-200">
                        {t("navbar.titles.tvshows")}
                        <FiChevronDown
                          className="ms-2 -ms-1 h-5 w-5 text-primary-g80 dark:text-secondary-g20 dark:hover:text-secondary-g30"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className={`${
                          !navbarPin && "hidden"
                        } absolute left-0 rtl:right-3 mt-4 w-56 origin-top-right divide-y divide-secondary-g20 dark:divide-secondary-g60 rounded-md bg-white dark:bg-primary-g80 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                      >
                        {i18n.dir() === "ltr" ? (
                          <div className="px-1 py-1 ">
                            {/* Tvshow genres data for ltr direction */}
                            {tvGenres?.genres?.map((item) => {
                              return (
                                <Menu.Item key={item.id}>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        navigate(`/genre/tv/${item.id}`)
                                      }
                                      className={`${
                                        active
                                          ? "bg-secondary-v50 text-white"
                                          : "text-primary-g80 dark:text-secondary-g20"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm duration-150`}
                                    >
                                      {item.name}
                                    </button>
                                  )}
                                </Menu.Item>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="px-1 py-1 ">
                            {/* Tvshow genres data for rtl direction */}
                            {TvList.map((item) => {
                              return (
                                <Menu.Item key={item.id}>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        navigate(`/genre/tv/${item.id}`)
                                      }
                                      className={`${
                                        active
                                          ? "bg-secondary-v50 text-white"
                                          : "text-primary-g80 dark:text-secondary-g20"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm duration-150`}
                                    >
                                      {item.name}
                                    </button>
                                  )}
                                </Menu.Item>
                              );
                            })}
                          </div>
                        )}
                        <div className="px-1 py-1 border-t border-gray-500">
                          {/* Last link on dropdown menu */}
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => navigationHandler("tv")}
                                className={`${
                                  active
                                    ? "bg-secondary-v50 text-white"
                                    : "text-secondary-v60"
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                {t("navbar.category.tvshows")}
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-2 ps-2 sm:static sm:inset-auto sm:ps-0">
              {/* Search box button */}
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="rounded-full text-primary-g80 focus:outline-none"
              >
                <BiSearchAlt2 className="h-6 w-6" aria-hidden="true" />
              </button>
              {/* Dark mode toggle button Component */}
              <div className="sm:block hidden">
                <DarkMode />
              </div>
              {/* Select Language Component */}
              <SelectLanguage />
            </div>
            {/* Search Box Component */}
            <SearchBox isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="max-w-full w-auto flex items-center sm:hidden">
              <div className="max-w-full w-full bg-transparent">
                <div
                  className={`${
                    mobileMenu ? "hidden" : "flex"
                  } w-full items-center sm:hidden`}
                >
                  {/* Mobile menu button*/}
                  <div
                    onClick={handleMobileMenu}
                    className="inline-flex items-center justify-center rounded-md ps-2 text-primary-g80 hover:text-secondary-g70 outline-none duration-200"
                  >
                    {!isOpenMobileMenu ? (
                      <FiMenu className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <HiXMark
                        className="block h-7 w-7 animate-pulse duration-500"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              !mobileMenu ? "" : "hidden"
            }  sm:hidden relative max-w-full w-full`}
          >
            {/* Mobile menu component */}
            <MobileMenu
              isOpenMobileMenu={isOpenMobileMenu}
              setIsOpenMobileMenu={setIsOpenMobileMenu}
              tvGenres={tvGenres?.genres}
              movieGenres={movieGenres?.genres}
              navbarPin={navbarPin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
