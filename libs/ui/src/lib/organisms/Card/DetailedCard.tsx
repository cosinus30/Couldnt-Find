import { ArticleResponse } from '@internship/shared/api';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { IconButtonRow, IconButtonRowProps } from '../../molecules';
import classes from './DetailedCard.module.css'
import mySvg from '../../../../../../apps/react/src/assets/girl-1.svg';
import { Months } from '@internship/shared/types';
import { faBookmark, faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../../atoms';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

type DetailCardProps = {
  articleDetail: ArticleResponse;
  userInteraction: IconButtonRowProps;
  commentHandler: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
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
              <a href="#">
                <Row>
                  <Col xs="4" className="pr-1">
                    <img src={mySvg} height="50px" width="100%" alt="React Logo" />
                  </Col>
                  <Col xs="8" className="pl-1">
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
              </a>
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
          <Col xs={2} className="my-auto">
            <small className="float-left my-auto">
              <FontAwesomeIcon icon={faHeart}/><span className="text-muted"> {props.articleDetail.article.likeCount} likes</span> 
            </small>
          </Col>
          <Col xs={2} className="my-auto">
            <small className="float-left ">
              <FontAwesomeIcon icon={faEye}/><span className="text-muted"> {props.articleDetail.article.viewCount} views</span> 
            </small>
          </Col>
          <Col xs={2} className="my-auto">
            <small className="float-left">
  <FontAwesomeIcon icon={faBookmark}/><span className="text-muted"> {props.articleDetail.article.bookmarkCount} bookmarks</span> 
            </small>
          </Col>
          <Col>
            <small className="float-right">
              <IconButton onClick={props.commentHandler} className="text-light"><FontAwesomeIcon icon={faCommentDots}/>
  <span> <small>{props.articleDetail.article.commentCount}Comments</small></span>
              </IconButton>
            </small>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
 