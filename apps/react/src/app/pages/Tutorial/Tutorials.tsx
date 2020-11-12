import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Col, Container, Row, Spinner } from 'react-bootstrap';
import { api, ArticlesResponse } from '@internship/shared/api';
import { BiChevronRight } from 'react-icons/bi';
import { useHistory, useParams } from 'react-router-dom';


export const Tutorials = () => {
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
        <Col key={article.id} md="6" sm="12" lg="4">
          <Card border="primary" >
            <Card.Img className="img-fluid" onClick={() => goToLinkHandler(article.id)} style={{ width: "18rem", height: "15rem" }} variant="top" src="../favicon.ico" />
            <Card.Body>
              <Card.Title>{article.heading}</Card.Title>
              <Card.Text>
                {article.content.substr(0, 150)}...
            </Card.Text>
              <Card.Link onClick={() => goToLinkHandler(article.id)} className="float-right"> Go to {articleType}<BiChevronRight /> </Card.Link>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Written by {article.author.username}</small>
              <small className="text-muted">Liked by {article.likeCount}</small>
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
