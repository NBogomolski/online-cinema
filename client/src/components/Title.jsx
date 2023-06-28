import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

function Title() {
  const { id: movieId } = useParams();
  const [movieCustomInfo, setMovieCustomInfo] = useState({});
  const [isInWatchlist, setIsInWatchlist] = useState(checkIfInWatchlist())

  function checkIfInWatchlist() {
    const watchlistMovies = JSON.parse(localStorage.getItem('watchlistMovies'))
    if (!watchlistMovies || watchlistMovies.length === 0) return false
    if (watchlistMovies.find(item => item.id === movieId)) return true
    return false
  }

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://moviesdatabase.p.rapidapi.com/titles/" + movieId,
      params: {
        info: "custom_info",
      },
      headers: {
        "X-RapidAPI-Key": "f47abe3ee4msh40e9ceafbcb077dp1c2cd1jsn0109b5372666",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };
    const getTitleData = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setMovieCustomInfo(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    getTitleData();
  }, []);

  function postMovieToWatchlist(movie) {
    const watchlistItems = JSON.parse(localStorage.getItem('watchlistMovies'))
    const addedMovie = {
      id: movie.id,
      primaryImage: { ...movie.primaryImage },
      releaseYear: { ...movie.releaseYear },
      titleText: {...movie.titleText}
    }
    if (!watchlistItems.find((item) => item.id === movie.id)) {
      watchlistItems.push(addedMovie);
      localStorage.setItem('watchlistMovies', JSON.stringify(watchlistItems))
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Navbar />
      <div className="w-9/12 flex flex-col justify-center items-center bg-slate-300 max-h-max">
        <h1 className="text-5xl py-6 text-center flex flex-row font-semibold">
          {movieCustomInfo?.titleText?.text}
          <div
            className="ml-2 cursor-pointer"
            onClick={() => {
              setIsInWatchlist(true);
              postMovieToWatchlist(movieCustomInfo);
            }}
          >
            {isInWatchlist ? (
              <svg
                xlinkTitle="In watchlist"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
              </svg>
            )}
          </div>
        </h1>
        <div className="w-3/6 flex flex-wrap flex-row justify-between items-center border-2 rounded-lg border-black p-1 bg-white">
          <div className="text-2xl ml-2">
            {isNaN(Math.ceil(movieCustomInfo?.runtime?.seconds / 60))
              ? ""
              : Math.ceil(movieCustomInfo?.runtime?.seconds / 60) + " minutes"}
          </div>
          <div className="text-2xl">
            {movieCustomInfo?.releaseYear?.year ||
              movieCustomInfo?.releaseDate?.year}
          </div>
          <div className="text-2xl mr-2 flex flex-row items-center">
            №{movieCustomInfo?.meterRanking?.currentRank}
            {movieCustomInfo?.meterRanking?.rankChange && (
              <div className="flex flex-row items-center px-2">
                (
                {movieCustomInfo.meterRanking.rankChange.changeDirection ==
                "UP" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"
                  >
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"
                  >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                )}
                {movieCustomInfo.meterRanking.rankChange.difference})
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row h-96 w-fit justify-center align-center my-4 flex-wrap max-h-fit">
          <img
            className="w-64 cursor-pointer mr-2 mb-2"
            src={movieCustomInfo?.primaryImage?.url ?? new Error()}
            alt="Failed to load"
            onError={(e) => {
              e.target.src = "/default-movie.jpg";
            }}
          />
          <div>
            {movieCustomInfo.trailer && (
              <iframe
                width="685"
                height="1080"
                className="h-96"
                src={movieCustomInfo?.trailer}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
        <div className="text-3xl pb-4 font-semibold">Main cast</div>
        <div className="flex flex-row w-10/12">
          <ul className="w-3/6 flex flex-col justify-around p-4 w-max">
            {movieCustomInfo?.genres?.genres?.map((genre) => {
              return (
                <li
                  key={genre.id}
                  className="bg-slate-600 text-white px-3 py-1 rounded-lg my-1"
                >
                  {genre.text}
                </li>
              );
            })}
          </ul>
          <div className="ml-6 flex flex-row w-auto justify-between items-start flex-grow flex-wrap">
            {movieCustomInfo?.principalCast?.at(0)?.credits.map((actor) => {
              return (
                <div className="flex flex-col items-center" key={actor.name.id}>
                  <img
                    className="min-h-36 min-w-28 h-36 w-28 cursor-pointer"
                    src={actor?.name?.primaryImage?.url ?? new Error()}
                    alt="No image"
                    onError={(e) => {
                      e.target.src = "/default-actor.jpg";
                    }}
                    onClick={() => {
                      let a = document.createElement("a");
                      a.href = "https://www.imdb.com/name/" + actor.name.id;
                      a.target = "_blank";
                      a.click();
                      document.removeElement(a);
                    }}
                  />
                  <p className="whitespace-wrap overflow-auto text-clip text-center text font-bold">
                    {actor.name.nameText.text}
                  </p>
                  <p className="text-slate-600 text-center">
                    {actor?.characters?.at(0).name}
                  </p>
                </div>
              );
            })}
          </div>
          <div
            className={`flex justify-center items-center ml-6 my-20 p-2 border rounded-lg ${
              movieCustomInfo?.ratingsSummary?.aggregateRating > 8
                ? "border-green-700 bg-green-700"
                : "border-yellow-400 bg-yellow-400"
            }`}
          >
            <h2 className="text-4xl font-semibold justify-self-end text-white">
              {movieCustomInfo?.ratingsSummary?.aggregateRating} / 10
            </h2>
          </div>
        </div>
        <ul className="w-full flex flex-row justify-around p-4">
          {movieCustomInfo?.keywords?.edges?.map((keyword) => {
            return (
              <li
                key={keyword.node.text}
                className="bg-black text-white px-3 py-1 rounded-md mx-2 text-justify"
              >
                {keyword.node.text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Title;
