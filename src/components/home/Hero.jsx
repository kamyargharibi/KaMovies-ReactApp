import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FaAnglesDown } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  // Get & save current background url
  const [background, setBackground] = useState(null);
  // Current Value on search box
  const [query, setQuery] = useState("");
  // Get url from store
  const { url } = useSelector((state) => state.movie);
  // Fetch data with url
  const { data, loading } = useFetch("/trending/movie/day");
  // Navigate routes
  const navigate = useNavigate();

  // Handle click scroll to carousels
  const handleClickScroll = () => {
    const element = document.getElementById("trending");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Handle search box with Enter key and navigate to search page
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  // Handle search box with enter key and navigate to search page
  const searchClickHandler = (e) => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  useEffect(() => {
    const url = "https://image.tmdb.org/t/p/original";
    // Get random image url for background image
    const bg =
      url + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    // Set current url
    setBackground(bg);
  }, [data]);

  // Translate Texts
  const { t, i18n } = useTranslation();

  return (
    <div className="mx-auto">
      <div className="w-full h-[60vw] min-h-fit bg-secondary-g30 dark:bg-primary-g80 relative">
        {/* Hero texts and search box */}
        {!loading && (
          <div className="max-w-full w-full flex flex-col mx-auto z-30 justify-center items-center absolute sm:top-[20%] top-[25%] right-[0%]">
            {/* Title on hero */}
            <h2 className="font-semibold lg:text-6xl md:text-5xl sm:text-3xl text-xl text-primary-g80 shadow-xl rounded-full px-2 dark:text-secondary-g20">
              {t("hero.welcome")}{" "}
              <span className="text-secondary-v60">{t("hero.welcome2")}</span>
            </h2>
            <p className="my-4 text-center font-semibold lg:text-2xl md:text-xl sm:text-lg text-xs text-secondary-g50">
              {t("hero.description")}
            </p>
            {/* Search box */}
            <div className="w-full mx-auto flex items-center justify-center">
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={searchQueryHandler}
                placeholder={t("hero.placeholder")}
                className="sm:w-[40%] w-[50%] md:py-4 md:px-6 py-2 px-3 bg-white opacity-100 rounded-s-full lg:text-xl md:text-base sm:text-sm text-xs focus:outline-none sm:border-none border"
              />
              <button
                onClick={searchClickHandler}
                className="sm:w-[10%] w-[20%] rounded-e-full text-center text-white lg:text-xl md:text-base sm:text-sm text-xs font-semibold md:p-4 p-2 sm:border-none border border-secondary-g20  bg-gradient-to-r from-secondary-v50 via-secondary-v60 to-primary-v70"
              >
                {t("hero.button")}
              </button>
            </div>
          </div>
        )}
        {/* Background image cover */}
        <LazyLoadImage
          style={{ opacity: "0.7" }}
          className="w-full bg-cover bg-center opacity-50 object-cover object-center"
          alt="herobanner"
          effect="blur"
          src={background}
        />

        {/* Shadow box on image cover */}
        <div className="w-full h-80 lg:shadow-[0px_-150px_100px_250px_#fff] md:shadow-[0px_-100px_100px_90px_#fff] sm:shadow-[0px_-50px_90px_90px_#fff] shadow-[0px_-80px_100px_50px_#fff] dark:lg:shadow-[0px_-150px_100px_250px_#111827] dark:md:shadow-[0px_-100px_100px_90px_#111827] dark:sm:shadow-[0px_-50px_90px_90px_#111827] dark:shadow-[0px_-80px_100px_50px_#111827] absolute top-[100%]"></div>
        {/* Scroll to down button */}
        {!loading && (
          <div
            onClick={handleClickScroll}
            className="hidden w-full h-10 mx-auto lg:flex justify-center z-30 absolute top-[44vw]"
          >
            {/* Scroll to down button icon */}
            <Link to="#trending">
              <FaAnglesDown
                size={40}
                className="text-secondary-v50 animate-bounce"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
