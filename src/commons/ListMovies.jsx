import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card"

const ListMovies = ({mail}) => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleInput = (event) => {
    const input = event.target.value;
    setInput(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=7052bbc22fda821b8ab3d258c4794811&language=en-US&query=${input}&page=1`
      )
      .then((res) => setMovies(res.data.results))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Movie"
          value={input}
          onChange={handleInput}
        />
      </form>
      <div>
        <div>
          {movies.map((movie, i) => {
            return <Card info={movie} mail={mail}/>
        })}
        </div>
      </div>
    </>
  );
};

export default ListMovies;
