import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const NewArticle = () => {
  return (
    <Container>
      <Row>
        <Col md={7}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Your Title" />
            </Form.Group>

            <Form.Select>
              <option>Pilih Kategori</option>
              <option value="movie">Movie Chill</option>
              <option value="bola">Sepak Bola</option>
              <option value="portfolio">Portofolio</option>
              <option value="others">Lainnya</option>
            </Form.Select>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewArticle;
