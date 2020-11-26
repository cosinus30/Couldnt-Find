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
  const [page, setPage] = useState<PageResponse>();  
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState(query.get("sort"))
  const [time, setTime] = useState(query.get("time"))
  const [pageNo, setPageNo] = useState(query.get("page"))

  useEffect(() => {
    api.article
      .getArticles(articleType, query.get("page"), query.get("sort"), QueryParams.defaultSize, query.get("time"))
      .then((response) => {
        setPage(response);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, [sortType,time]);

  const sortHandler = (event) => {
    history.push({
      pathname: '/'+articleType,
      search: '?page=' + pageNo + "&sort=" + QueryParams[event.target.value] + "&time=" +time
    })
    setSortType(QueryParams[event.target.value])
  }

  const spanHandler = (event) => {
    history.push({
      pathname: '/'+articleType,
      search: '?page=' + pageNo + "&sort="+ sortType  + "&time=" + QueryParams[event.target.value]
    })
    setTime(QueryParams[event.target.value])
  }

  let items = [];
  let paginationBasic = null;
  const sortTypes = ["Most recent","Most liked","Most popular"];
  const sortDropdown = (<Dropdown  options={sortTypes} selected={sortType} onSelectHandler={sortHandler}/>);
  const spanTypes = ["3 days", "Week", "Month", "Infinity"];
  const spanDropdown = (<Dropdown options={spanTypes} selected={time} onSelectHandler={spanHandler}/>)
  
  let rendering = <Spinner animation="border"></Spinner>
  if (!loading) {
    for (let number = 1; number <= page.totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === page.number+1} href={`/${articleType}?page=${number}&sort=${sortType}&time=${time}`}>
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
        <Col xs={12} md={9} className="my-auto">
          <a href={"/articles/" + articleType}>
            <h1 className="text-light">{articleType.charAt(0).toUpperCase() + articleType.slice(1)}</h1>
          </a>
        </Col>
        <Col xs={12} md={3}>
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
