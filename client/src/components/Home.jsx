import '../styles/Home.sass'
import axios from 'axios'
import React, { useState, useEffect } from 'react';

function Home() {
    const [top100titles, setTop100titles] = useState([
        {
            _id: "63eef9c2244a27600bb64820",
            id: "top1",
            __v: 0,
            description:
                "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
            director: ["Frank Darabont"],
            genre: ["Drama"],
            image: [
                [
                    "190",
                    "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX190_CR0,0,190,281_.jpg",
                ],
                [
                    "285",
                    "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX285_CR0,1,285,422_.jpg",
                ],
                [
                    "380",
                    "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg",
                ],
            ],
            imdbid: "tt0111161",
            rank: 1,
            rating: "9.3",
            thumbnail:
                "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX67_CR0,0,67,98_AL_.jpg",
            title: "The Shawshank Redemption",
            writers: [
                'Stephen King(based on the short novel "Rita Hayworth and the Shawshank Redemption" by)',
                "Frank Darabont(screenplay by)",
            ],
            year: 1994,
        },
    ]);
    const [pressReq, setPressReq] = useState(false);
    useEffect(()=> {

    }, [pressReq])
    return (
        <div className="container">
            <h1 className='font-bold underline' onClick={() => setPressReq(true)}>request movies</h1>
            {/* navbar */}
            <div className='w-full border-black border-8 h-16'></div>
            <div className='flex items-center justify-center flex-col'>
                <h1 className='text-4xl'>Top 100 movies by IMDb</h1>
                <div className='list w-full'>
                    <ul className='flex flex-col items-center justify-center'>
                        {top100titles.map((movie) => {
                            return (
                                <li
                                    className="w-1/2 flex m-2"
                                    key={movie.imdbid || movie._id}
                                >
                                    <img
                                        className="w-48 h-72"
                                        src={movie.image.at(-1).at(1)}
                                        alt="Failed to load"
                                    />
                                    <div className="p-2 pl-6 flex flex-col justify-start">
                                        <h1 className="text-3xl">
                                            {movie.title}
                                        </h1>
                                        <p className="text-xl text-slate-500">
                                            {movie.year}
                                        </p>
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="1em"
                                                viewBox="0 0 576 512"
                                                className="mr-1"
                                            >
                                                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                            </svg>
                                            <h2 className="text-2xl">
                                                {movie.rating}
                                            </h2>
                                        </div>
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

function pickRatingColor(ratingStr) {
    const rating = Number(ratingStr)
    if (rating >= 9.0) return 'green'
    if (rating >= 8.5) return 'orange'
    if (rating >= 8.0) return 'yellow'
    return 'red'
}

export default Home;