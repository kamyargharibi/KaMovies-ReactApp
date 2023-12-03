import React from "react";

const AllGenres = ({ data }) => {
  return (
    <>
      {data?.map((g) => {
        return (
          <span
            key={g.id}
            className="bg-secondary-v60 text-sm text-white rounded-md px-2 py-0.5"
          >
            {g.name}
          </span>
        );
      })}
    </>
  );
};

export default AllGenres;
