import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";

function Watchlist() {
  const retrieveWatchlist = () => {
    const watchlistMovies = JSON.parse(localStorage.getItem("watchlistMovies"));
    console.log(watchlistMovies);
    return watchlistMovies;
  };

  const [watchlistItems, setWatchlistItems] = useState(retrieveWatchlist());

  useEffect(() => {
    console.log(watchlistItems, 1);
    localStorage.setItem("watchlistMovies", JSON.stringify(watchlistItems));
  }, [watchlistItems]);

  function removeFromWatchlist(movie) {
    setWatchlistItems((oldList) =>
      oldList.filter((item) => item.id !== movie.id)
    );
  }

  return (
    <>
      <Navbar />
      <div className="m-5 w-full h-full">
        <ul className="w-full flex flex-row flex-wrap">
          {watchlistItems.map((movie) => (
            <li key={movie.id} className="flex flex-col mx-4">
              <div>
                <div
                  className="w-44 h-64 z-20 absolute bg-transparent hover:bg-gray-500/80 cursor-pointer flex items-center justify-center"
                  onClick={() => removeFromWatchlist(movie)}
                >
                  <p className="text-red-600 invisible hover:visible">Remove</p>
                </div>
                <img
                  className="w-44 h-64"
                  src={movie.primaryImage.url}
                  alt="No image"
                  // onError={(e) => {
                  //   e.target.src = "/default-movie.jpg";
                  // }}
                />
              </div>
              <p className="truncate w-44">{movie.titleText.text}</p>
              <p>{movie.releaseYear.year}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Watchlist;
