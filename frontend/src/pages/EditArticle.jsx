import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditorState, ContentState, convertFromHTML, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useUpdatePostMutation } from "../features/api/apiSlice";
import "./NewArticle.css";

function EditArticle() {
  const { id } = useParams();
  // NOTE: useSelector() dipake buat ngambil data article dari redux store
  const posts = useSelector((state) => state.post);
  // NOTE : find() dipake buat ngambil data article dari array posts
  const postToEdit = posts.find((post) => post._id === id);
  const [updateArticle, { isLoading, isSuccess }] = useUpdatePostMutation();

  const [title, setTitle] = useState(postToEdit.title);
  const [url] = useState(postToEdit.image);

  // NOTE: useNavigate() dipake buat ngirim data ke halaman lain
  const contentDataState = ContentState.createFromBlockArray(
    convertFromHTML(postToEdit.content)
  );
  const editorDataState = EditorState.createWithContent(contentDataState);
  const [editorState, setEditorState] = useState(editorDataState);
  const navigate = useNavigate();

  function handleUpdate(e) {
    e.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftToHtml(rawContentState);

    if (!title || !content) {
      return alert("Judul dan Konten Harus Diisi!");
    }
    updateArticle({ id, title, content });
  }

  function handleEditorChange(state) {
    setEditorState(state);
  }

  if (isLoading) {
    return (
      <div>
        <h1 className="text-center">Sedang memperbarui artikel..</h1>
      </div>
    );
  }

  if (isSuccess) {
    setTimeout(() => {
      navigate("/");
    }, 2000);

    return (
      <div>
        <h1 className="text-center">Artikel berhasil diperbarui.</h1>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={7}>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Judul Artikel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            {/* Text Editor Wysiwyg */}
            <Editor
              stripPastedStyles={true}
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper mb-4"
              editorClassName="editor"
              toolbarClassName="toolbar"
            />

            <Form.Select className="mb-4">
              <option>Pilih Kategori</option>
              <option value="movie">Review Film</option>
              <option value="bola">Sepak Bola</option>
              <option value="portfolio">Portofolio</option>
              <option value="others">Lainnya</option>
            </Form.Select>

            <Button variant="primary" type="submit">
              Update Artikel
            </Button>
          </Form>
        </Col>
        <Col md={5} className="d-flex justify-content-center align-items-center">
          <img
            src={url}
            alt=""
            style={{ width: "100%", minHeight: "80vh", objectFit: "cover" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default EditArticle;
