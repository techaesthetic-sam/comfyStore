import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

export default function PaginationContainer() {
  const { meta } = useLoaderData();
  const {
    pagination: { page, pageCount },
  } = meta;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  //console.log(new URLSearchParams(search));
  const navigate = useNavigate();
  function handlePageChange(pageNumber) {
    const searchParams = new URLSearchParams(search);

    searchParams.set("page", pageNumber); //to read

    navigate(`${pathname}?${searchParams.toString()}`);
  }
  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {pages.map((pageNumber) => {
          // console.log(pageNumber);
          return (
            <button
              onClick={() => handlePageChange(pageNumber)}
              key={pageNumber}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? "bg-base-300 border-base-300" : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
