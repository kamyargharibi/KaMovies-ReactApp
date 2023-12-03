import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import CarouselBox from "../carousel/CarouselBox";
import { useTranslation } from "react-i18next";

const Trending = () => {
  // Current endpoint
  const [endpoint, setEndpoint] = useState("day");
  // Fetch data with url
  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);
  // Translate Texts
  const { t, i18n } = useTranslation();

  return (
    <div
      id="trending"
      className="xl:max-w-7xl lg:max-w-5xl md:max-w-5xl sm:max-w-2xl max-w-lg -mt-1.5 mx-auto md:px-5 sm:px-10"
    >
      {/* Slider title */}
      <h1 className="text-2xl sm:text-3xl text-primary-g80 font-bold dark:text-white">
        {t("homeTitle.trending")}
      </h1>
      {/* Carousel Slider Component */}
      <CarouselBox data={data?.results} loading={loading} endpoint={"movie"} />
    </div>
  );
};

export default Trending;
