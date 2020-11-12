import { api, ArticleResponse } from '@internship/shared/api';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom'

export const EngineeringDetail = (props) => {
    const { articleId } = useParams();
    const [article, setArticle] = useState({
        content: "",
        heading: "",
        releaseDate: "",
        contentType: "",
        readTime: 0,
        author: "",
    });
    const [sessionInfo, setSessionInfo] = useState(false);

    useEffect(() => {
        api.article
            .getTutorialById(articleId)
            .then((res) => {
                setArticle({ ...article, ...res })
                console.log("HELLOOOO")
                console.log(article);

            })
            .catch((err) => {
                console.log("something went wrong");

            })
    }, [sessionInfo]);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="9">
                    <Card>
                        <Card.Header></Card.Header>
                        <Card.Body>
                            <Card.Title>{article.heading}</Card.Title>
                            <Card.Text>
                                {article.readTime} min read
                            </Card.Text>
                            <Card.Text>
                                {article.content}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <p>{article.releaseDate}</p>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>

    )
}