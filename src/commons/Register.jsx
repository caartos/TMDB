import React from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router";
import { Button, Form } from "react-bootstrap";

const Register = () => {
  const email = useInput("email");
  const password = useInput("password");
  const name = useInput("name");
  const lastname = useInput("lastname");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/register", {
        email: email.value,
        password: password.value,
        name: name.value,
        lastname: lastname.value,
      })
      .then(() => {
        navigate("/login");
      });
  };

  return (
    <div>
      <div>REGISTER NEW USER</div>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Control type="text" placeholder="Email" required {...email} />
          </Form.Group>
          <br/>
          <Form.Group id="password">
            <Form.Control
              type="password"
              placeholder="Password"
              required
              {...password}
            />
          </Form.Group>
          <br/>
          <Form.Group id="name">
            <Form.Control type="text" placeholder="Name" required {...name} />
          </Form.Group>
          <br/>
          <Form.Group id="lastname">
            <Form.Control
              type="text"
              placeholder="Lastname"
              required
              {...lastname}
            />
          </Form.Group>
          <br/>
          <Button type="submit">REGISTER</Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
