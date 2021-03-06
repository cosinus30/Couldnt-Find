import { api, ArticleResponse, CommentResponse } from '@internship/shared/api';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Route, useParams, useHistory } from 'react-router-dom'
import { Comments, DetailedCard, Spinner } from '@internship/ui';

export const ArticleDetail = (props) => {
    const { articleType ,articleId } = useParams();
    const [articleDetail, setArticleDetail] = useState<ArticleResponse>();
    const [comments, setComments] = useState<CommentResponse[]>();
    const [loading, setLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(true);
    const [commentShow, setCommentShow] = useState(false);
    const [commentContent, setCommentContent] = useState("");


    const history = useHistory();

    useEffect(() => {
        api.article
            .getArticleById(articleType ,articleId)
            .then((response) => {
                setArticleDetail(response);
                setLoading(false);
            })
            .catch((err) => {
                console.error("something went wrong");
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
                    console.error("something went wrong");
                })
        }else{
            api.article.like(articleId)
            .then((response) => {
                setArticleDetail({ ...articleDetail, liked: true });
            })
            .catch((error) => {
                console.error("something went wrong");
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
                    console.error("Something went wrong!");
                })
        else {
            api.article.bookmark(articleId)
                .then((response) => {
                    setArticleDetail({ ...articleDetail, bookmarked: true })
                })
                .catch((error) => {
                    console.error("Something went wrong!");
                })
        }
    }

    const addCommentHandler = (event) => {
        event.preventDefault();
        api.article
            .makeComment(articleType, articleId, commentContent)
            .then((response) => {
                setCommentContent("")
                commentHandler(articleType, articleId);
                setCommentLoading(true);
                setCommentShow(true);
            })
            .catch((error) => {
                console.error("Something went wrong!");
            })
    }

    const commentHandler = (articleId: number, event) => {
        if(commentLoading){
            api.article
            .getComments(articleType ,articleId)
            .then((response) => {
                setComments(response);
                setCommentShow(true);
                setCommentLoading(false);
            })
            .catch((error) => {
                console.error("Something went wrong!");
            })
        }
        else{
            setCommentShow(!commentShow);
        }
    }

    const onContentChange = (e) =>{
        setCommentContent(e.target.value);
    }

    let rendering = <Spinner/>
    if (!loading) {
        rendering = (
            <React.Fragment>
            <DetailedCard articleDetail={articleDetail}
                userInteraction={{
                    bookmarked: articleDetail.bookmarked,
                    liked: articleDetail.liked,
                    bookmarkHandler: (event) => bookmarkHandler(articleDetail.article.id, event),
                    likeHandler: () => likeHandler(articleDetail.article.id)
                }}
                commentHandler= {(event) => commentHandler(articleDetail.article.id, event)}
                >
            </DetailedCard>
            </React.Fragment>
        );
    }
    let commentsRender = <Spinner/>;
    if(!commentLoading && commentShow){
        commentsRender =  <Comments addCommentHandler={addCommentHandler} onContentChange={onContentChange} comments={comments} />
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="9">
                    {rendering}
                    {commentsRender}
                </Col>
            </Row>
        </Container>

    )
}