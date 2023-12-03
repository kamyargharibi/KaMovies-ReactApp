import { useSelector } from "react-redux";
import Card from "./Card";
import noPoster from "../../assets/images/no-poster.jpg";
import { FreeMode, Navigation } from "swiper/modules";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import SkeletonLoader from "./SkeletonLoader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CarouselBox = ({ data, loading, endpoint }) => {
  // Get url for fetch data
  const { url } = useSelector((state) => state.movie);
  // Nagiate routes
  const navigate = useNavigate();
  // Translate texts
  const { t, i18n } = useTranslation();

  return (
    <div className="max-w-full w-full flex items-center mx-auto sm:mt-6 mt-4 px-0 overflow-hidden">
      {!loading ? (
        // Swiper component
        <Swiper
          dir={i18n.dir() === "ltr" ? "ltr" : "rtl"}
          modules={[Navigation, FreeMode]}
          spaceBetween={40}
          slidesPerView={3}
          slidesPerGroup={2}
          freeMode={true}
          loop={true}
          // Set classes for custom next & prev buttons
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          // Responsive caruosel for all screen size
          breakpoints={{
            480: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 50,
            },
            640: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: -10,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 10,
              freeMode: false,
              loop: false,
            },
            1200: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 30,
              freeMode: false,
              loop: false,
            },
            1280: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 20,
              freeMode: false,
              loop: false,
            },
          }}
          className="mySwiper relative max-w-full w-full"
        >
          {/* Prev button for slider */}
          <BsArrowLeft
            size={20}
            className="prev hidden lg:block w-10 h-10 z-50 absolute top-40 left-4 rtl:left-9 text-secondary-v60 hover:text-white border border-secondary-v50 rounded-full p-1 backdrop-blur-sm bg-secondary-v50/10 hover:bg-secondary-v50/50 backdrop-brightness-90 cursor-pointer duration-300"
          />
          {/* Render data from parameter (data) */}
          {data?.map((item) => {
            const posterUrl = item.poster_path
              ? url.poster + item.poster_path
              : noPoster;
            return (
              // Slide component for swiper
              <SwiperSlide
                className="lg:!me-5 md:!me-4 sm:!me-5 !me-12"
                key={item.id}
              >
                {/* Card component & Navigate route */}
                <div
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <Card
                    posterUrl={posterUrl}
                    title={item.title || item.original_name || "Invalid name"}
                    date={item.release_date}
                    rating={item.vote_average.toFixed(1)}
                    genreIds={item.genre_ids.slice(0, 2)}
                  />
                </div>
              </SwiperSlide>
            );
          })}
          {/* Previus button for slider */}
          <BsArrowRight
            size={20}
            className="next hidden lg:block w-10 h-10 z-50 absolute top-40 right-7 text-secondary-v60 hover:text-white border border-secondary-v50 rounded-full p-1 backdrop-blur-sm bg-secondary-v50/10 hover:bg-secondary-v50/50 backdrop-brightness-90 cursor-pointer duration-300"
          />
        </Swiper>
      ) : (
        <>
          {/* Skeleton Loader Component for loading before fetch data */}
          <div className="lg:flex items-center justify-center hidden">
            {/* Skeleton Loader for large screen */}
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
          <div className="md:flex flex items-center justify-center lg:hidden">
            {/* Skeleton Loader for Medium screen */}
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
          <div className="sm:hidden flex items-center justify-center">
            {/* Skeleton Loader for Small screen */}
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        </>
      )}
    </div>
  );
};

export default CarouselBox;
