import React from "react";
import { useParams } from "react-router-dom";
import { useGetOnePostQuery } from "../features/api/apiSlice";
import { Container, Spinner, Row, Col } from "react-bootstrap";

const SingleArticle = () => {
  const { id } = useParams();
  const { data: article, isLoading, isError } = useGetOnePostQuery(id);

  if (isError) {
    return (
      <div>
        <h1 className="text-center">Error not found</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" role="status" />
      </div>
    );
  }

  console.log(article);

  return (
    <Container>
      <Row>
        <Col md={8} style={{ margin: "0 auto" }}>
          <img
            src={article.image}
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
            alt=""
          />
          <h1>{article.title}</h1>
          <p>Oleh {article.creator.email}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </Col>
      </Row>
    </Container>
  );
};

export default SingleArticle;
