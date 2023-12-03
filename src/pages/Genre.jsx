import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/loader/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { fetchDataFromApi } from "../utils/api";
import Card from "../components/carousel/Card";
import noPoster from "../assets/images/no-poster.jpg";
import { useTranslation } from "react-i18next";
import useFetch from "../hooks/useFetch";
import { MoviesList, TvList } from "../components/navbar/GenresData";
import InfiniteLoader from "../components/loader/InfiniteLoader";

const Genre = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { url } = useSelector((state) => state.movie);
  const { mediaType, id } = useParams();
  const navigate = useNavigate();

  // Get current genres list from { useParams }
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  // i18n Translation
  const { t, i18n } = useTranslation();

  // Filter on english genres from defualt data
  const filterGenres = genresData?.genres?.filter((i) => i.id == id);

  // Filter on farsi genres from data
  const filterGenresFa =
    mediaType === "tv"
      ? TvList.filter((i) => i.id == id)
      : MoviesList.filter((i) => i.id == id);

  // Fetch data from api with params
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(
      `/discover/${mediaType}?sort_by=popularity.desc&with_genres=${id}`
    ).then((res) => {
      setData(res);
      console.log(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  // Fetch next page data from api with params
  const fetchNextPageData = () => {
    fetchDataFromApi(
      `/discover/${mediaType}?sort_by=popularity.desc&page=${pageNum}&with_genres=${id}`
    ).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    fetchInitialData();
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [mediaType, id]);

  return (
    <div className="max-w-7xl w-full mt-16 mx-auto lg:px-10 sm:px-8 px-4">
      {loading && <Spinner />}
      {!loading && (
        <>
          <div className="flex flex-wrap gap-x-2 items-center justify-between">
            {i18n.dir() === "ltr" ? (
              <>
                <div>
                  {filterGenres?.map((title) => (
                    <h1 className="my-8 text-xl sm:text-3xl text-primary-g70 dark:text-white font-bold">
                      {title.name}
                    </h1>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div>
                  {filterGenresFa?.map((title) => (
                    <h1 className="my-8 text-xl sm:text-3xl text-primary-g70 dark:text-white font-bold">
                      {title.name}
                    </h1>
                  ))}
                </div>
              </>
            )}
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
                    // Image cover url
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
                          title={item.title || item.original_name}
                          date={item.release_date}
                          rating={item.vote_average.toFixed(1)}
                          genreIds={item.genre_ids.slice(0, 2)}
                        />
                      </div>
                    );
                  })}
                </InfiniteScroll>
              </div>
            ) : (
              <span className="text-xl font-semibold text-primary-g80 dark:text-secondary-g20">
                {t("searchPage.notFound")}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Genre;
