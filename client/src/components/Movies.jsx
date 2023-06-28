import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sorting from "./Sorting";
import YearRangeSelector from "./YearRangeSelector";
import { useNavigate } from "react-router-dom";
function Movies() {
  const [mostPopularMovies, setMostPopularMovies] = useState([]);
	const [noMoviesFound, setNoMoviesFound] = useState(false);
	const [genres, setGenres] = useState([]);
	const [pickedGenre, setPickedGenre] = useState(null);
	const [currPage, setCurrPage] = useState(1);
	const [startYear, setStartYear] = useState(null)
	const [endYear, setEndYear] = useState(null)
	const [sortOrder, setSortOrder] = useState(null)
	const navigate = useNavigate()
	
	useEffect(() => {
		const options = {
			method: "GET",
			url: "https://moviesdatabase.p.rapidapi.com/titles/utils/genres",
			headers: {
				"X-RapidAPI-Key":
					"f47abe3ee4msh40e9ceafbcb077dp1c2cd1jsn0109b5372666",
				"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
			},
		};

		const getGenres = async () => {
			try {
				const response = await axios.request(options);
				console.log(response.data.results.filter(item => item !== null));
				setGenres(response.data.results.filter((item) => item !== null))
			} catch (error) {
				console.error(error);
			}
		}

		getGenres()

	}, []);

  useEffect(() => {
		const options = {
      method: "GET",
      url: `https://moviesdatabase.p.rapidapi.com/titles/?page=${currPage}&sort=pos.incr&list=most_pop_movies&limit=50${
        pickedGenre ? "&genre=" + pickedGenre : ""
      }${startYear ? "&startYear=" + startYear : ""}${
        endYear ? "&endYear=" + endYear : ""
      }${sortOrder ? "&sort=" + sortOrder : ""}`,
      headers: {
        "X-RapidAPI-Key": "f47abe3ee4msh40e9ceafbcb077dp1c2cd1jsn0109b5372666",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };
		const getMovies = async () => {
			try {
				const response = await axios.request(options);
				console.log(response.data);
				setMostPopularMovies(response.data.results);
				if (response.data.results.length === 0) setNoMoviesFound(true);
        else setNoMoviesFound(false);
			} catch (error) {
				console.error(error);
			}
		};

		getMovies();

		return () => {
			setMostPopularMovies([])
		}
	}, [currPage, pickedGenre, startYear, endYear, sortOrder]);


	// useEffect(() => {
	// 	const options = {
  //     method: "GET",
  //     url: `https://moviesdatabase.p.rapidapi.com/titles/?page=${currPage}&sort=pos.incr&list=most_pop_movies&limit=50&genre=${pickedGenre}${
  //       startYear ? "&startYear=" + startYear : ""
  //     }${endYear ? "&endYear=" + endYear : ""}`,
  //     headers: {
  //       "X-RapidAPI-Key": "f47abe3ee4msh40e9ceafbcb077dp1c2cd1jsn0109b5372666",
  //       "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  //     },
  //   };
	// 	const getMovies = async () => {
	// 		try {
	// 			const response = await axios.request(options);
	// 			// console.log(response.data.results.filter((item) => item !== null));
	// 			setMostPopularMovies(response.data.results);
	// 			if (response.data.results.length === 0) setNoMoviesFound(true);
  //       else setNoMoviesFound(false);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};

	// 	getMovies();

	// 	return () => {
	// 		setMostPopularMovies([]);
	// 	};
	// }, [pickedGenre, startYear, endYear]);



  return (
    <div className="w-full">
      <Navbar />
      <h1 className="text-center text-4xl p-2 text-black-900">
        Most popular movies
      </h1>
      <div className="w-full flex flex-row justify-between flex-wrap p-4">
        {genres.map((genre) => {
          return (
            <button
              key={genre}
              // type="toggle"
              className={`mx-7 my-2 hover:border-2 p-2 hover:border-black ${
                pickedGenre == genre
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => {
                if (pickedGenre == genre) setPickedGenre(null);
                else setPickedGenre(genre);
              }}
            >
              {genre}
            </button>
          );
        })}
      </div>
      <div className="w-full flex flex-row items-center justify-center flex-wrap">
        <YearRangeSelector setStartYear={setStartYear} setEndYear={setEndYear} />
				{/* <Sorting setSortOrder={setSortOrder}/> */}
			</div>
      {currPage > 1 && !noMoviesFound && (
        <div className="w-full flex justify-center">
          <button
            className="border-2 border-black p-2 text-center hover:underline mt-2 w-20"
            onClick={() => {
              setCurrPage((page) => page - 1);
            }}
          >
            Back
          </button>
        </div>
      )}
      <div className="m-5 w-full h-full">
        <ul className="w-full flex flex-row flex-wrap">
          {noMoviesFound && (
            <h2 className="w-full text-2xl">No movies found</h2>
          )}
          {mostPopularMovies.map((movie) => {
            return (
              <li key={movie.id} className="flex flex-col mx-4">
                <img
                  className="w-44 h-64 cursor-pointer"
                  src={
                    movie.primaryImage
                      ? movie.primaryImage.url
                      : "/default-movie.jpg"
                  }
                  alt="No image"
                  onClick={() => {
                    navigate(`/movies/${movie.id}`);
                  }}
                  onError={(e) => {
                    e.target.src = "/default-movie.jpg";
                  }}
                />
                <p className="truncate w-44">
                  {movie.titleText ? movie.titleText.text : ""}
                </p>
                <p>{movie.releaseYear ? movie.releaseYear.year : ""}</p>
              </li>
            );
          })}
        </ul>
        <div className="w-full flex justify-center">
          {!noMoviesFound && (
            <button
              className="border-2 border-black p-2 text-center hover:underline"
              onClick={() => {
                setCurrPage((page) => page + 1);
              }}
            >
              Load more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Movies;
