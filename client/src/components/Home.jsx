import "../styles/Home.sass";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
function Home() {
	const initWatchlist = () => {
		if (!localStorage.getItem("watchlistMovies")) return [];
    const watchlistStorage = JSON.parse(
      localStorage.getItem("watchlistMovies")
    );
    return watchlistStorage;
	}

  const [topMovies, setTopMovies] = useState([]);
	const [watchlistItems, setWatchlistItems] = useState(initWatchlist());
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://moviesdatabase.p.rapidapi.com/titles/?sort=pos.incr&list=top_rated_250&limit=50",
      headers: {
        "X-RapidAPI-Key": "f47abe3ee4msh40e9ceafbcb077dp1c2cd1jsn0109b5372666",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };
    const getMovies = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setTopMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    getMovies();
  }, []);

	useEffect(() => {
    localStorage.setItem("watchlistMovies", JSON.stringify(watchlistItems));
    console.log(watchlistItems);
  }, [watchlistItems]);

  function postMovieToWatchlist(movie) {
    if (!watchlistItems.find((item) => item.id === movie.id))
      setWatchlistItems([...watchlistItems, movie]);
    else alert("This title is already in your watchlist");
  }

  return (
    <div className="container flex flex-col justify-center items-center">
      <Navbar />
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-4xl py-4">Top 100 movies by IMDb</h1>
        <div className="list w-full">
          <ul className="flex flex-col items-center justify-center">
            {topMovies.map((movie) => {
              return (
                <li
                  className="w-3/4 flex py-2 pl-4 even:bg-gray-200 odd:bg-gray-300"
                  key={movie.id || movie._id}
                >
                  <img
                    className="w-48 h-72 cursor-pointer"
                    src={movie.primaryImage.url ? movie.primaryImage.url : '/default-movie.jpg'}
                    alt="Failed to load"
                    onError={(e) => {
                      e.target.src = "/default-movie.jpg";
                    }}
                    onClick={() => navigate("/movies/" + movie.id)}
                  />
                  <div className="p-2 pl-6 flex flex-col justify-around">
                    <h1
                      className="text-3xl hover:underline cursor-pointer"
                      onClick={() => navigate("/movies/" + movie.id)}
                    >
                      {movie.titleText.text}
                    </h1>
                    <p className="text-xl text-slate-500">
                      {movie.releaseYear.year}
                    </p>
                    <div className="flex items-center">
                      <h2 className="text-2xl">
                        №{movie.position || topMovies.indexOf(movie)}
                      </h2>
                    </div>
                    <button
                      className=" hover:bg-white border z-10 border-solid border-black border-1 self-start h-8 w-40 rounded"
                      onClick={(e) => postMovieToWatchlist(movie)}
                    >
                      To watchlist
                    </button>
                    <p className="text-l">{movie.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
