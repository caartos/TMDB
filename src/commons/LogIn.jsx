import React from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router";

import { Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/user";


const LogIn = () => {
  const email = useInput("email");
  const password = useInput("password");
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/login", {
        email: email.value,
        password: password.value,
      })
      .then((data) => {
        console.log(data);
        setUser(data.data);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>LOG IN!</div>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
          <Form.Control type="text" required placeholder="Email" {...email} />
          </Form.Group>
          <br/>
          <Form.Group id="password">
          <Form.Control type="text" required placeholder="Password" {...password} />
          </Form.Group>
          <br/>
          <Button type="submit" className="btn btn-secondary">LOG IN</Button>
        </Form>
      </div>
    </div>
  );
};

export default LogIn;
