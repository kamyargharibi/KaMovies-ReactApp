import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import DetailsBanner from "../components/details/DetailsBanner";
import TopCast from "../components/details/TopCast";
import Spinner from "../components/loader/Spinner";
import Similar from "../components/details/Similar";

const Details = () => {
  // Get params from current url
  const { mediaType, id } = useParams();
  // Fetch data for viedos link with url
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  // Fetch data for actors data with url
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [loading]);

  return (
    <div className="max-w-7xl w-full mt-16 lg:px-10 sm:px-8 md:my-20 px-4 mx-auto">
      {loading ? (
        <>
          {/* Loader component */}
          <Spinner />
        </>
      ) : (
        <>
          {/* Details banner component */}
          <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
          {/* Top casts component */}
          <TopCast cast={credits?.cast} loading={creditsLoading} />
          {/* Similar movies component */}
          <Similar id={id} endpoint={mediaType} />
        </>
      )}
    </div>
  );
};

export default Details;
