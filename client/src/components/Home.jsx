import '../styles/Home.sass'
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar';
function Home() {
    const [topTitles, setTopTitles] = useState([]);
    const navigate = useNavigate()

    useEffect(()=> {
        const options = {
            method: "GET",
            url: "https://moviesdatabase.p.rapidapi.com/titles/?sort=pos.incr&list=top_rated_250&limit=50",
            headers: {
                "X-RapidAPI-Key":
                    "f47abe3ee4msh40e9ceafbcb077dp1c2cd1jsn0109b5372666",
                "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
            },
        };
        axios.request(options).then((res) => {
            console.log(res.data);
            setTopTitles(res.data.results)

        })
    }, [])
    return (
        <div className="container flex flex-col justify-center items-center">
            
            <Navbar/>
            <div className='flex items-center justify-center flex-col'>
                <h1 className='text-4xl py-4'>Top 100 movies by IMDb</h1>
                <div className='list w-full'>
                    <ul className='flex flex-col items-center justify-center'>
                        {topTitles.map((movie) => {
                            return (
                                <li
                                    className={`w-3/4 flex py-2 pl-4 ${
                                        movie.position % 2 === 0
                                            ? "bg-gray-200"
                                            : "bg-gray-300"
                                    }`}
                                    key={movie.id || movie._id}
                                >
                                    <img
                                        className="w-48 h-72 cursor-pointer"
                                        src={movie.primaryImage.url}
                                        alt="Failed to load"
                                        onError={() =>
                                            {

                                            }
                                        }
                                        onClick={() =>
                                            navigate("/movies/" + movie.id)
                                        }
                                    />
                                    <div className="p-2 pl-6 flex flex-col justify-around">
                                        <h1
                                            className="text-3xl hover:underline cursor-pointer"
                                            onClick={() =>
                                                navigate("/movies/" + movie.id)
                                            }
                                        >
                                            {movie.titleText.text}
                                        </h1>
                                        <p className="text-xl text-slate-500">
                                            {movie.releaseYear.year}
                                        </p>
                                        <div className="flex items-center">
                                            {/* <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="1em"
                                                viewBox="0 0 576 512"
                                                className="mr-1"
                                            >
                                                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                            </svg>
                                            <h2 className="text-2xl">
                                                {movie.rating}
                                            </h2> */}
                                            <h2 className="text-2xl">
                                                №
                                                {movie.position ||
                                                    topTitles.indexOf(movie)}
                                            </h2>
                                        </div>
                                        <button
                                            className=" hover:bg-white border z-10 border-solid border-black border-1 self-start h-8 w-40 rounded"
                                            onClick={(e) =>
                                                postMovieToWatchlist(movie)
                                            }
                                        >
                                            To watchlist
                                        </button>
                                        <p className="text-l">
                                            {movie.description}
                                        </p>
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

function postMovieToWatchlist(movie) {
    // console.log(movie)
    localStorage.setItem(movie.id, JSON.stringify(movie))
}

export default Home;