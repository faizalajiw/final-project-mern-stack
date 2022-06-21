import React from "react";
import { Row, Col, Container, Spinner, ListGroup } from "react-bootstrap";
import MainArticle from "../components/MainArticle";
import ArticlePreview from "../components/ArticlePreview";
import { useGetAllPostsQuery } from "../features/api/apiSlice";
import { LinkContainer } from "react-router-bootstrap";

const Home = () => {
  const { data: articles, isLoading, isError } = useGetAllPostsQuery();
  const sidebarArticles = articles?.slice(0, 10) || [];

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

  return (
    <Container>
      <div className="banner">
        <h1 className="banner__title">Bhinneka Post</h1>
      </div>

      <Row>
        <MainArticle article={articles[articles.length - 1]} />
        <Col md={9} className="blog-main d-flex pb-4 flex-wrap gap-4">
          {articles.map((article, idx) => (
            <ArticlePreview article={article} key={idx} />
          ))}
        </Col>

        <Col md={3} className="blog-sidebar py-4">
          <ListGroup variant="flush">
            <h2>Artikel Terbaru</h2>
            {sidebarArticles.map((article, idx) => (
              <LinkContainer to={`/articles/${article._id}`} key={idx}>
                <ListGroup.Item>{article.title}</ListGroup.Item>
              </LinkContainer>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
