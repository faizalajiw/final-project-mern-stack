import React from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDeletePostMutation } from "../features/api/apiSlice";

const ArticlePreview = ({ article, currentUserPost }) => {
  const { title, content, image, _id } = article;
  const [deleteArticle, { isLoading }] = useDeletePostMutation();

  const handleDelete = () => {
    deleteArticle(_id);
  };

  return (
    // CARD ARTICLE
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={
          image ||
          `https://res.cloudinary.com/drpf1nmjx/image/upload/v1655622820/banner-preview_agdxpp.png`
        }
        style={{ width: "100%", height: "15vw", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <div
            dangerouslySetInnerHTML={{
              __html: content?.substring(0, 75) + "...",
            }}
          />
        </Card.Text>

        {/* BUTTON */}
        <ButtonGroup className="mt-2">
          <LinkContainer to={`/articles/${_id}`}>
            <Button variant="outline-info" className="mt-auto">
              Lihat
            </Button>
          </LinkContainer>

          {currentUserPost && (
            <>
              <LinkContainer to={`/articles/${_id}/edit`}>
                <Button variant="outline-warning">Edit</Button>
              </LinkContainer>
              <Button variant="outline-danger" onClick={handleDelete}>
                 {isLoading ? "Loading..." : "Hapus"}
              </Button>
            </>
          )}
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default ArticlePreview;
