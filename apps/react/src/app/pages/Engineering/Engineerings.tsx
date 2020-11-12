import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Col, Container, Row } from 'react-bootstrap';
import { api, ArticleResponse } from '@internship/shared/api';
import { BiChevronRight } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';


export const Engineerings = () => {
  const [engineerings, setEngineerings] = useState<ArticleResponse[]>();
  const history = useHistory();
  const [sessionInfo, setSessionInfo] = useState(false);

  useEffect(() => {
    api.article
      .getEngineerings()
      .then((response) => {
        setEngineerings(response);
        console.log(response)
      })
      .catch((e) => console.error(e));
  }, [sessionInfo]);

  const goToLinkHandler = (id) => {
    history.push({
      pathname: 'engineerings/' + id,
    });
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>Engineerings</h1>
        </Col>
        {engineerings?.map((engineering) => (
          <Col key={engineering.articleId} xs="3">
            <Card>
              <Card.Img variant="top" src="../favicon.ico" />
              <Card.Body>
                <Card.Title>{engineering.heading}</Card.Title>
                <Card.Text>
                  {engineering.content.substr(0, 150)}...
                  </Card.Text>
                <Card.Link onClick={() => goToLinkHandler(engineering.articleId)} className="float-right"> Go to engineering <BiChevronRight /> </Card.Link>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
