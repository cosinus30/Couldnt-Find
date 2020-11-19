import { ArticleResponse } from '@internship/shared/api';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { IconButtonRow, IconButtonRowProps } from '../../molecules';
import classes from './DetailedCard.module.css'
import mySvg from '../../../../../../apps/react/src/assets/girl-1.svg';
import { Months } from '@internship/shared/types';
import { faBookmark, faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type DetailCardProps = {
  articleDetail: ArticleResponse;
  userInteraction: IconButtonRowProps;
};

export const DetailedCard: React.FC<DetailCardProps> = ({ children, ...props }) => {
  const relDate = new Date(props.articleDetail.article.releaseDate); 

  var day = relDate.getDate(),
  month = relDate.getMonth(),
  year = relDate.getFullYear();


  return (
    <Card bg="secondary" className="mx-auto my-5" text="light">
      <Card.Body className="pt-0">
        <Card.Header >
          <Row>
            <Col xs="4">
              <Row>
                <Col xs="4" className="pr-1">
                  <img src={mySvg} height="50px" width="50px" alt="React Logo" />
                </Col>
                <Col xs="8" className="pl-0">
                  <Row>
                    <Col xs="12">
                      {props.articleDetail.article.author.username}
                    </Col>
                    <Col xs="12" >
                      <small>{ day + " " + Months[month+1] + " " + year}</small>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs="8">
              <IconButtonRow {...props.userInteraction}></IconButtonRow>
            </Col>
          </Row>
        </Card.Header>
        <Card.Title>{props.articleDetail.article.heading}</Card.Title>
        <div>
          <div className={classes.pre} dangerouslySetInnerHTML={{__html : props.articleDetail.article.content}}></div>
        </div>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col xs={2}>
            <small className="float-left">
              <FontAwesomeIcon icon={faHeart}/><span className="text-muted"> 3 likes</span> 
            </small>
          </Col>
          <Col xs={2}>
            <small className="float-left">
              <FontAwesomeIcon icon={faEye}/><span className="text-muted"> 4 views</span> 
            </small>
          </Col>
          <Col xs={2}>
            <small className="float-left">
              <FontAwesomeIcon icon={faBookmark}/><span className="text-muted"> 5 bookmarks</span> 
            </small>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
