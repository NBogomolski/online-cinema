import Navbar from "./Navbar";
import React, { useState, useEffect } from 'react';

function Watchlist() {
    const [watchlistItems, setWatchlistItems] = useState([]);

    useEffect(() => {
        for(const [key, value] of Object.entries(localStorage)) {
            console.log(key, JSON.parse(value));
            // console.log(watchlistItems.filter(item => item.id == key))
            setWatchlistItems(oldList => {
                if (oldList.filter(item => item.id == key).length === 0) {
                    // console.log(oldList.filter((item) => item.id === key));
                    return [JSON.parse(value), ...oldList]
                }
                return oldList
            });
        }
    }, []);

    function removeFromWatchlist(movie) {
        setWatchlistItems((oldList) => {
            console.log(oldList.map(item => {
                if (item.id !== movie.id) 
                    return item
                return
            }))
            return oldList
        }
        );
        localStorage.removeItem(movie.id)
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="m-5 w-full h-full">
                <ul className="w-full flex flex-row flex-wrap">
                    {watchlistItems.map((movie) => (
                        <li key={movie.id} className="flex flex-col mx-4">
                            <div>
                                <div
                                    className="w-44 h-64 z-20 absolute bg-transparent hover:bg-gray-500/80 cursor-pointer"
                                    onClick={() => removeFromWatchlist(movie)}
                                ></div>
                                <img
                                    className="w-44 h-64"
                                    src={movie.primaryImage.url}
                                    alt="No image"
                                />
                            </div>
                            <p className="truncate w-44">
                                {movie.titleText.text}
                            </p>
                            <p>{movie.releaseYear.year}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}



export default Watchlist;