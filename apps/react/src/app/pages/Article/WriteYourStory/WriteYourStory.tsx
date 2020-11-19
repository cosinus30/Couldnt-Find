import { api } from '@internship/shared/api';
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import {
  CreateArticleRequest
} from '@internship/shared/types';
import QuillEditor from './QuillEditor';

export const WriteYourStory = () => {
  const [content, setContent] = useState(String);
  const [heading, setHeading] = useState(String);
  const [contentType, setContentType] = useState("Tutorial");
  const [wordCounter, setWordCounter] = useState(Number);
  const [success, setSuccess] = useState(Boolean);
  const [isUploaded, setIsUploaded] = useState(false);
  const [files, setFiles] = useState([]);

  const handleHeadingChange = (event) => {
    setHeading(event.target.value);
  }

  const handleContentChange = (value) => {
    setContent(value);
  }

  const handleContentTypeChange = (event) => {
    setContentType(event.target.value);
  }

  const onFileChange = (files) => {
    setFiles(files);
  }


  //TODO handleSave ve handlePublish metodlarini tekte birlestirebilirsin.
  //TODO wordCounter eklemeyi unutma
  const handleSave = (event) => {
    event.preventDefault();
    setIsUploaded(true);
    const req: CreateArticleRequest = {
      content: content,
      contentType: contentType,
      published: false,
      readTime: 1,
      heading: heading,
    }
    api.article.createArticle(req)
      .then((res) => {
        setSuccess(true);
        setContent("");
      })
      .catch((err) => {
        setSuccess(false)
      })
  }

  const handlePublish = (event) => {
    event.preventDefault();
    setIsUploaded(true);
    const req: CreateArticleRequest = {
      content: content,
      contentType: contentType,
      published: true,
      readTime: 1,
      heading: heading,
    }
    api.article.createArticle(req)
      .then((res) => {
        setSuccess(true);
        setContent("");
      })
      .catch((err) => {
        setSuccess(false)
      })
  }

  let message = null
  if (isUploaded) {
    message = success === false ? <Alert variant="danger">Something went wrong!</Alert> : <Alert variant="success">Uploaded successfully</Alert>
  }

  return (
    <Container>
      <Row>
        <Col md="12">
          {message}
          <Form>
            <Row>
              <Col md="8">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="text-light">Title of the article</Form.Label>
                  <Form.Control className="bg-secondary border-0 text-light" placeholder="A heading would be nice" value={heading} onChange={handleHeadingChange} />
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="text-light">Type of the article</Form.Label>
                  <Form.Control className="bg-secondary border-0 text-light" as="select" value={contentType} onChange={handleContentTypeChange}>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Insight">Insight</option>
                    <option value="Engineering">Software Engineering</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs="12" md="9">
                  <QuillEditor
                    placeholder="Start posting something"
                    onEditorChange={handleContentChange}
                  />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs="12" md={{offset:6, span:6}}>
                  <Button variant="secondary" className="mx-2" type="submit" name="save" value="Save Story" onClick={handleSave}>Save Story</Button>
                  <Button variant="secondary" className="mx-2" type="submit" name="save" value="Publish Story" onClick={handlePublish}>Publish Story</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
