import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";

function Watchlist() {
  const retrieveWatchlist = () => {
    const watchlistMovies = JSON.parse(localStorage.getItem("watchlistMovies"));
    console.log(watchlistMovies);
    return watchlistMovies;
  };

  const [watchlistItems, setWatchlistItems] = useState(retrieveWatchlist());
  const navigate = useNavigate()

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
                  className="text-xl w-44 h-32 z-20 absolute bg-transparent hover:bg-red-500 cursor-pointer flex items-center justify-center -indent-80 hover:indent-0"
                  onClick={() => removeFromWatchlist(movie)}
                >
                  Remove
                </div>
                <div
                  className="text-xl w-44 h-32 z-0 top-52 absolute bg-transparent hover:bg-gray-500/80 cursor-pointer flex items-center justify-center -indent-80 hover:indent-0"
                  onClick={() => navigate('/movies/'+movie.id)}
                >
                  View
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
