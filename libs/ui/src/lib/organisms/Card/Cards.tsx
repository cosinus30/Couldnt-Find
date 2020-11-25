import { faBookmark, faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  PageResponse } from '@internship/shared/api';
import { Months } from '@internship/shared/types';
import React from 'react';
import { Card as RBCard, Col, Row } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import { isNullOrUndefined } from 'util';
import mySvg from '../../../../../../apps/react/src/assets/girl-1.svg';
import classes from './Cards.module.css';


type CardProps = {
  page: PageResponse;
  articleType?: string;
  articleTypeUrl?: string;
  isMyStories?: boolean;
};


const StyledRBCard= styled(RBCard)
`  
  box-shadow: inset 4px 4px 12px rgba(0, 0, 0, 0.8);
  filter: drop-shadow(4px 4px 6px rgba(123, 123, 123, 0.15));
  cursor: pointer;
`


export const Cards: React.FC<CardProps> = ({ children, ...props }) => {
  const history = useHistory();

  const goToLinkHandler = (id, articleType) => {
    console.log(id);
    console.log(articleType);
    history.push({
      pathname: "/" + articleType +'/' + id,
    });
  }

  if(props.page.content.length == 0){
    return (
      <Row >
        <Col md={12} className="justify-content-center">
          <h2 className="text-light">Uuuups! No content here!</h2>
        </Col>
    </Row>
    )
  }

  return (
    <React.Fragment>
    <Row>
    {    props.page.content?.map((article) => {
        const relDate = new Date(article.releaseDate); 
        var day = relDate.getDate(),
        month = relDate.getMonth(),
        year = relDate.getFullYear();
      return (<Col key={article.id} md="6" xs="12" lg="4">
        <StyledRBCard className={classes.fancy_card + " m-3 bg-mine text-light"}>
          <RBCard.Header>
            <Row>
              <Col xs="8">
                <a>
                  <Row>
                    <Col xs="4" className="pr-1">
                      <img src={mySvg} height="50px" width="100%" alt="React Logo" />
                    </Col>
                    <Col xs="8" className="pl-1">
                      <Row>
                        <Col xs="12">
                          {article.author.username}
                        </Col>
                        <Col xs="12" >
                          <small>{ day + " " + Months[month+1] + " " + year}</small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </a>
              </Col>
            </Row>
          </RBCard.Header>
          <RBCard.Img onClick={() => goToLinkHandler(article.id, article.contentType.toLowerCase() + "s")} 
          style={{maxHeight: "17.5vh", objectFit: "cover" , aspectRatio: "3/2"}} 
          variant="top" 
          src='https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' />
          <RBCard.Body className={classes.CardBody}>
            <div className="my-2">
            {article.tags.map((tag) => {
              return (<div className={classes.tag} key={tag.tagName}>#{tag.tagName}</div>)
            })}
            </div>
            
            <h3>{article.heading}</h3>
            <div style={{height:100, overflowY: 'hidden',maxWidth:'350px' , color: '#E9D7DA !important'}}>
              <div  dangerouslySetInnerHTML={{__html : article.content}}></div>
            </div>
          </RBCard.Body>
          <hr className="bg-primary my-1"/>
            <Row className="mx-1 my-1">
              <Col>
                <Row className="my-2">
                  <Col xs={4}>
                    <small className="float-left">
                      <FontAwesomeIcon icon={faHeart}/><span className="text-muted"> {article.likeCount}</span> 
                    </small>
                  </Col>
                  <Col xs={4}>
                    <small className="float-left">
                      <FontAwesomeIcon icon={faEye}/><span className="text-muted"> {article.viewCount}</span> 
                    </small>
                  </Col>
                  <Col xs={4}>
                    <small className="float-left">
                      <FontAwesomeIcon icon={faBookmark}/><span className="text-muted"> {article.bookmarkCount}</span> 
                    </small>
                  </Col>
                </Row>
              </Col>
            </Row>
        </StyledRBCard>
      </Col>
    )})}

    </Row>
    </React.Fragment>
  );
};
