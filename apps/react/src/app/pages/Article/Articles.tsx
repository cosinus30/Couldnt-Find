import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Col, Container, Pagination, Row, Spinner } from 'react-bootstrap';
import { api, PageResponse } from '@internship/shared/api';
import { BiChevronRight } from 'react-icons/bi';
import { useHistory, useParams, Link} from 'react-router-dom';
import { faBookmark, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@internship/shared/hooks';


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

  const goToLinkHandler = (id) => {
    console.log(id);
    history.push({
      pathname: articleType +'/' + id,
    });
  }
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

    rendering = (
      page.content?.map((article) => (
        <Col key={article.id} md="6" xs="12" lg="4">
          <Card border="primary" >
            <Card.Img className="img-fluid" onClick={() => goToLinkHandler(article.id)} style={{height: "15rem" }} variant="top" src="../favicon.ico" />
            <Card.Body>
              <Card.Title>{article.heading}</Card.Title>
              <Card.Text>
                {article.content.substr(0, 150)}...
            </Card.Text>
              <Card.Link onClick={() => goToLinkHandler(article.id)} className="float-right"> Go to article<BiChevronRight /> </Card.Link>
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col>
                  <Row>
                    <Col xs={12}>
                      <small className="float-left">
                        <FontAwesomeIcon icon={faHeart}/><span className="text-muted"> {article.likeCount} likes</span> 
                      </small>
                    </Col>
                    <Col xs={12}>
                      <small className="float-left">
                        <FontAwesomeIcon icon={faEye}/><span className="text-muted"> {article.viewCount} views</span> 
                      </small>
                    </Col>
                    <Col xs={12}>
                      <small className="float-left">
                        <FontAwesomeIcon icon={faBookmark}/><span className="text-muted"> {article.bookmarkCount} bookmarks</span> 
                      </small>
                    </Col>
                  </Row>
                </Col>
                <Col>
                <small className="text-muted float-right">Written by {article.author.username}</small>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      )));
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
          <h1>{articleType}</h1>
        </Col>
        {rendering}
        {paginationBasic}
      </Row>
    </Container>
  );
};
