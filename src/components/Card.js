import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Card = ({info, mail}) => {
    
    const navigate = useNavigate();

    const handleFavorite = (event) => {
        event.preventDefault();
        axios
          .post("/api/favorite", {
            email: mail,
            nombreFav: info.name || info.title,
            favId: info.id,
            imagenFav: `https://image.tmdb.org/t/p/original${info.poster_path}`,
          })
          .then(() => {
            navigate("/favorite");
          });
      };
    


  return (
    <div key={info.id}>
      <img
        src={`https://image.tmdb.org/t/p/original${info.poster_path}`}
        alt=""
        height={600}
        with="100%"
      />
      <br />
      <Link to={`/tvprograms/${info.id}`}>
        <h2>{info.name}</h2>
      </Link>
      <br />
      <Link>
        <Button onClick={handleFavorite}>ADD TO FAVORITES</Button>
    </Link>
    </div>
  );
};

export default Card;
