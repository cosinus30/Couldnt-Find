import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Col, Container, Row } from 'react-bootstrap';
import { api, ArticleResponse } from '@internship/shared/api';
import { BiChevronRight } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';


export const Tutorials = () => {
  const [tutorials, setTutorials] = useState<ArticleResponse[]>();
  const history = useHistory();
  const [sessionInfo, setSessionInfo] = useState(false);

  useEffect(() => {
    api.article
      .getTutorials()
      .then((response) => {
        setTutorials(response);
        console.log(response)
      })
      .catch((e) => console.error(e));
  }, [sessionInfo]);

  const goToLinkHandler = (id) => {
    history.push({
      pathname: 'tutorials/' + id,
    });
  }

  return (
    <Container>
      <Row>
        {tutorials?.map((tutorial) => (
          <Col key={tutorial.articleId} xs="3">
            <Card>
              <Card.Img variant="top" src="../favicon.ico" />
              <Card.Body>
                <Card.Title>{tutorial.heading}</Card.Title>
                <Card.Text>
                  {tutorial.content.substr(0, 150)}...
                  </Card.Text>
                <Card.Link onClick={() => goToLinkHandler(tutorial.articleId)} className="float-right"> Go to tutorial <BiChevronRight /> </Card.Link>
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
