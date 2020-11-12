import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { api, ArticlesResponse } from '@internship/shared/api';
import { BiChevronRight } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';


export const Insights = () => {
  const [insights, setInsights] = useState<ArticlesResponse[]>();
  const history = useHistory();
  const [sessionInfo, setSessionInfo] = useState(false);


  useEffect(() => {
    api.article
      .getInsights()
      .then((response) => {
        setInsights(response);
        console.log(response)
      })
      .catch((e) => console.error(e));
  }, [sessionInfo]);

  const goToLinkHandler = (id) => {
    history.push({
      pathname: 'insights/' + id,
    });
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>Insights</h1>
        </Col>
        {insights?.map((insight) => (
          <Col key={insight.id} xs="3">
            <Card border="primary">
              <Card.Img className="img-fluid" style={{ width: "18rem", height: "15rem" }} variant="top" src="../favicon.ico" />
              <Card.Body>
                <Card.Title>{insight.heading}</Card.Title>
                <Card.Text>
                  {insight.content.substr(0, 150)}...
                  </Card.Text>
                <Card.Link onClick={() => goToLinkHandler(insight.id)} className="float-right"> Go to insight <BiChevronRight /> </Card.Link>
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
