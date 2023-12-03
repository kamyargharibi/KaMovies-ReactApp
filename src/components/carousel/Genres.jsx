import React from "react";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  // Get data from store
  const { genres } = useSelector((state) => state.movie);

  return (
    <div className="hidden sm:flex flex-col justify-end gap-1">
      {/* Get & render genres data from store */}
      {data?.map((g) => {
        if (!genres[g]?.name) return;
        return (
          <span
            key={g}
            className="text-sm font-semibold text-center text-secondary-v60 px-1 rounded-md backdrop-blur-sm bg-white/70 backdrop-brightness-90"
          >
            {genres[g]?.name}
          </span>
        );
      })}
    </div>
  );
};

export default Genres;
