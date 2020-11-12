import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as emptyFaBookmark, faHeart as emptyFaHeart } from '@fortawesome/fontawesome-free-regular'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { api, ArticleResponse } from '@internship/shared/api';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DetailedCard, IconButton, IconButtonRow } from '@internship/ui';

export const TutorialDetail = (props) => {
    const { articleId } = useParams();
    const [articleDetail, setArticleDetail] = useState<ArticleResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.article
            .getTutorialById(articleId)
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

    const bookmarkHandler = (articleId: number) => {
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

    let rendering = <Spinner variant="primary" animation="border" 
    style ={ { position: "fixed", top: "50%", left: "50%"}} ></Spinner>
    if (!loading) {
        rendering = (
            <DetailedCard articleDetail={articleDetail}
                userInteraction={{
                    bookmarked: articleDetail.bookmarked,
                    liked: articleDetail.liked,
                    bookmarkHandler: () => bookmarkHandler(articleDetail.article.id),
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