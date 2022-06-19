import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const MainArticle = ({ article }) => {
  const { title, content, image, _id } = article;
  console.log(article);

  return (
    <Row className="pb-4">
      <Col md={7} className="main-article__image-container">
        <img src={image} alt="" style={{widht: "100%", maxHeight: "300", objectFit: "cover"}} />
      </Col>

      <Col md={5}>
        <h2>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content?.substring(0, 200) }} />
        <LinkContainer to={`/articles/${_id}`}>
            <Button variant="info"> 
                Selengkapnya
            </Button>
        </LinkContainer>
      </Col>
    </Row>
  );
};

export default MainArticle;
