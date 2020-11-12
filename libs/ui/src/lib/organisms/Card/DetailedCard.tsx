import { ArticleResponse } from '@internship/shared/api';
import React from 'react';
import { Card } from 'react-bootstrap';
import { IconButtonRow, IconButtonRowProps } from '../../molecules';

type DetailCardProps = {
  articleDetail: ArticleResponse;
  userInteraction: IconButtonRowProps;
};

export const DetailedCard: React.FC<DetailCardProps> = ({ children, ...props }) => {
  return (
    <Card bg="secondary" className="mx-auto my-5" text="light">
      <Card.Body>
        <IconButtonRow {...props.userInteraction}></IconButtonRow>
        <Card.Title>{props.articleDetail.article.heading}</Card.Title>
        <Card.Text>
          {props.articleDetail.article.readTime} min read
      </Card.Text>
        <Card.Text>
          {props.articleDetail.article.content}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <p>{props.articleDetail.article.releaseDate}</p>
      </Card.Footer>
    </Card>
  );
};
