import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/carousel/Card";
import { useNavigate, useParams } from "react-router-dom";
import noPoster from "../assets/images/no-poster.jpg";
import { fetchDataFromApi } from "../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/loader/Spinner";
import Select from "react-select";
import useFetch from "../hooks/useFetch";
import { useTranslation } from "react-i18next";
import { MoviesList, TvList } from "../components/navbar/GenresData";
import InfiniteLoader from "../components/loader/InfiniteLoader";

const Explore = () => {
  // Set and save data after fetch data
  const [data, setData] = useState(null);
  // Get current page number for fetch infinite scroll data
  const [pageNum, setPageNum] = useState(1);
  // Get current status loading
  const [loading, setLoading] = useState(false);
  // Current value of genre
  const [genre, setGenre] = useState(null);
  // Current value of sortby
  const [sortby, setSortby] = useState(null);
  // Get url from store
  const { url } = useSelector((state) => state.movie);
  // Get params from current url
  const { mediaType } = useParams();
  // Navigate routes
  const navigate = useNavigate();

  // Get current genres list from { useParams }
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  // Filters object
  let filters = {};

  // Translate texts
  const { t, i18n } = useTranslation();

  // Data for sortby filter
  const sortbyData = [
    { value: "popularity.desc", label: t("sortByData.PopularityDescending") },
    { value: "popularity.asc", label: t("sortByData.PopularityAscending") },
    { value: "vote_average.desc", label: t("sortByData.RatingDescending") },
    { value: "vote_average.asc", label: t("sortByData.RatingAscending") },
    {
      value: "primary_release_date.desc",
      label: t("sortByData.ReleaseDateDescending"),
    },
    {
      value: "primary_release_date.asc",
      label: t("sortByData.ReleaseDateAscending"),
    },
    { value: "original_title.asc", label: t("sortByData.Title") },
  ];

  // Fetch data from api with params
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  // Fetch next page data from api with params
  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setGenre(null);
    setSortby(null);
    fetchInitialData();
  }, [mediaType]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Select component styles
  const colorStyles = {
    control: (styles) => ({
      ...styles,
      color: "#1f2937",
      cursor: "pointer",
      "&:hover": {
        color: "#faf5ff",
      },
    }),
    option: (styles) => ({
      ...styles,
      color: "#1f2937",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#6d28d9",
        color: "#faf5ff",
      },
    }),
  };

  // Handle filters item
  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);

        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };

  const translateGenres = mediaType === "tv" ? TvList : MoviesList;

  return (
    <div className="max-w-7xl w-full mt-16 mx-auto lg:px-10 sm:px-8 px-4">
      {/* Loading component */}
      {loading && <Spinner />}
      {!loading && (
        <>
          {/* Render data */}
          <div className="w-full flex flex-col flex-wrap gap-x-2 items-start justify-between">
            <>
              {mediaType === "tv" ? (
                <h1 className="sm:mt-8 sm:my-2 my-4 text-2xl sm:text-3xl text-primary-g70 dark:text-secondary-g20 font-bold">
                  {t("explore.tvshows")}
                </h1>
              ) : (
                <h1 className="sm:mt-8 sm:my-2 my-4 text-2xl sm:text-3xl text-primary-g70 dark:text-secondary-g20 font-bold">
                  {t("explore.movies")}
                </h1>
              )}
            </>

            <div className="w-full flex flex-row sm:my-8 sm:gap-4 gap-1 mb-6 flex-wrap items-center justify-start">
              {/* Select genres items */}
              <Select
                isMulti
                name="genres"
                value={genre}
                closeMenuOnSelect={false}
                options={
                  i18n.dir() === "ltr" ? genresData?.genres : translateGenres
                }
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                styles={colorStyles}
                onChange={onChange}
                placeholder={t("explore.placeholder")}
                className="md:max-w-xs max-w-[70%] min-w-fit w-full text-primary-g80 hover:text-primary-g70 duration-200  sm:mb-0 mb-2"
              />
              {/* Select sort by items */}
              <Select
                name="sortby"
                value={sortby}
                options={sortbyData}
                styles={colorStyles}
                onChange={onChange}
                isClearable={false}
                placeholder={t("sortByData.Placeholder")}
                className="md:max-w-xs max-w-[70%] min-w-[210px] w-full text-primary-g80 hover:text-primary-g70 duration-200 sm:mb-0 mb-4"
              />
            </div>
          </div>
          <div className="w-full mx-auto flex items-center justify-between flex-wrap md:gap-y-10 sm:gap-y-7 gap-y-4">
            {data?.results?.length > 0 ? (
              <div className="w-full mx-auto">
                {/* Infinite scroll component */}
                <InfiniteScroll
                  className="flex items-start justify-between gap-x-2 flex-wrap md:gap-y-10 sm:gap-y-7 gap-y-4"
                  dataLength={data?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data.total_pages}
                  loader={
                    // Loader component
                    <div className="w-full mt-2 mb-8 mx-auto">
                      <InfiniteLoader />
                    </div>
                  }
                >
                  {data?.results?.map((item, index) => {
                    // image cover url
                    const posterUrl = item.poster_path
                      ? url.poster + item.poster_path
                      : noPoster;

                    if (item.media_type === "person") return;
                    return (
                      <div
                        key={item.id}
                        onClick={() => navigate(`/${mediaType}/${item.id}`)}
                      >
                        {/* Card component */}
                        <Card
                          key={index}
                          posterUrl={posterUrl}
                          title={
                            mediaType === "tv"
                              ? item.name || item.original_name
                              : item.title || item.name || item.original_name
                          }
                          date={
                            mediaType === "movie"
                              ? item.release_date
                              : item.first_air_date
                          }
                          rating={item.vote_average.toFixed(1)}
                          genreIds={item.genre_ids.slice(0, 2)}
                        />
                      </div>
                    );
                  })}
                </InfiniteScroll>
              </div>
            ) : (
              <div className="!flex items-center justify-center">
                {/* Error message */}
                <span className="text-xl !text-center my-10 font-semibold text-secondary-g30">
                  {t("searchPage.notFound")}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Explore;
