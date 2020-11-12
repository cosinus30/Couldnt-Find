import { api, ArticleResponse } from '@internship/shared/api';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom'

export const InsightDetail = (props) => {
    const { articleId } = useParams();
    const [articleDetail, setArticleDetail] = useState<ArticleResponse>();
    const [sessionInfo, setSessionInfo] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.article
            .getInsightById(articleId)
            .then((response) => {
                setArticleDetail(response)
                setLoading(false);
                console.log(response);
            })
            .catch((err) => {
                console.log("something went wrong");
            })
    }, [sessionInfo]);

    let rendering = <Spinner animation="border"></Spinner>;

    if (!loading) {
        rendering = (
            <Card>
                <Card.Header></Card.Header>
                <Card.Body>
                    <Card.Title>{articleDetail.article.heading}</Card.Title>
                    <Card.Text>
                        {articleDetail.article.readTime} min read
                </Card.Text>
                    <Card.Text>
                        {articleDetail.article.content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <p>{articleDetail.article.releaseDate}</p>
                </Card.Footer>
            </Card>
        )
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="9">
                    {rendering}
                </Col>
            </Row>
        </Container>

    )
}