import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const SingleMovie = ({ mail }) => {
  const params = useParams();
  const id = params.id;
  const [movie, setMovie] = useState({});
  const [relacionados, setRelacionados] = useState([]);
  const navigate = useNavigate();

  const handleFavorite = (event) => {
    event.preventDefault();
    axios
      .post("/api/favorite", {
        email: mail,
        nombreFav: movie.title,
        favId: movie.id,
        imagenFav: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      })
      .then(() => {
        navigate("/favorite");
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=7052bbc22fda821b8ab3d258c4794811&language=en-US`
      )
      .then((movie) => setMovie(movie.data))
      .catch((error) => console.log(error));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=7052bbc22fda821b8ab3d258c4794811&language=en-US&page=1`
      )
      .then((titulos) => setRelacionados(titulos.data.results))
      .catch((error) => console.log(error));
  }, [params]);

  return (
    <div>
      <h1>{movie.title}</h1>
      <br />
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt=""
        height={600}
        with="100%"
      />
      <br /> <br />
      <Link>
        <Button onClick={handleFavorite}>ADD TO FAVORITES</Button>
      </Link>
      <br /> <br />
      <p>PUNTAJE: {movie.vote_average}</p>
      <p>DESCRIPTION: {movie.overview}</p>
      <p>YEAR: {movie.release_date}</p>
      <p>
        TITULOS RELACIONADOS:
        {relacionados.map((pelicula, i) => {
          let pelis = "";
          {
            pelis += pelicula.title + " - ";
          }
          return pelis;
        })}
      </p>
    </div>
  );
};

export default SingleMovie;
