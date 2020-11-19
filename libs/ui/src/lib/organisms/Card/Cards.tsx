import { faBookmark, faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  PageResponse } from '@internship/shared/api';
import React from 'react';
import { Card as RBCard, Col, Row } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import code from './codecode.jpg';
import styled from 'styled-components';

type CardProps = {
  page: PageResponse;
  articleType: string;
  articleTypeUrl?: string;
};


const StyledRBCard= styled(RBCard)
`  
  box-shadow: inset 4px 4px 12px rgba(0, 0, 0, 0.8);
  filter: drop-shadow(4px 4px 6px rgba(123, 123, 123, 0.15));
  cursor: pointer;
`


export const Cards: React.FC<CardProps> = ({ children, ...props }) => {
  const history = useHistory();

  const goToLinkHandler = (id) => {
    console.log(id);
    history.push({
      pathname: props.articleType +'/' + id,
    });
  }

  if(props.page.content.length == 0){
    return (
      <Row >
        <Col md={12}>
          <h1 className="text-light">{props.articleType.charAt(0).toUpperCase() + props.articleType.slice(1)}</h1>
        </Col>
        <Col md={12} className="justify-content-center">
          <h2 className="text-light">Uuuups! No content here!</h2>
        </Col>
    </Row>
    )
  }

  return (
    <React.Fragment>
    <Row >
      <Col md={12}>
        <a href={props.articleTypeUrl}>
          <h1 className="text-light">{props.articleType.charAt(0).toUpperCase() + props.articleType.slice(1)}</h1>
        </a>
      </Col>
    </Row>
    <Row>
    {    props.page.content?.map((article) => (
      <Col key={article.id} md="6" xs="12" lg="4">
        <StyledRBCard className="m-3 bg-mine text-light"  onClick={() => goToLinkHandler(article.id)}>
          <RBCard.Img style={{maxHeight: "25vh", objectFit: "cover" , aspectRatio: "3/2"}} variant="top" src={code} />
          <RBCard.Body>
            <RBCard.Title>{article.heading}</RBCard.Title>
            <div style={{height:150, overflowY: 'hidden',width:'300px' , color: '#E9D7DA !important'}} >
              <div style={{color: '#E9D7DA !important'}} dangerouslySetInnerHTML={{__html : article.content}}></div>
            </div>
          </RBCard.Body>
          <hr className="bg-primary my-1"/>
            <Row className="mx-1 my-1">
              <Col>
                <Row>
                  <Col xs={12}>
                    <small className="float-left">
                      <FontAwesomeIcon icon={faHeart}/><span className="text-muted"> {article.likeCount} likes</span> 
                    </small>
                  </Col>
                  <Col xs={12}>
                    <small className="float-left">
                      <FontAwesomeIcon icon={faEye}/><span className="text-muted"> {article.viewCount} views</span> 
                    </small>
                  </Col>
                  <Col xs={12}>
                    <small className="float-left">
                      <FontAwesomeIcon icon={faBookmark}/><span className="text-muted"> {article.bookmarkCount} bookmarks</span> 
                    </small>
                  </Col>
                </Row>
              </Col>
              <Col className="my-auto">
              <small className="text-muted float-right">Written by {article.author.username}</small>
              </Col>
            </Row>
        </StyledRBCard>
      </Col>
    ))}

    </Row>
    </React.Fragment>
  );
};
