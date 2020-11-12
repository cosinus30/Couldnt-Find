import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row } from 'react-bootstrap';
import { IconButton } from '../../atoms';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarked } from '@fortawesome/free-solid-svg-icons';


export interface IconButtonRowProps {
    bookmarkHandler: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
    likeHandler: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
    facebookHandler?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
    twitterHandler?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
    bookmarked: boolean;
    liked: boolean;
};

export const IconButtonRow: React.FC<IconButtonRowProps> = ({ children, ...props }) => {
    return (
        <Row>
            <Col md={{ span: 4, offset: 8 }}>
                <IconButton><FontAwesomeIcon icon={faFacebook} onClick={props.facebookHandler} /></IconButton>
                <IconButton><FontAwesomeIcon icon={faTwitter} onClick={props.twitterHandler} /></IconButton>
                {props.bookmarked
                    ? <IconButton><FontAwesomeIcon icon={faBookmarked} onClick={props.bookmarkHandler} /></IconButton>
                    : <IconButton><FontAwesomeIcon icon={faBookmark} onClick={props.bookmarkHandler} /></IconButton>
                }
            </Col>
        </Row>
    );
};
