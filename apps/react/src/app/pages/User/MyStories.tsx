import { api, PageResponse,  } from '@internship/shared/api';
import { useQuery } from '@internship/shared/hooks';
import { Cards, Dropdown, Spinner } from '@internship/ui';
import { useHistory, useParams, Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Col, Container, Pagination, Row } from 'react-bootstrap';

export const MyStories = () => {
    const history = useHistory();
    const query = useQuery();
    const [page, setPage] = useState<PageResponse>();  
    const [loading, setLoading] = useState(true);
    const [pageNo, setPageNo] = useState(query.get("page") ? query.get("page") : "0")
    const [articleType, setArticleType] = useState(query.get("articleType"))
    const [isReleased, setIsReleased] = useState(query.get("released") ? query.get("released") : "published" )

    useEffect(() => {
        api.user.getArticles(articleType,pageNo)
            .then((response) => {
                setPage(response)
                setLoading(false);
                console.log(response);
                
            })
    },[pageNo, articleType])
    

    const articleTypeHandler = (event) => {
        history.push({
          pathname: '/user/articles',
          search: '?page=' + pageNo + "&articleType=" + event.target.value + "&sit=" + isReleased
        })
        setArticleType(event.target.value)
      }
    
    const sitHandler = (event) => {
      history.push({
        pathname: '/user/articles',
        search: '?page=' + pageNo + "&articleType=" + articleType + "&sit=" + event.target.value
      })
      setIsReleased(event.target.value);
    }

    //TODO delete that goddamn article.
    const deleteHandler = (event, articleId: number) => {
      api.article.removeArticle(articleId)
        .then((res) => {
          console.log("Removal successful")
        })
        .catch((err) => {
          console.error("Could not be removed")
        })
    }

    let items = [];
    const articleTypes = ["tutorials","insights","engineerings"];
    const articleTypesDropdown = (<Dropdown  options={articleTypes} selected={articleType} onSelectHandler={articleTypeHandler}/>);
    const sitTypes = ["Released", "Draft"];
    const sitTypesDropdown = (<Dropdown options={sitTypes} selected={isReleased} onSelectHandler={sitHandler}/>)

    let rendering = <Spinner/>
    if(!loading){
        for (let number = 1; number <= page.totalPages; number++) {
            items.push(
              <Pagination.Item key={number} active={number === page.number+1} href={`/${articleType}?page=${number}&articleType=${articleType}&sit=${isReleased}`}>
                {number}
              </Pagination.Item>,
            );
      }

        rendering = (<Cards page={page} isMyStories={true} deleteHandler={deleteHandler}/>);

  }

  return (
    <Container>
      <Row>
      <Col xs={12} md={9} className="my-auto">
            <h1 className="text-light">The wisdom you served...</h1>
        </Col>
        <Col xs={12} md={3}>
          {articleTypesDropdown}
          {sitTypesDropdown}
        </Col>
      </Row>
      <Row>
        
        {rendering}
      </Row>
    </Container>
  );
}
