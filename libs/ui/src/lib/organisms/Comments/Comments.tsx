import { faEllipsisH, faPoop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommentResponse } from '@internship/shared/api';
import { Months } from '@internship/shared/types';
import React, { MouseEvent, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import mySvg from '../../../../../../apps/react/src/assets/girl-1.svg';
import classes from './Comment.module.css'



type CommentProps = {
    comments: CommentResponse[];
    addCommentHandler : any;
    onContentChange : any;
};


export const Comments: React.FC<CommentProps>= ({ children,...props}) => {
    let rendering = null;
    const makeComments = (
        <Card className={"my-3 bg-secondary text-light"}>
            <Card.Body>  
                <Form onSubmit={props.addCommentHandler}>
                    <Form.Control className="bg-secondary text-light" onChange={props.onContentChange} as="textarea" rows={3} placeholder="Well. Come on then..." />
                    <Button className="bg-primary float-right" type="submit" name="save">Add</Button>
                </Form>
            </Card.Body>
        </Card>
    )

    if(props.comments.length === 0) {
        rendering = (
            <Alert className="bg-secondary text-light">
                <FontAwesomeIcon icon={faPoop}/> Looks like there is no comment. Wanna be first? 
            </Alert>)
    }
    else{
        rendering = (
            <React.Fragment>

            {
                props.comments.map((comment) => {
                    const relDate = new Date(comment.commentDate); 
                    var day = relDate.getDate(),
                    month = relDate.getMonth(),
                    year = relDate.getFullYear();

                    return (
                        <Card className={classes.Card + " my-3 bg-secondary text-light"} key={comment.id}>
                            <Card.Header>
                                <Row>
                                    <Col xs="4">
                                        <Row>
                                            <Col xs="4" className="pr-1 my-auto">
                                                <img src={mySvg} height="30px" width="100%" alt="React Logo" />
                                            </Col>
                                            <Col xs="8" className={classes.textMuted + " pl-1"}>
                                                <Row>
                                                    <Col xs="12">
                                                        {comment.user.username}
                                                    </Col>
                                                    <Col xs="12" >
                                                        <small>{ day + " " + Months[month+1] + " " + year}</small>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="my-auto">
                                        <FontAwesomeIcon className="float-right" icon={faEllipsisH}/>
                                    </Col>
                                </Row>    
                            </Card.Header>
                            <Card.Body>{comment.content}</Card.Body>
                        </Card>
                    )
                })
            }
            </React.Fragment>
        )
    }


    return (
        <div>
            {makeComments}
            {rendering}
        </div>
    )
}