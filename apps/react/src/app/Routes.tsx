import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Tutorials,
  ForgotPasswordPage,
  Login, MailErrorPage,
  MailSuccessPage,
  MainPage,
  OAuth2RedirectHandler,
  Profile,
  Register,
  ResetPassword,
  WriteYourStory,
  TutorialDetail,
  Insights,
  InsightDetail,
  Engineerings,
  EngineeringDetail
} from './pages';

export const Routes = ({ children, ...props }) => {
  return (
    <Router {...props}>
      {children}
      <Route exact path="/" component={MainPage} />
      <Switch>
        <Route path="/:articleType/:articleId" 
          component={() => <TutorialDetail {...props} key={window.location.pathname}/>} />
        <Route path="/:articleType" component={() => <Tutorials {...props} key={window.location.pathname}/>} />
      </Switch>
      <Route path="/write-your-story" component={WriteYourStory} />
      <Route path="/forgotpassword" component={ForgotPasswordPage} />
      <Route path="/resetpassword" component={ResetPassword} />
      <Route path="/profile" component={Profile} />
      <Route path="/auth" component={OAuth2RedirectHandler} />
      <Route exact path="/mailsuccess" component={MailSuccessPage} />
      <Route exact path="/mailerror" component={MailErrorPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Router>
  );
};
