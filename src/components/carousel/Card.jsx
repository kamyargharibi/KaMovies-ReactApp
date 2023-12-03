import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Genres from "./Genres";
import dayjs from "dayjs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Card = ({ posterUrl, title, date, rating, genreIds }) => {
  return (
    <div className="sm:max-w-[13rem] sm:min-w-[12rem] max-w-[125px] min-w-[125px] h-fit cursor-pointer group">
      {/* Cover image */}
      <div className="w-fit min-w-full sm:h-[312px] h-[188px] min-h-fit top group-hover:brightness-75 duration-200 bg-secondary-g20 dark:bg-primary-g80 rounded-xl">
        <LazyLoadImage
          className="w-fit min-w-full sm:h-[312px] h-[188px] min-h-fit pointer-events-none rounded-xl"
          alt={title}
          effect="blur"
          src={posterUrl}
        />
      </div>
      <div className="bottom relative">
        {/* Circle Progressbar rate */}
        <div className="sm:w-10 w-8 font-bold absolute sm:bottom-[3.5rem] bottom-[3rem] left-3 backdrop-blur-sm bg-white/50 backdrop-brightness-90 rounded-full group-hover:brightness-75">
          <CircularProgressbar
            value={rating}
            maxValue={10}
            text={rating}
            styles={buildStyles({
              pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
              textSize: "34px",
              textColor: "#8b5cf6",
            })}
          />
        </div>
        {/* Genres Component */}
        <div className="absolute bottom-[6rem] right-8 md:right-3 group-hover:brightness-75">
          <Genres data={genreIds} />
        </div>
        {/* Title movie */}
        <div className="mt-4 sm:mt-6">
          <p
            title={title}
            className="font-semibold text-sm sm:text-base text-primary-g80 hover:text-primary-g70 dark:text-secondary-g20 dark:hover:text-secondary-g40 duration-200 truncate"
          >
            {title}
          </p>
        </div>
        {/* Release date movie */}
        <div className="my-1">
          <span className="text-secondary-g40 dark:text-secondary-g50 text-sm sm:text-base">
            {dayjs(date).format("MMM D, YYYY")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
