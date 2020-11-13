import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Articles,
  ForgotPasswordPage,
  Login, MailErrorPage,
  MailSuccessPage,
  MainPage,
  OAuth2RedirectHandler,
  Profile,
  Register,
  ResetPassword,
  WriteYourStory,
  ArticleDetail,
} from './pages';

export const Routes = ({ children, ...props }) => {
  return (
    <Router {...props}>
      {children}
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/write-your-story" component={WriteYourStory} />
        <Route path="/forgotpassword" component={ForgotPasswordPage} />
        <Route path="/resetpassword" component={ResetPassword} />
        <Route path="/profile" component={Profile} />
        <Route path="/auth" component={OAuth2RedirectHandler} />
        <Route exact path="/mailsuccess" component={MailSuccessPage} />
        <Route exact path="/mailerror" component={MailErrorPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/:articleType/:articleId" 
          component={() => <ArticleDetail {...props} key={window.location.pathname}/>} />
        <Route path="/:articleType" component={() => <Articles {...props} key={window.location.pathname}/>} />
      </Switch>
    </Router>
  );
};
