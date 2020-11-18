import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Col, Container, Pagination, Row, Spinner } from 'react-bootstrap';
import { api, PageResponse } from '@internship/shared/api';
import { useHistory, useParams, Link} from 'react-router-dom';
import { useQuery } from '@internship/shared/hooks';
import { Cards, Dropdown } from '@internship/ui';
import { QueryParams } from '@internship/shared/types';


export const Articles = () => {
  const history = useHistory();
  const {articleType} = useParams();
  const query = useQuery();

  console.log(articleType);

  const [page, setPage] = useState<PageResponse>();  
  const [loading, setLoading] = useState(true);

  // TODO Put these into global store
  // ! Initial values are should be QueryParams["Most recent"] for sortType, QueryParams["3 days"] for span
  const [sortType, setSortType] = useState(QueryParams["Most recent"]);
  const [span, setSpan] = useState(QueryParams["3 days"]);

  useEffect(() => {
    api.article
      .getArticles(articleType, query.get("page"), sortType, QueryParams.defaultSize, span)
      .then((response) => {
        console.log(response);
        setPage(response);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, [sortType, span]);

  const sortHandler = (event) => {
    setSortType(QueryParams[event.target.value]);
  }

  const spanHandler = (event) => {
    setSpan(QueryParams[event.target.value])
  }

  let items = [];
  let paginationBasic = null;
  const sortTypes = ["Most recent","Most liked","Most popular"];
  const sortDropdown = (<Dropdown  options={sortTypes} onSelectHandler={sortHandler}/>);
  const spanTypes = ["3 days", "Week", "Month", "Infinity"];
  const spanDropdown = (<Dropdown options={spanTypes} onSelectHandler={spanHandler}/>)
  
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
        <Col xs={12} md={{offset:9, span:3}}>
          {sortDropdown}
          {spanDropdown}
        </Col>
      </Row>
      <Row className="justify-content-center">
        {rendering}
      </Row>
      <Row className="justify-content-center">
        {paginationBasic}
      </Row>
    </Container>
  );
};
