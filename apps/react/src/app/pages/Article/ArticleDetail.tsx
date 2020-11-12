import { api, ArticleResponse } from '@internship/shared/api';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { DetailedCard, Spinner } from '@internship/ui';

export const ArticleDetail = (props) => {
    const { articleType ,articleId } = useParams();
    const [articleDetail, setArticleDetail] = useState<ArticleResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.article
            .getArticleById(articleType ,articleId)
            .then((response) => {
                setArticleDetail(response);
                setLoading(false);
            })
            .catch((err) => {
                console.log("something went wrong");
            })
    }, []);

    const likeHandler = (articleId: number) => {
        if(articleDetail.liked)
        {            
            api.article.unlike(articleId)
                .then((response) => {
                    setArticleDetail({ ...articleDetail, liked: false });
                })
                .catch((error) => {
                    console.log("something went wrong");
                })
        }else{
            api.article.like(articleId)
            .then((response) => {
                setArticleDetail({ ...articleDetail, liked: true });
            })
            .catch((error) => {
                console.log("something went wrong");
            })
        }
    }

    const bookmarkHandler = (articleId: number, event) => {
        event.preventDefault();
        if (articleDetail.bookmarked)
            api.article.unbookmark(articleId)
                .then((response) => {
                    setArticleDetail({ ...articleDetail, bookmarked: false })
                })
                .catch((error) => {
                    console.log("Something went wrong!");
                })
        else {
            api.article.bookmark(articleId)
                .then((response) => {
                    setArticleDetail({ ...articleDetail, bookmarked: true })
                })
                .catch((error) => {
                    console.log("Something went wrong!");
                })
        }
    }

    let rendering = <Spinner/>
    if (!loading) {
        rendering = (
            <DetailedCard articleDetail={articleDetail}
                userInteraction={{
                    bookmarked: articleDetail.bookmarked,
                    liked: articleDetail.liked,
                    bookmarkHandler: (event) => bookmarkHandler(articleDetail.article.id, event),
                    likeHandler: () => likeHandler(articleDetail.article.id)
                }}>
            </DetailedCard>
        );
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