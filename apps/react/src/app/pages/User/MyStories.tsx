import { api, PageResponse,  } from '@internship/shared/api';
import { useQuery } from '@internship/shared/hooks';
import { Cards, Dropdown, Spinner } from '@internship/ui';
import { useHistory, useParams, Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Container, Pagination, Row } from 'react-bootstrap';

export const MyStories = () => {
    const history = useHistory();
    const query = useQuery();
    const [page, setPage] = useState<PageResponse>();  
    const [loading, setLoading] = useState(true);
    const [pageNo, setPageNo] = useState(query.get("page"))
    const [articleType, setArticleType] = useState(query.get("articleType"))
    const [isReleased, setIsReleased] = useState(query.get("released"))

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


      let items = [];
      let paginationBasic = null;
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
        rendering = (<Cards page={page} isMyStories={true}/>);

    }

  return (
    <Container>
      <Row>
        {rendering}
      </Row>
    </Container>
  );
};
