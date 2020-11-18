import { api, PageResponse } from '@internship/shared/api';
import { QueryParams } from '@internship/shared/types';
import { Cards, Spinner } from '@internship/ui';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';

export const MainPage = () => {
  
  const [tutorials, setTutorials] = useState<PageResponse>();
  const [insights, setInsights] = useState<PageResponse>();
  const [engineerings, setEngineerings] = useState<PageResponse>();
  const [tutorialsLoading, setTutorialsLoading] = useState(true);
  const [insightsLoading, setInsightsLoading] = useState(true);
  const [engineeringsLoading, setEngineeringsLoading] = useState(true);



  useEffect(() => {
    api.article.getArticles("tutorials", "0", QueryParams["Most recent"], QueryParams.mainPageSize, QueryParams.Infinity)
    .then((response) =>{
        setTutorials(response);
        setTutorialsLoading(false);
      }
    ).catch((error) => {
      console.log("Uuups");
    })

    api.article.getArticles("insights", "0", QueryParams["Most recent"], QueryParams.mainPageSize, QueryParams.Infinity)
    .then((response) =>{
        setInsights(response);
        setInsightsLoading(false);
      }
    ).catch((error) => {
      console.log("Uuups");
    })

    api.article.getArticles("engineerings", "0", QueryParams["Most recent"], QueryParams.mainPageSize, QueryParams.Infinity)
    .then((response) =>{
        setEngineerings(response);
        setEngineeringsLoading(false);
      }
    ).catch((error) => {
      console.log("Uuups");
    })
  },[])

  let tutorialsRendering = <Spinner animation="border"></Spinner>;
  let insightsRendering = <Spinner animation="border"></Spinner>;
  let engineeringsRendering = <Spinner animation="border"></Spinner>;
  
  if(!tutorialsLoading){
    tutorialsRendering = (<Cards page={tutorials} articleType={"tutorials"} articleTypeUrl={window.location.href + "tutorials"}/>);
  }
  if(!insightsLoading){
    insightsRendering = (<Cards page={insights} articleType={"insights"} articleTypeUrl={window.location.href + "insights"}/>);
  }
  if(!engineeringsLoading){
    engineeringsRendering = (<Cards page={engineerings} articleType={"engineerings"} articleTypeUrl={window.location.href + "engineerings"}/>);
  }
  
  return (
    <Container>
      <Row>
      {tutorialsRendering}
      </Row>
      <Row>
      {insightsRendering}
      </Row>
      <Row>
      {engineeringsRendering}
      </Row>
    </Container>
  );
};
