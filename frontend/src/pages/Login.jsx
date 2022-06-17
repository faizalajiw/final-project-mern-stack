import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/login", { email, password })
      .then(({data}) => console.log(data))
      .catch((err) => console.log(err.message));
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form className="login__form" onSubmit={handleLogin}>
            <h1 className="text-danger">
              <strong>Bhinneka Academy</strong>
            </h1>

            {/* Email */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {/* End of email */}

            {/* Password */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {/* End of Password */}

            {/* Submit */}
            <div className="d-grid gap-2">
              <Button variant="danger" type="submit" size="md">
                Masuk
              </Button>
            </div>
            {/* End of Submit */}

            <div className="py-4">
              <p>
                Belum punya akun?{" "}
                <Link className="link__style" to="/signup">
                  <strong>Daftar</strong>
                </Link>
              </p>
            </div>
          </Form>
        </Col>

        {/* Banner */}
        <Col md={6} className="login__bg--container"></Col>
      </Row>
    </Container>
  );
};

export default Login;
