import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Col, Container, Row, Spinner } from 'react-bootstrap';
import { api, ArticlesResponse } from '@internship/shared/api';
import { BiChevronRight } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';


export const Tutorials = () => {
  const [tutorials, setTutorials] = useState<ArticlesResponse[]>();
  const history = useHistory();
  const [sessionInfo, setSessionInfo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.article
      .getTutorials()
      .then((response) => {
        setTutorials(response);
        setLoading(false);
        console.log(tutorials);
      })
      .catch((e) => console.error(e));
  }, [sessionInfo]);

  const goToLinkHandler = (id) => {
    console.log(id);
    history.push({
      pathname: 'tutorials/' + id,
    });
  }

  let rendering = <Spinner animation="border"></Spinner>
  if (!loading) {
    rendering = (
      tutorials?.map((tutorial) => (
        <Col key={tutorial.id} md="6" sm="12" lg="4">
          <Card border="primary" >
            <Card.Img className="img-fluid" onClick={() => goToLinkHandler(tutorial.id)} style={{ width: "18rem", height: "15rem" }} variant="top" src="../favicon.ico" />
            <Card.Body>
              <Card.Title>{tutorial.heading}</Card.Title>
              <Card.Text>
                {tutorial.content.substr(0, 150)}...
            </Card.Text>
              <Card.Link onClick={() => goToLinkHandler(tutorial.id)} className="float-right"> Go to tutorial <BiChevronRight /> </Card.Link>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Written by {tutorial.author.username}</small>
              <small className="text-muted">Liked by {tutorial.likeCount}</small>
            </Card.Footer>
          </Card>
        </Col>
      )))
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>Tutorials</h1>
        </Col>
        {rendering}
      </Row>
    </Container>
  );
};
