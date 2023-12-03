import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import CarouselBox from "../carousel/CarouselBox";
import { useTranslation } from "react-i18next";

const TopRated = () => {
  // Current endpoint
  const [endpoint, setEndpoint] = useState("movie");
  // Fetch data with url
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);
  // Translate Texts
  const { t, i18n } = useTranslation();

  return (
    <div className="xl:max-w-7xl lg:max-w-5xl md:max-w-5xl sm:max-w-2xl max-w-lg mt-8 mx-auto md:px-5 sm:px-10">
      {/* Slider title */}
      <h1 className="text-2xl sm:text-3xl text-primary-g80 font-bold dark:text-white">
        {t("homeTitle.toprated")}
      </h1>
      {/* Carousel Slider Component */}
      <CarouselBox data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default TopRated;
