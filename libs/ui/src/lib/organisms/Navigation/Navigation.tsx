import styled from 'styled-components';
import React, { useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Dropdown, Nav, Navbar, NavDropdown, NavLink as linko } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/all';
import { useAuthentication } from '@internship/shared/hooks';
import { logoutAsync } from '@internship/store/authentication';
import { useDispatch } from 'react-redux';
import { Popup, PopupButton, Search } from '../../molecules';
import { getAccessToken, getRefreshToken } from '@internship/shared/utils';
import image from './brand.png';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

export const Navigation = () => {
  const { isAuthenticated } = useAuthentication();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);


  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  };
  const tokens = {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken()
  };

  const handleShow = () => {
    dispatch(logoutAsync.request(tokens));
    setShow(false);
    history.push('/');
  };



  return (
    <Navbar sticky="top" className="navbar-expand-sm bg-secondary">
      <button
        className="custom-toggler navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
        aria-controls="navbar"
        aria-expanded={!isNavCollapsed}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbar">
        <Nav className="mr-auto">
          <li className="navbar-brand">
            <NavLink exact to="/" className="nav-link"
              onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
              <img src={image} style={{ width: '40px', height: '100%' }} />
            </NavLink>
          </li>
          <li className="nav-link ">
            <NavLink
              to="/tutorials"
              className="nav-link text-light"
              onClick={() => {
                dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
              }}
            >
              Tutorials
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to="/engineerings"
              className="nav-link text-light"
              onClick={() => {
                dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
              }}
            >
              Engineerings
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink
              to="/insights"
              className="nav-link text-light" 
              onClick={() => {
                dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
              }}
            >
              Insights
            </NavLink>
          </li>
        </Nav>
        {
          isAuthenticated ? (
            <Nav>
              <li className="nav-link">
                <NavLink
                  to="/write-your-story"
                  className="nav-link text-light"
                  onClick={() => {
                    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                  }}
                >
                  Write your story
                        </NavLink>
              </li>
              <li className="nav-link float-right">
                <Dropdown alignRight className="text-light"  title="Hello" id="basic-nav-dropdown ">
                  <DropdownToggle variant="secondary">
                    <FaUserAlt className="text-light"/>
                  </DropdownToggle>
                  <DropdownMenu className="bg-secondary border-light rounded-bottom rounded-left ">
                  <NavLink
                    className="dropdown-item text-light"
                    to="/profile"
                    type="button"
                    onClick={() => {
                      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                      dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                    }}
                  >
                    Profile
                </NavLink>
                    <DropdownItem to={location.pathname} onClick={handleOpen} className="text-light">
                      Logout
                    </DropdownItem>
                </DropdownMenu>
                  <Popup show={show} onHide={handleClose}>
                    Sistemden Çıkıyorsunuz Emin misiniz?
                  <PopupButton variant="secondary" onClick={handleClose}>
                      HAYIR
                  </PopupButton>
                    <PopupButton type="submit" variant="primary" onClick={handleShow}>
                      EVET
                  </PopupButton>
                  </Popup>
                </Dropdown>
              </li>
            </Nav>
          ) : (
              <Nav>
                <li className="nav-link">
                  <NavLink
                    to="/login"
                    className="nav-link text-light"
                    onClick={
                      () => {
                        dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                        dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                      }
                    }>
                    Write your story
                        </NavLink>
                </li>
                <Dropdown className="nav-link uk-align-right" title="Account" id="basic-nav-dropdown">
                  <NavLink
                    className="dropdown-item text-light"
                    to="/register"
                    onClick={() => {
                      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                      dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                    }}
                  >
                    Sign Up
                </NavLink>
                  <NavLink
                    className="dropdown-item text-light"
                    to="/login"
                    onClick={() => {
                      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                      dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                    }}
                  >
                    Sign In
                </NavLink>
                </Dropdown>
              </Nav>
            )
        }
      </div >
    </Navbar >
  );
};