import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useLoginUserMutation } from "../features/api/apiSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({ email, password }).then(({error}) => {
      if(!error) {
        navigate("/");
      }
    })
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form className="login__form" onSubmit={handleLogin}>
            <h1 className="text-danger">
              <strong>Bhinneka Post</strong>
            </h1>

            {isError && <p className="alert alert-danger text-center">{error.data}</p>}

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
              <Button variant="danger" type="submit" size="md" disabled={isLoading}>
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
