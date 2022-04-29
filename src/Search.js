import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Search() {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState([]);

  async function getMovieData(query) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=7d524e1ffde1725b4b0130c5f81b7c6b&language=en-US&query=${query}&page=1&include_adult=false`
    );
    if (response.status !== 200) {
      throw new Error("Something is no yes");
    }
    const data = await response.json();
    return data.results;
  }

  function handleSearch(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getMovieData(value).then((data) => setMovies(data));
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search: </label>
        <input type="text" id="search" value={value} onChange={handleSearch} />
        <button>Find</button>
      </form>

      {movies.map((movie) => (
        <div
          style={{
            border: "1px solid lightcoral",
            borderRadius: "4px",
            padding: "10px",
            margin: "10px",
          }}
          key={movie.id}
        >
          <h2>
            <Link to={`/movie/${movie.id}`}>{movie.original_title}</Link>
          </h2>
          {movie.poster_path ? (
            <img
              style={{ width: "100%" }}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`Poster of ${movie.original_title}`}
            />
          ) : (
            "No poster"
          )}
        </div>
      ))}
    </div>
  );
}
