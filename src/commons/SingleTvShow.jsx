import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const SingleTvShow = ({mail}) => {
  const params = useParams();
  const id = params.id;
  const [tvProgram, setTvProgram] = useState({});
  const [relacionados, setRelacionados] = useState([]);
  const navigate = useNavigate();

  const handleFavorite = (event) => {
    event.preventDefault();
    axios
      .post("/api/favorite", {
        email: mail, 
        nombreFav: tvProgram.name,
        favId: tvProgram.id,
        imagenFav: `https://image.tmdb.org/t/p/original${tvProgram.poster_path}`,
      })
      .then(() => {
        navigate("/favorite")
      });
  };


  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=7052bbc22fda821b8ab3d258c4794811&language=en-US`
      )
      .then((tvProgram) => setTvProgram(tvProgram.data))
      .catch((error) => console.log(error));

    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=7052bbc22fda821b8ab3d258c4794811&language=en-US&page=1`
      )
      .then((programs) => setRelacionados(programs.data.results))
      .catch((error) => console.log(error));
  }, [params]);


  return (
    <div>
      <h1>{tvProgram.title}</h1>
      <br />
      <img
        src={`https://image.tmdb.org/t/p/original${tvProgram.poster_path}`}
        alt=""
        height={600}
        with="100%"
      />
      <br /> <br/>
      <Link>
        <Button onClick={handleFavorite}>ADD TO FAVORITES</Button>
      </Link>
      <br /> <br/>
      <p>PUNTAJE: {tvProgram.vote_average}</p>
      <p>DESCRIPTION: {tvProgram.overview}</p>
      <p>FIRST YEAR DATE: {tvProgram.first_air_date}</p>
      <p>
        TITULOS RELACIONADOS:{" "}
        {relacionados.map((program, i) => {
          let simProgs = "";
          {
            simProgs += program.name + " - ";
          }
          return simProgs;
        })}
      </p>
    </div>
  );
};

export default SingleTvShow;
