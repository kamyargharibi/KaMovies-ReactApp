import React from "react";
import useFetch from "../../hooks/useFetch";
import CarouselBox from "../carousel/CarouselBox";
import { useTranslation } from "react-i18next";

const Similar = ({ id, endpoint }) => {
  // Fetch data from url
  const { data, loading } = useFetch(`/${endpoint}/${id}/similar`);

  // Translate text
  const { t, i18n } = useTranslation();

  return (
    <>
      {data?.results?.length > 0 ? (
        <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-5xl sm:max-w-2xl max-w-2xl mt-4">
          {/* Title Slider */}
          <h1 className="text-2xl sm:text-3xl text-primary-g80 dark:text-secondary-g20 font-bold">
            {t("detailsPage.similar")}
          </h1>
          {/* Carousel Component for slider */}
          <CarouselBox
            data={data?.results}
            loading={loading}
            endpoint={endpoint}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Similar;
