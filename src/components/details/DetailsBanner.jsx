import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import NoPoster from "../../assets/images/no-poster.jpg";
import dayjs from "dayjs";
import AllGenres from "./AllGenres";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import TrailerPopup from "./TrailerPopup";
import { FaPlayCircle } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { IoLanguage } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import { BsPersonFill, BsCalendar2Date } from "react-icons/bs";
import { AiFillExclamationCircle } from "react-icons/ai";
import { GiFilmStrip } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const DetailsBanner = ({ video, crew }) => {
  // Get url api
  const { url } = useSelector((state) => state.movie);
  // Current location
  const { mediaType, id } = useParams();
  // Fetch data from api
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  // Handle popup trailer videos
  const [show, setShow] = useState(false);
  // Set video codes for url
  const [videoId, setVideoId] = useState(null);

  // Poster image url
  const poster = url.backdrop + data?.poster_path;
  // Rate value
  const rating = data?.vote_average.toFixed(1);
  // Filter of array for director job
  const director = crew?.filter((f) => f.job === "Director");
  // Filter of array for writers job
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  // Runtime value convert to hour & minutes
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const { t, i18n } = useTranslation();

  return (
    <div>
      {!loading && (
        <div className="w-full flex md:flex-row flex-col items-start justify-between lg:gap-14 md:gap-10">
          {/* Poster image */}
          <div className="md:max-w-sm w-full hover:brightness-90 duration-200 md:mb-0 mb-4">
            {data?.poster_path ? (
              <>
                <div className="max-w-full lg:h-[30vh] w-[70vh] md:h-[40vh] mx-auto max-h-full sm:h-[calc(65vh-50px)] h-[70vh] bg-secondary-g20 dark:bg-primary-g80 rounded-xl">
                  <LazyLoadImage
                    className="max-w-full min-w-[300px] w-[70vh] sm:h-full h-[70vh] pointer-events-none rounded-xl shadow-[rgba(17,_17,_26,_5)_0px_0px_16px] dark:shadow-[0px_0px_16px_#718096]"
                    alt={"poster"}
                    effect="blur"
                    src={poster}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="max-w-full w-[70vh] mx-auto max-h-full sm:h-[calc(65vh-50px)] h-[calc(80vh-50px)] bg-secondary-g20 dark:bg-primary-g80 rounded-xl">
                  <LazyLoadImage
                    className="max-w-full min-w-[300px] w-[70vh] sm:h-full h-[calc(80vh-50px)] pointer-events-none rounded-xl shadow-[rgba(17,_17,_26,_5)_0px_0px_16px] dark:shadow-[0px_0px_16px_#718096]"
                    alt={"poster"}
                    effect="blur"
                    src={NoPoster}
                  />
                </div>
              </>
            )}
          </div>
          {/* Information about movie */}
          <div className="w-full">
            {/* Title movie */}
            <div className="flex flex-col gap-3">
              <h2 className="md:mt-0 mt-5 text-primary-g80 dark:text-secondary-g20 sm:text-4xl text-3xl font-semibold">
                {data?.name || data?.title}{" "}
                {data?.release_date.length > 1 ? (
                  <>({dayjs(data?.release_date).format("YYYY")})</>
                ) : (
                  <></>
                )}
              </h2>
              <span className="text-secondary-g50 md:text-2xl text-lg italic">
                {data?.tagline}
              </span>
            </div>
            {/* All genres component */}
            <div className="flex items-center flex-wrap gap-1 my-4">
              <AllGenres data={data?.genres} />
            </div>
            {/* Circle rate & Trailer button */}
            <div className="flex items-center my-6">
              {/* Circle rate */}
              <div className="md:w-[4.5rem] w-11 font-bold  bg-transparent">
                <CircularProgressbar
                  value={rating}
                  maxValue={10}
                  text={rating}
                  styles={buildStyles({
                    pathColor:
                      rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                    textSize: "34px",
                    textColor: "#8b5cf6",
                    trailColor: "#808080",
                  })}
                />
              </div>
              {/* Watch trailer button */}
              <div
                onClick={() => {
                  setShow(true);
                  setVideoId(video.key);
                }}
              >
                <div className="flex items-center gap-4 group cursor-pointer">
                  <FaPlayCircle className="md:text-7xl text-5xl ms-4 text-primary-g80 dark:text-secondary-g20 group-hover:bg-secondary-v60 group-hover:shadow-[0px_0px_10px_5px_#9f7aea] p-0 cursor-pointer duration-300 rounded-full" />
                  <span className="text-2xl text-primary-g80 dark:text-secondary-g20 group-hover:text-secondary-v60 duration-300">
                    {t("detailsPage.watchTrailer")}
                  </span>
                </div>
                {/* Trailer popup component */}
                <TrailerPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </div>
            </div>
            {/* Overview movie */}
            <div className="max-w-xl w-full my-3">
              <h3 className="md:text-3xl sm:text-2xl text-xl font-semibold text-primary-g80 dark:text-secondary-g20">
                {t("detailsPage.overview")}
              </h3>
              <p className="text-secondary-g60 dark:text-secondary-g50 sm:text-base text-sm my-1">
                {data?.overview}
              </p>
            </div>
            {/* Info about language */}
            <div className="flex items-center gap-2 py-3 border-b border-secondary-g20 dark:border-secondary-g60/50">
              <span className="flex items-center gap-1 font-semibold sm:text-lg text-base text-primary-g80 dark:text-secondary-g20">
                <IoLanguage size={20} /> {t("detailsPage.language")}
              </span>
              <div className="flex items-center flex-wrap gap-1">
                <p className="sm:text-lg text-base text-secondary-g50">
                  {data?.original_language === "en" ? (
                    "English"
                  ) : (
                    <>{data?.original_language}</>
                  )}
                </p>
              </div>
            </div>
            {/* Info about production countries */}
            <div className="flex items-center flex-wrap gap-2 py-3 border-b border-secondary-g20 dark:border-secondary-g60/50">
              <span className="flex items-center gap-1 font-semibold sm:text-lg text-base text-primary-g80 dark:text-secondary-g20">
                <BiWorld size={20} /> {t("detailsPage.production")}
              </span>
              <div className="flex items-center flex-wrap gap-1">
                {data?.production_countries?.length > 0 ? (
                  <>
                    {data?.production_countries?.map((item, i) => {
                      return (
                        <p
                          key={i}
                          className="sm:text-lg text-base text-secondary-g50"
                        >
                          {item.name}
                          {item.length - 1 !== i && ", "}
                        </p>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <p className="sm:text-lg text-base text-secondary-g50">
                      {t("detailsPage.NotAvailable")}
                    </p>
                  </>
                )}
              </div>
            </div>
            {/* Info about director */}
            <div className="flex items-center gap-2 py-3 border-b border-secondary-g20 dark:border-secondary-g60/50">
              <span className="flex items-center gap-1 font-semibold sm:text-lg text-base text-primary-g80 dark:text-secondary-g20">
                <BsPersonFill size={20} /> {t("detailsPage.director")}
              </span>
              {director?.length > 0 ? (
                <>
                  {director?.map((item) => {
                    return (
                      <p
                        key={item.id}
                        className="sm:text-lg text-base text-secondary-g50"
                      >
                        {item.name}
                      </p>
                    );
                  })}
                </>
              ) : (
                <>
                  <p className="sm:text-lg text-base text-secondary-g50">
                    {t("detailsPage.NotAvailable")}
                  </p>
                </>
              )}
            </div>
            {/* Info about writers */}
            <div className="flex items-center gap-2 py-3 border-b border-secondary-g20 dark:border-secondary-g60/50">
              <span className="flex items-center gap-1 font-semibold sm:text-lg text-base text-primary-g80 dark:text-secondary-g20">
                <HiUserGroup size={20} /> {t("detailsPage.writer")}
              </span>
              <div className="flex items-center flex-wrap gap-1">
                {writer?.length > 0 ? (
                  <>
                    {writer?.map((item, i) => {
                      return (
                        <p
                          key={i}
                          className="sm:text-lg text-base text-secondary-g50"
                        >
                          {item.name}
                          {writer.length - 1 !== i && ", "}
                        </p>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <p className="sm:text-lg text-base text-secondary-g50">
                      {t("detailsPage.NotAvailable")}
                    </p>
                  </>
                )}
              </div>
            </div>
            {/* Info about status & release date & runtime movie */}
            <div className="flex items-start flex-wrap lg:gap-16 md:gap-6 sm:gap-10 gap-6 py-3 border-b border-secondary-g20 dark:border-secondary-g60/50">
              {/* Status data */}
              {data?.status && (
                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-1 font-semibold sm:text-lg text-base text-primary-g80 dark:text-secondary-g20">
                    <AiFillExclamationCircle /> {t("detailsPage.status")}
                  </span>
                  <span className="sm:text-lg text-base text-secondary-g50">
                    {data?.status}
                  </span>
                </div>
              )}
              {/* Release date data */}
              {data?.release_date && (
                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-1 font-semibold sm:text-lg text-base text-primary-g80 dark:text-secondary-g20">
                    <BsCalendar2Date /> {t("detailsPage.releaseDate")}
                  </span>
                  <span className="sm:text-lg text-base text-secondary-g50">
                    {dayjs(data?.release_date).format("MMM D, YYYY")}
                  </span>
                </div>
              )}
              {/* Runtime movie data */}
              {data?.runtime && (
                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-1 font-semibold sm:text-lg text-base text-primary-g80 dark:text-secondary-g20">
                    <GiFilmStrip /> {t("detailsPage.runtime")}
                  </span>
                  <span className="sm:text-lg text-base text-secondary-g50">
                    {toHoursAndMinutes(data?.runtime)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
