import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailView = () => {
  const params = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieData(params.id).then((response) => {
      setMovie(response);
    });
  }, []);

  async function getMovieData(id) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=7d524e1ffde1725b4b0130c5f81b7c6b`
    );
    if (response.status !== 200) {
      throw new Error("Something is no yes");
    }
    const data = await response.json();
    return data;
  }

  return (
    <div>
      {movie ? (
        <div>
          <Link to="/">Go to homepage</Link>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          {movie.production_companies.map((company) => (
            <img
              key={company.id}
              style={{ width: "100px", float: "left" }}
              src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}
              alt={`Logo of ${company.name}`}
            />
          ))}
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
};

export default DetailView;
