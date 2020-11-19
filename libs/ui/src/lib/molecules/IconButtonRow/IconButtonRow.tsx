import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'react-bootstrap';
import { IconButton } from '../../atoms';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarked, faHeart as faLiked} from '@fortawesome/free-solid-svg-icons';


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
            <Col>
                <IconButton><FontAwesomeIcon className="text-light" icon={faFacebook} onClick={props.facebookHandler} /></IconButton>
                <IconButton><FontAwesomeIcon className="text-light" icon={faTwitter} onClick={props.twitterHandler} /></IconButton>
                {props.bookmarked
                    ? <IconButton><FontAwesomeIcon className="text-light" icon={faBookmarked} onClick={props.bookmarkHandler} /></IconButton>
                    : <IconButton><FontAwesomeIcon className="text-light" icon={faBookmark} onClick={props.bookmarkHandler} /></IconButton>
                }
                {props.liked
                    ? <IconButton onClick={props.likeHandler}><FontAwesomeIcon className="text-light" icon={faLiked}  /></IconButton>
                    : <IconButton onClick={props.likeHandler} ><FontAwesomeIcon className="text-light" icon={faHeart}/></IconButton>
                }
            </Col>
        </Row>
    );
};
