import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Col, Container, Pagination, Row, Spinner } from 'react-bootstrap';
import { api, PageResponse } from '@internship/shared/api';
import { BiChevronRight } from 'react-icons/bi';
import { useHistory, useParams, Link} from 'react-router-dom';
import { faBookmark, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@internship/shared/hooks';
import { Cards } from '@internship/ui';


export const Articles = () => {
  const history = useHistory();
  const {articleType} = useParams();
  const query = useQuery();
  
  const [page, setPage] = useState<PageResponse>();  
  const [sessionInfo, setSessionInfo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(query.get("page"));
    api.article
      .getArticles(articleType, query.get("page"))
      .then((response) => {
        console.log(response);
        setPage(response);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, [sessionInfo]);


  let items = [];


  let paginationBasic = null;
  

  let rendering = <Spinner animation="border"></Spinner>
  if (!loading) {
    for (let number = 1; number <= page.totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === page.number+1} href={`/${articleType}?page=${number}`}>
          {number}
        </Pagination.Item>,
      );
    }

    rendering = (<Cards page={page} articleType={articleType}/>);
    paginationBasic = (
        <div>
          <Pagination>{items}</Pagination>
        </div>
      )
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1 className="text-light">{articleType}</h1>
        </Col>
        {rendering}
        {paginationBasic}
      </Row>
    </Container>
  );
};
