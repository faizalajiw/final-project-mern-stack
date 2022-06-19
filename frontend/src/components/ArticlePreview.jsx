import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ArticlePreview = ({ article }) => {
  const { title, content, image, _id } = article;
  console.log(article);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={image || `https://res.cloudinary.com/drpf1nmjx/image/upload/v1655622820/banner-preview_agdxpp.png`}
        style={{ maxHeight: 200, objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <div
            dangerouslySetInnerHTML={{
              __html: content?.substring(0, 250)
            }}
          />
        </Card.Text>

        <LinkContainer to={`/articles/${_id}`}>
          <Button variant="primary">Lihat</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default ArticlePreview;
