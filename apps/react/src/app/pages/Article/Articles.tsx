import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Col, Container, Row, Spinner } from 'react-bootstrap';
import { api, ArticlesResponse } from '@internship/shared/api';
import { BiChevronRight } from 'react-icons/bi';
import { useHistory, useParams } from 'react-router-dom';
import { faBookmark, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const Articles = () => {
  const history = useHistory();
  const {articleType} = useParams();
  
  const [articles, setarticles] = useState<ArticlesResponse[]>();  
  const [sessionInfo, setSessionInfo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(articleType);
    api.article
      .getArticles(articleType)
      .then((response) => {
        setarticles(response);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, [sessionInfo]);

  const goToLinkHandler = (id) => {
    console.log(id);
    history.push({
      pathname: articleType +'/' + id,
    });
  }

  let rendering = <Spinner animation="border"></Spinner>
  if (!loading) {
    rendering = (
      articles?.map((article) => (
        <Col key={article.id} md="6" xs="12" lg="4">
          <Card border="primary" >
            <Card.Img className="img-fluid" onClick={() => goToLinkHandler(article.id)} style={{height: "15rem" }} variant="top" src="../favicon.ico" />
            <Card.Body>
              <Card.Title>{article.heading}</Card.Title>
              <Card.Text>
                {article.content.substr(0, 150)}...
            </Card.Text>
              <Card.Link onClick={() => goToLinkHandler(article.id)} className="float-right"> Go to article<BiChevronRight /> </Card.Link>
            </Card.Body>
            <Card.Footer>
              <Row>
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
                <Col>
                <small className="text-muted float-right">Written by {article.author.username}</small>
                </Col>
              </Row>



            </Card.Footer>
          </Card>
        </Col>
      )))
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>{articleType}</h1>
        </Col>
        {rendering}
      </Row>
    </Container>
  );
};
