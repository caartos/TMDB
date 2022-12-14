import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card"

const ListTvShow = ({ mail }) => {
  const [input, setInput] = useState("");
  const [tvPrograms, setTvPrograms] = useState([]);
  const navigate = useNavigate();


  const handleInput = (event) => {
    const input = event.target.value;
    setInput(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        ` https://api.themoviedb.org/3/search/tv?api_key=7052bbc22fda821b8ab3d258c4794811&language=en-US&page=1&query=${input}&include_adult=false`
      )
      .then((res) => setTvPrograms(res.data.results))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Tv Program"
          value={input}
          onChange={handleInput}
        />
      </form>
      <div>
        <div>
          {tvPrograms.map((tvProgram, i) => {
            return <Card info={tvProgram} mail={mail}/>
        })}
        </div>
      </div>
    </>
  );
};

export default ListTvShow;
