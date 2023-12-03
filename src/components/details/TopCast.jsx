import React from "react";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import avatar from "../../assets/images/avatar.png";
import { useTranslation } from "react-i18next";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

const TopCast = ({ cast, loading }) => {
  // Get url for fetch data
  const { url } = useSelector((state) => state.movie);
  // Translate texts
  const { t, i18n } = useTranslation();

  return (
    <>
      {cast?.length > 0 ? (
        <>
          <div className="md:mt-10 mt-4">
            <h1 className="text-2xl my-4 sm:text-3xl text-primary-g80 dark:text-secondary-g20 font-bold">
              {t("detailsPage.topcast")}
            </h1>
            {cast.length > 3 ? (
              <>
                {/* Render data after loading & fetching */}
                {!loading && (
                  <div className="w-full mx-auto pt-2 flex items-start lg:gap-10 md:gap-8 sm:gap-5 gap-1 overflow-hidden cursor-pointer">
                    {/* Swiper component */}
                    <Swiper
                      dir={i18n.dir() === "ltr" ? "ltr" : "rtl"}
                      modules={[Navigation, FreeMode]}
                      spaceBetween={50}
                      slidesPerView={3}
                      slidesPerGroup={3}
                      freeMode={true}
                      loop={true}
                      // Responsive caruosel for all screen size
                      breakpoints={{
                        480: {
                          slidesPerView: 5,
                          slidesPerGroup: 5,
                          spaceBetween: 50,
                        },
                        640: {
                          slidesPerView: 4,
                          slidesPerGroup: 4,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 4,
                          slidesPerGroup: 4,
                          spaceBetween: 10,
                          loop: true,
                        },
                        1024: {
                          slidesPerView: 5,
                          slidesPerGroup: 5,
                          spaceBetween: 10,
                          loop: true,
                        },
                        1200: {
                          slidesPerView: 5,
                          slidesPerGroup: 5,
                          spaceBetween: 30,
                          loop: true,
                        },
                        1280: {
                          slidesPerView: 6,
                          slidesPerGroup: 6,
                          spaceBetween: 10,
                          loop: true,
                        },
                      }}
                      className="mySwiper relative max-w-full w-full"
                    >
                      {/* Render & map on data from parameter (cast) */}
                      {cast?.map((item) => {
                        // Image url actor profile
                        const profileImg = item.profile_path
                          ? url.backdrop + item.profile_path
                          : avatar;

                        return (
                          // Swiper Slide component
                          <SwiperSlide
                            className="lg:!me-2 sm:!me-2 !me-12"
                            key={item.id}
                          >
                            <div
                              key={item.id}
                              className="max-w-[100px] p-2 rounded-full min-w-fit w-full flex flex-col gap-1 items-center"
                            >
                              {/* Cover image */}
                              <div className="lg:w-40 lg:h-40 md:w-36 md:h-36 sm:w-32 sm:h-32 w-20 h-20 bg-secondary-g20 dark:bg-primary-g80 rounded-full p-0">
                                <LazyLoadImage
                                  className="lg:w-40 lg:h-40 md:w-36 md:h-36 sm:w-32 sm:h-32 w-20 h-20 object-cover rounded-full shadow-[0px_0px_10px_0px_#718096]"
                                  alt={"profile"}
                                  effect="blur"
                                  src={profileImg}
                                />
                              </div>
                              {/* Actor name */}
                              <span
                                key={item.id}
                                className="max-w-[100px] sm:w-full min-w-[80px] text-center text-primary-g80 dark:text-secondary-g20 md:text-lg text-sm font-semibold"
                              >
                                {item.name}
                              </span>
                              {/* Character name */}
                              <span
                                key={item.id}
                                className="max-w-[100px] sm:w-full min-w-[80px] !overflow-hidden text-center text-secondary-g50 md:text-lg text-sm"
                              >
                                {item.character}
                              </span>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex lg:!me-2 sm:!me-2 !me-12">
                  {/* Render & map on data from parameter (cast) */}
                  {cast?.map((item) => {
                    // Image url actor profile
                    const profileImg = item.profile_path
                      ? url.backdrop + item.profile_path
                      : avatar;

                    return (
                      <div
                        key={item.id}
                        className="max-w-[100px] p-2 rounded-full min-w-fit w-full flex flex-col gap-1 items-center"
                      >
                        {/* Cover image */}
                        <div className="lg:w-40 lg:h-40 md:w-36 md:h-36 sm:w-32 sm:h-32 w-20 h-20 bg-secondary-g20 dark:bg-primary-g80 rounded-full p-0">
                          <LazyLoadImage
                            className="lg:w-40 lg:h-40 md:w-36 md:h-36 sm:w-32 sm:h-32 w-20 h-20 object-cover rounded-full shadow-[0px_0px_10px_0px_#718096]"
                            alt={"profile"}
                            effect="blur"
                            src={profileImg}
                          />
                        </div>
                        {/* Actor name */}
                        <span
                          key={item.id}
                          className="max-w-[100px] sm:w-full min-w-[00px] text-center text-primary-g80 dark:text-secondary-g20 md:text-lg text-sm font-semibold"
                        >
                          {item.name}
                        </span>
                        {/* Character name */}
                        <span
                          key={item.id}
                          className="max-w-[100px] sm:w-full min-w-[80px] !overflow-hidden text-center text-secondary-g50 md:text-lg text-sm"
                        >
                          {item.character}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TopCast;
