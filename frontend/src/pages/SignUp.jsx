import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useSignupUserMutation } from "../features/api/apiSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [signupUser, { isLoading, isError, error }] = useSignupUserMutation();

  const handleSignUp = (e) => {
    e.preventDefault();
    signupUser({ email, password }).then(({ error }) => {
      if (!error) {
        navigate("/");
      }
    })
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form className="signup__form" onSubmit={handleSignUp}>
            <h1 className="text-success">
              <strong>Buat Akun</strong>
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
              <Button variant="success" type="submit" size="md" disabled={isLoading}>
                Daftar
              </Button>
            </div>
            {/* End of Submit */}

            <div className="py-4">
              <p>
                Sudah punya akun? {""}
                <Link className="link__style" to="/login">
                  <strong>Masuk</strong>
                </Link>
              </p>
            </div>
          </Form>
        </Col>

        {/* Banner */}
        <Col md={6} className="signup__bg--container"></Col>
      </Row>
    </Container>
  );
};

export default SignUp;
