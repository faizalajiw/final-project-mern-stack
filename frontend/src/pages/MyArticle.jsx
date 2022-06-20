import React from "react";
import { useGetUserPostsQuery } from "../features/api/apiSlice";
import { Spinner, Container, Row, Col } from "react-bootstrap";
import ArticlePreview from "../components/ArticlePreview";

const MyArticle = () => {
  const { data: myarticles, isLoading, isError } = useGetUserPostsQuery();

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

  if (myarticles.length === 0) {
    return (
      <div className="py-4">
        <h1 className="text-center">Belum ada artikel yang dibuat</h1>
      </div>
    )
  }

  return (
    <Container>
      <h1 className="text-center">Artikel Saya</h1>
      <Row>
        <Col md={9} className="d-flex justify-content-center flex-wrap gap-4">
          {myarticles.map((article, idx) => (
            <ArticlePreview key={idx} article={article} currentUserPost={true} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MyArticle;
