import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import Card from "../components/carousel/Card";
import { useSelector } from "react-redux";
import noPoster from "../assets/images/no-poster.jpg";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/loader/Spinner";
import { useTranslation } from "react-i18next";
import InfiniteLoader from "../components/loader/InfiniteLoader";

const Search = () => {
  // Save data after fetching
  const [data, setData] = useState(null);
  // Current page number for fetch next page data
  const [pageNum, setPageNum] = useState(1);
  // Set Current status of loading
  const [loading, setLoading] = useState(false);
  // Get Current address location
  const { query } = useParams();
  // Url from api
  const { url } = useSelector((state) => state.movie);
  // Navigate routes
  const navigate = useNavigate();

  // Fetch data from api
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  // Fetch next page data from api
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
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
    // Render & reRender
    fetchInitialData();
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [query]);

  const { t, i18n } = useTranslation();

  const results = t("searchPage.results");
  const result = t("searchPage.result");

  return (
    <div className="max-w-7xl w-full mt-16 mx-auto mb-14 lg:px-10 sm:px-8 px-4">
      <h1 className="my-8 text-2xl sm:text-3xl overflow-hidden text-primary-g80 dark:text-secondary-g20 font-semibold">
        {`${t("searchPage.search")} ${
          data?.results?.total_results > 1 ? results : result
        } ${t("searchPage.of")} '${query}'`}
      </h1>
      <div className="w-full mx-auto flex items-center justify-evenly flex-wrap md:gap-y-10 sm:gap-y-7 gap-y-4">
        {/* Render data after loading and fetching with infinite scroll */}
        {!loading ? (
          <>
            {data?.results?.length > 0 ? (
              <div className="w-full mx-auto">
                <InfiniteScroll
                  className="flex items-center justify-between flex-wrap md:gap-y-10 sm:gap-y-7 gap-y-4"
                  dataLength={data?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data?.total_pages}
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
                        key={index}
                        onClick={() =>
                          navigate(`/${item.media_type}/${item.id}`)
                        }
                      >
                        {/* Card component */}
                        <Card
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
              <>
                {/* Error message */}
                <span className="text-xl font-semibold text-primary-g70 dark:text-secondary-g30">
                  {t("searchPage.notFound")}
                </span>
              </>
            )}
          </>
        ) : (
          // Loader component
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Search;
