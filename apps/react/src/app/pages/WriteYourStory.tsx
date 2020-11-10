import { api } from '@internship/shared/api';
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import {
  CreateArticleRequest
} from '@internship/shared/types';

export const WriteYourStory = () => {
  const [content, setContent] = useState(String);
  const [heading, setHeading] = useState(String);
  const [contentType, setContentType] = useState("Tutorial");
  const [wordCounter, setWordCounter] = useState(Number);
  const [success, setSuccess] = useState(Boolean);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleHeadingChange = (event) => {
    setHeading(event.target.value);
  }

  const handleContentChange = (event) => {
    setContent(event.target.value);
  }

  const handleContentTypeChange = (event) => {
    setContentType(event.target.value);
  }


  //TODO handleSave ve handlePublish metodlarini tekte birlestirebilirsin.
  //TODO wordCounter eklemeyi unutma
  const handleSave = (event) => {
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
        setSuccess(true)
      })
      .catch((err) => {
        setSuccess(false)
      })
    event.preventDefault();
    alert("hello")
  }

  const handlePublish = (event) => {
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
        setSuccess(true)
      })
      .catch((err) => {
        setSuccess(false)
      })
    event.preventDefault();
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
              <Col md="4">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Example select</Form.Label>
                  <Form.Control as="select" value={contentType} onChange={handleContentTypeChange}>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Insight">Insight</option>
                    <option value="Engineering">Software Engineering</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control placeholder="A heading would be nice" value={heading} onChange={handleHeadingChange} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control value={content} onChange={handleContentChange} as="textarea" rows={40} placeholder="Why did not you start already?" />
            </Form.Group>
            <Row>
              <Col md={{ span: 4, offset: 8 }}>
                <Button variant="info" type="submit" name="save" value="Save Story" onClick={handleSave}>Save Story</Button>
                <Button variant="success" type="submit" name="publish" value="Publish Story" onClick={handlePublish}>Publish Story</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
