import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "@tinymce/tinymce-react";
import { useCreatePostMutation } from "../features/api/apiSlice";

const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [uploadingimg, setUploadImg] = useState(false);
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();
  const navigate = useNavigate();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  function handlePublish(e) {
    e.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftToHtml(rawContentState);
    console.log(draftToHtml(rawContentState));
    if (!title || !image || !content) {
      return alert("Judul, Gambar dan Konten Harus Diisi!");
    }
    // CREATE ARTICLE
    createPost({ title, content, image: url });
  }

  function handleEditorChange(state) {
    setEditorState(state);
  }

  function uploadImage(e) {
    e.preventDefault();
    if (!image) return;
    setUrl("");
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ijalcloudinary");
    setUploadImg(true);
    fetch("https://api.cloudinary.com/v1_1/drpf1nmjx/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUploadImg(false);
        setUrl(data.url);
      })
      .catch((err) => {
        setUploadImg(false);
        console.log(err);
      });
  }

  function handleImageValidation(e) {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      setImage(null);
      return alert("Ukuran Gambar Terlalu Besar!");
    } else {
      setImage(file);
    }
  }

  if (isLoading) {
    return (
      <div>
        <h1 className="text-center">Sedang membuat artikel..</h1>
      </div>
    );
  }

  if (isSuccess) {
    setTimeout(() => {
      navigate("/");
    }, 2000);

    return (
      <div>
        <h1 className="text-center">Artikel berhasil dipublish.</h1>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={7}>
          <Form onSubmit={handlePublish}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Editor
              // dibawah ini API TinyCME milik saya
              apiKey="3ituox0mhf6744v1cssbp9py7w78zb1crdziktkpadi43sfu"
              stripPastedStyles={true}
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
            />

            <Form.Select>
              <option>Pilih Kategori</option>
              <option value="movie">Movie Chill</option>
              <option value="bola">Sepak Bola</option>
              <option value="portfolio">Portofolio</option>
              <option value="others">Lainnya</option>
            </Form.Select>

            <div>
              {!url && (
                <p className="alert alert-info">
                  Upload Gambar Terlebih Dahulu
                </p>
              )}
            </div>
            <div className="my-4">
              <input
                type="file"
                onChange={handleImageValidation}
                accept="image/png, image/jpeg, image/jpg"
              />
              <Button onClick={uploadImage} disabled={uploadingimg || !image}>
                Upload
              </Button>
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={uploadingimg || !url}
            >
              Publish
            </Button>
          </Form>
        </Col>
        <Col
          md={5}
          className="d-flex justify-content-center align-items-center"
        >
          {uploadingimg && (
            <div className="text-center">
              <Spinner animation="border" variant="primary" role="status" />
              <br />
              <p className="py-2">Sedang Mengunggah</p>
            </div>
          )}
          <div>
            {!url && !uploadingimg && (
              <img
                src={
                  "https://res.cloudinary.com/drpf1nmjx/image/upload/v1655581241/banner-post_p9bl0r.png"
                }
                alt=""
                style={{ width: "100%", minHeight: "80vh", objectFit: "cover" }}
              />
            )}
          </div>
          {url && (
            <img
              src={url}
              alt=""
              style={{ width: "100%", minHeight: "80vh", objectFit: "cover" }}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default NewArticle;
