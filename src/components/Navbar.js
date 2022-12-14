import React from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogIn from "../commons/LogIn";
import { Nav, Navbar } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/user";

const NavbarLayout = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogOut = () => {
    axios
      .post("/api/user/logout")
      .then(() => {
        console.log(user);
        setUser();
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <nav>
      <Link to="/">
        <h1 className="display-2 text-muted text-center" >TMDB</h1>
      </Link>
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <div className="d-flex">
              <Nav.Link>
                {!user ? (
                  <Link to="/register">
                    <button>REGISTER</button>
                  </Link>
                ) : (
                  <Link to="/favorite">
                    <button>FAVORITES</button>
                  </Link>
                )}
              </Nav.Link>
              <Nav.Link>
                {!user ? (
                  <Link to="/login">
                    <button>LOG IN</button>
                  </Link>
                ) : (
                  <Link to="/logout">
                    <button onClick={handleLogOut}>LOG OUT</button>
                  </Link>
                )}
              </Nav.Link>
            </div>
            <Nav.Link>
              <Link to="/movies">
                <button>PELIS</button>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/tvprograms">
                <button>TV SHOW</button>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
};

export default NavbarLayout;
