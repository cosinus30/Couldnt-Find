import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Row, Container, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginAsync } from '@internship/store/authentication';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { Button, Captcha, Input, Welcome } from '@internship/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useHistory } from 'react-router-dom';


export const Login = () => {
  const { handleSubmit, register, errors } = useForm();
  const { isCaptchaRequired, isErrorRequired, isSuccessRequired } = useTemporary();
  const { isAuthenticated } = useAuthentication();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (values) => {
    dispatch(loginAsync.request(values));
  };

  const onChange = (event) => {
    const { name } = event.target;
    if (name === 'username' || name === 'password') {
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    }
  };

  useEffect(() => {
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  }, [isSuccessRequired]);

  useEffect(() => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  return (
    <Container>
      <Row style={{height:'85vh'}}>
        <Col xs={12} md={6} className="d-xs-none d-md-block my-auto mx-auto justify-content-center text-light"> 
          <Welcome />
        </Col>
        <Col xs={12} md={6} className="my-auto justify-content-center text-light">
          <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="text text-center">Enter your information to log into your account.</h4>
            <Row>
              <div className="col-4 mt-2">
                <label>User Name</label>
              </div>
              <div className="col-8 ">
                <Input
                  placeholder="Enter username"
                  type="text"
                  name="username"
                  onChange={onChange}
                  ref={register({ required: true })}
                  errors={errors}
                />
              </div>
            </Row>
            <Row>
              <div className="col-4 mt-2">
                <label>Password</label>
              </div>
              <div className="col-8">
                <Input
                  placeholder="Enter password"
                  type="password"
                  name="password"
                  onChange={onChange}
                  ref={register({ required: true })}
                  errors={errors}
                />
              </div>
            </Row>
            <Row>
              <div className="col-8">
                <div className="row">
                  <div className="col-5">
                  <label htmlFor="rememberMe"> Remember me</label>
                </div>
                <div className="col-7 float-left">
                  <input type="checkbox" name="rememberMe" onChange={onChange} ref={register({ required: false })} />
                </div>
                </div>
              </div>
              <div className="col-4">
                <Button className="bg-secondary float-right text-light mx-auto" type="submit">
                    Login
                </Button>
              </div>
            </Row>
            {isCaptchaRequired ? (
              <Row>
                <div className="col-8">
                  <Captcha name="captcha" ref={register({ required: true })} />
                </div>
              </Row>
            ) : null}
            {isErrorRequired ? (
              <>
                <Alert variant="danger">{isErrorRequired}</Alert>
                <Link type="button" to="/forgotpassword" onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                  Forgot Password ?
                </Link>
              </>
            ) : null}
            <Row>

            </Row>

            <Row>
              <div className="mb-3 mt-3 mx-auto">
                <a
                  className="btn bg-secondary text-light "
                  href="https://dev-diary.herokuapp.com/api/oauth2/authorize/google?redirect_uri=https://dev-diary.herokuapp.com/auth"
                >
                  <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '10px' }} /> Log in with google
                </a>
              </div>
            </Row>

            <Row>
              <Col xs={12}> 
                <a className="float-right text-light" href="/register">No account? Sign up!</a>
              </Col>
            </Row>
        </form>
        </Col>
      </Row>
    </Container>
  );
};
