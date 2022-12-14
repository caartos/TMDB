import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import axios from "axios";
// import components
import NavbarLayout from "./components/Navbar";
import ListMovies from "./commons/ListMovies";
import SingleMovie from "./commons/SingleMovie";
import SingleTvShow from "./commons/SingleTvShow";
import ListTvShow from "./commons/ListTvShow";
import Home from "./components/Home";
import Register from "./commons/Register";
import LogIn from "./commons/LogIn";
import Favorites from "./components/Favorites"
import { useContext } from "react";
import { AuthContext } from "./context/user";

const App = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/api/user/me")
      .then((res) => res.data)
      .then((user) =>{
       setUser(user)})
      .catch(() => console.log("error"));
  }, []);


  return (
    <>
      <div className="container p-3 mb-2 bg-warning text-dark">
          <NavbarLayout />
          <div >
            <Routes>
              <Route path="/" element={<Home mail={user ? user.email : null}/>}></Route>
              <Route path="/movies" element={<ListMovies mail={user ? user.email : null}/>}></Route>
              <Route path="/tvprograms" element={<ListTvShow mail={user ? user.email : null}/>}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<LogIn />}></Route>
              <Route path="/favorite" element={<Favorites mail={user ? user.email : null}/>}></Route>
              <Route path="/movies/:id" element={<SingleMovie mail={user ? user.email : null}/>}></Route>
              <Route path="/tvprograms/:id" element={<SingleTvShow mail={user ? user.email : null}/>}></Route>
            </Routes>
          </div>
      </div>
    </>
  );
};

export default App;
