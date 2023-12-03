import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";
import { useTranslation } from "react-i18next";
import { MoviesList, TvList } from "./GenresData";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MobileMenu = ({
  isOpenMobileMenu,
  setIsOpenMobileMenu,
  tvGenres,
  movieGenres,
  navbarPin,
}) => {
  // Navigation pages
  const navigate = useNavigate();
  // Navigate navbar items
  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
  };

  // Translate texts
  const { t, i18n } = useTranslation();

  return (
    <div className="relative">
      <div
        className={`${isOpenMobileMenu ? "block" : "hidden"} ${
          !navbarPin && "absolute -top-60"
        } max-h-[90svh] h-auto max-w-full w-[98%] mx-1 overflow-x-hidden overflow-y-scroll space-y-1 px-2 pb-3 pt-2 border border-secondary-v50 rounded-md z-50 backdrop-blur-sm bg-white dark:bg-black shadow-xl`}
      >
        {/* Mobile Items */}
        <div className="flex items-center justify-start me-2.5 mb-2 pt-2 pb-4 border-b dark:border-secondary-g50 border-secondary-g40">
          {/* Darkmode component */}
          <DarkMode />
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {/* Mobile --> Category Movies DropDown */}
              <Disclosure as="div" className="w-full -mx-3">
                {({ open, close }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center gap-x-2 rounded-lg py-2 text-base font-bold leading-7 text-primary-g90 ps-3 pe-3.5 dark:text-white">
                      {/* dropdown button movies */}
                      <span className="flex items-center">
                        <p>{t("navbar.titles.movies")}</p>
                      </span>

                      <FaChevronDown
                        className={classNames(
                          open ? "rotate-180" : "",
                          "flex-none text-primary-g80 dark:text-white duration-200"
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    {/* Animations dropdown menu */}
                    <Transition
                      enter="transition duration-150 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-100 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="mt-0 space-y-1">
                        {/* Categories Mobile Component */}
                        {i18n.dir() === "ltr" ? (
                          <>
                            {/* Movie genres data for ltr direction */}
                            <div className="w-full flex flex-col items-start ml-6 gap-y-2">
                              {movieGenres?.map((item) => {
                                return (
                                  <span
                                    key={item.id}
                                    className="w-full cursor-pointer text-primary-g80 dark:text-secondary-g30"
                                    onClick={() => {
                                      navigate(`/genre/movie/${item.id}`),
                                        close(),
                                        setIsOpenMobileMenu(!isOpenMobileMenu);
                                    }}
                                  >
                                    {item.name}
                                  </span>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Movie genres data for rtl direction */}
                            <div className="w-full flex flex-col items-start mr-6 gap-y-2">
                              {MoviesList.map((item) => {
                                return (
                                  <span
                                    key={item.id}
                                    className="w-full cursor-pointer text-primary-g80 dark:text-secondary-g30"
                                    onClick={() => {
                                      navigate(`/genre/movie/${item.id}`),
                                        close(),
                                        setIsOpenMobileMenu(!isOpenMobileMenu);
                                    }}
                                  >
                                    {item.name}
                                  </span>
                                );
                              })}
                            </div>
                          </>
                        )}
                        {/* Last link on dropdown menu */}
                        <span
                          onClick={() => {
                            navigationHandler("movie"),
                              close(),
                              setIsOpenMobileMenu(!isOpenMobileMenu);
                          }}
                          className="block rounded-lg py-2 text-base font-semibold leading-7 text-primary-v70 duration-200 pe-3 ps-6 hover:opacity-80"
                        >
                          {t("navbar.category.movies")}
                        </span>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
              {/* Mobile --> Categories Browser Game DropDown */}
              <Disclosure as="div" className="w-full -mx-3">
                {({ open, close }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center gap-x-2 rounded-lg py-2 text-base font-bold leading-7 text-primary-g90 ps-3 pe-3.5 dark:text-white">
                      <span className="flex items-center">
                        <p>{t("navbar.titles.tvshows")}</p>
                      </span>

                      <FaChevronDown
                        className={classNames(
                          open ? "rotate-180" : "",
                          "flex-none cursor-pointer text-primary-g80 dark:text-white duration-200"
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    {/* Animations dropdown menu */}
                    <Transition
                      enter="transition duration-150 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-100 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="mt-0 space-y-1">
                        {/* Categories Mobile Component */}
                        {i18n.dir() === "ltr" ? (
                          <>
                            {/* Tvshow genres data for ltr direction */}
                            <div className="w-full flex flex-col items-start ml-6 gap-y-2">
                              {tvGenres?.map((item) => {
                                return (
                                  <span
                                    key={item.id}
                                    className="w-full cursor-pointer text-primary-g80 dark:text-secondary-g30"
                                    onClick={() => {
                                      navigate(`/genre/tv/${item.id}`),
                                        close(),
                                        setIsOpenMobileMenu(!isOpenMobileMenu);
                                    }}
                                  >
                                    {item.name}
                                  </span>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Tvshow genres data for rtl direction */}
                            <div className="w-full flex flex-col items-start mr-6 gap-y-2">
                              {TvList.map((item) => {
                                return (
                                  <span
                                    key={item.id}
                                    className="w-full cursor-pointer text-primary-g80 dark:text-secondary-g30"
                                    onClick={() => {
                                      navigate(`/genre/tv/${item.id}`),
                                        close(),
                                        setIsOpenMobileMenu(!isOpenMobileMenu);
                                    }}
                                  >
                                    {item.name}
                                  </span>
                                );
                              })}
                            </div>
                          </>
                        )}
                        {/* Last link on dropdown menu */}
                        <span
                          onClick={() => {
                            navigationHandler("tv"),
                              close(),
                              setIsOpenMobileMenu(!isOpenMobileMenu);
                          }}
                          className="block rounded-lg py-2 text-base font-semibold leading-7 text-primary-v70 duration-200 pe-3 ps-6 hover:opacity-80"
                        >
                          {t("navbar.category.tvshows")}
                        </span>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
