import { api } from '@internship/shared/api';
import { Tag } from '@internship/shared/api';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import {CreateArticleRequest} from '@internship/shared/types';
import QuillEditor from './QuillEditor';
import CreatableSelect from 'react-select/creatable';
import { isNullOrUndefined } from 'util';


//TODO if article is prepopulated api call will be different.
export const WriteYourStory = (props) => {
  const [content, setContent] = useState(String);
  const [heading, setHeading] = useState(isNullOrUndefined(props.location.state) ? "" : props.location.state.heading);
  const [contentType, setContentType] = useState(isNullOrUndefined(props.location.state) ? "Tutorial" : props.location.state.contentType);
  const [tags, setTags] = useState(isNullOrUndefined(props.location.state) ? [] : props.location.state.tags.map((tag) => {
    return ({label: tag.tagName, value: tag.tagName});
  }));
  const [tagsDisabled, setTagsDisabled] = useState(false);
  const [success, setSuccess] = useState(Boolean);
  const [isUploaded, setIsUploaded] = useState(false);
  const [suggestions, setSuggestions] = useState<Tag[]>();
  const [prePopulated, setPrePopulated] = useState(false);
  const [imageUrl, setImageUrl] = useState(isNullOrUndefined(props.location.state) ? "" : props.location.state.imageUrl);
  
  useEffect(() => {
    console.log(props.location.state);
    
    setPrePopulated(!isNullOrUndefined(props.location.state));
    api.article.getSuggestions()
    .then((response) => {
      let myArr = [];
      response.map((tag) => {
        myArr.push({label: tag.tagName, value: tag.tagName});
      })
      setSuggestions(myArr);
    })
  },[false])


  const handleHeadingChange = (event) => {
    setHeading(event.target.value);
  }

  const handleContentChange = (value) => {
    setContent(value);
  }

  const handleContentTypeChange = (event) => {
    setContentType(event.target.value);
  }

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  }


  const handleSave = (event, prePopulate: boolean) => {
    event.preventDefault();
    if(tagsDisabled) return;
    setIsUploaded(true);
    const req: CreateArticleRequest = {
      tags: tags,
      content: content,
      contentType: contentType,
      published: false,
      readTime: 1,
      heading: heading,
      imageUrl: imageUrl,
    }
    if(prePopulate == true){
      api.article.updateArticle(req, props.location.state.id)
        .then((res) => {
          setSuccess(true);
        })
        .catch((err) => {
          setSuccess(false);
        })
    }
    else{
      console.log(prePopulate)
      api.article.createArticle(req)
      .then((res) => {
        setSuccess(true);
        setContent("");
      })
      .catch((err) => {
        setSuccess(false)
      })
    }
  }

  const handlePublish = (event, prePopulate: boolean) => {
    event.preventDefault();
    if(tagsDisabled) return;
    setIsUploaded(true);
    const req: CreateArticleRequest = {
      tags: tags,
      content: content,
      contentType: contentType,
      published: true,
      readTime: 1,
      heading: heading,
      imageUrl: imageUrl,
    }

    if(prePopulate){
      api.article.updateArticle(req, props.location.state.id)
        .then((res) => {
          setSuccess(true);
          console.log("Article updated")
        })
        .catch((err) => {
          setSuccess(false);
        })
    }
    else{
      api.article.createArticle(req)
      .then((res) => {
        setSuccess(true);
        setContent("");
      })
      .catch((err) => {
        setSuccess(false)
      })
    }
  }

  let message = null
  if (isUploaded) {
    message = success === false ? <Alert variant="danger">Something went wrong!</Alert> : <Alert variant="success">Uploaded successfully</Alert>
  }

  if(tagsDisabled){
    message = <Alert variant="warning">You can add up to 5 tags.</Alert>
  }

  const handleChange = (newValue: any, actionMeta: any) => {
    if(newValue && newValue.length > 5){
      setTagsDisabled(true);
    }
    else if(newValue && newValue.length <= 5){
      let temp = []
      newValue.map((el) => {
        temp.push(el.value);
      })
      setTags([...temp]);
      setTagsDisabled(false);
      console.log("I am here")
    }
  };

  //TODO All suggestions will come from backend.

  const CustomStyle = {
    control: styles => ({ ...styles, backgroundColor: '#151618' }),
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: '#151618',
        color: '#E9D7DA',
        ':hover': {
          ...styles[':active'],
          backgroundColor: '#E9D7DA',
          color: '#151618'
        },
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: '#E9D7DA',
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: '#151618',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: '#151618',
      ':hover': {
        backgroundColor: '#E9D7DA',
        color: 'red',
      },
    }),
  };

  const selectComp = (  
    <React.Fragment>
      <p className="text-light">{tagsDisabled ? "You can add up to 5 tags" : "Select tag"}</p>
      <CreatableSelect
        defaultValue={tags}
        isMulti
        name="Tags"
        options={suggestions}
        className="basic-multi-select bg-secondary"
        classNamePrefix="You can add up to 5 tags"
        styles={CustomStyle}
        onChange={handleChange}
      />
    </React.Fragment>)

  return (
    <Container>
      <Row>
        <Col md="12">
          {selectComp}
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
                <Form.Group controlId="exampleForm.ControlSelect2">
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
            <Col xs="12">
                <Form.Group controlId="exampleForm.ControlSelect3">
                  <Form.Label className="text-light">Image url</Form.Label>
                  <Form.Control className="bg-secondary border-0 text-light" value={imageUrl} onChange={handleImageUrlChange} placeholder="Enter image url">
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs="9">
                {imageUrl ? <img src={imageUrl} style={{width:"100%", maxHeight:"440px"}}/> : null}  
              </Col>
            </Row>
            <Row className="justify-content-md-center my-2">
              <Col xs="12" md="9">
                  <QuillEditor
                    placeholder="Start posting something"
                    onEditorChange={handleContentChange}
                    currentHTML={props.location.state ? props.location.state.content: null}
                  />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs="12" md={{offset:6, span:6}}>
                  <Button variant="secondary" className="mx-2" type="submit" name="save" value="Save Story" onClick={(event) => {handleSave(event, prePopulated)}}>Save Story</Button>
                  <Button variant="secondary" className="mx-2" type="submit" name="save" value="Publish Story" onClick={(event)=>  {handlePublish(event, prePopulated)}}>Publish Story</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};


