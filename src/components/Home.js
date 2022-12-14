import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = ({mail}) => {
  const [recomendedMovies, setRecomendedMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=7052bbc22fda821b8ab3d258c4794811&language=en-US&page=1"
      )
      .then((popular) => setRecomendedMovies(popular.data.results))
      .catch((error) => console.log(error));
  },[]);

  return (
    <div>
      <h3 className="text-center"> BIENVENIDO A TU MEJOR APP PARA BUSCAR PELIS Y PROGRAMAS DE TV !! </h3>
      <br/> <br/>
      <div className="imagenes-alineadas">
        {recomendedMovies.map((movie, i) => (
          <div key={i} className="margen-imagen" >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt=""
              height={600}
              with="100%"
            />
            <Link to={`/movies/${movie.id}`}>
              <h2>{movie.title}</h2>
            </Link>
            <Link>
              <Button>ADD TO FAVORITES</Button>
            </Link>
            <br /> <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
