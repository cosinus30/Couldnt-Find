import React, { useEffect, useState } from 'react';
import { EditProfile } from './profilePageComponents/EditProfile';
import { Button, Col, Row } from 'react-bootstrap';
import { api, UserDetailResponse } from '@internship/shared/api';
import { ProfileImage } from '@internship/ui';
import ChangePassword from './profilePageComponents/ChangePassword';
import { useAuthentication } from '@internship/shared/hooks';
import { useHistory } from 'react-router-dom';
export const Profile = () => {
  const [inEditMode, setInEditMode] = useState(false);
  const [inChangePassword, setInChangePassword] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState(false);
  const [detail, setDetail] = useState<UserDetailResponse>();
  const { isAuthenticated } = useAuthentication();
  const history = useHistory();

  useEffect(() => {
    api.auth
      .userDetail()
      .then((r) => setDetail(r))
      .catch((e) => console.error(e));
    setEditUserInfo(false);
  }, [editUserInfo]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  const changeValues = () => {
    setInEditMode(true);
    setInChangePassword(false);
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <Row>
        <Col sm={6}>
          <div className="card text-center">
            <div className="card-header">
              <h3>Welcome</h3>
              <ProfileImage width="200" height="200" alt={`${detail?.username} profile picture`} image={detail?.image} />
            </div>
            <h5>
              <div>
                <h4>
                  <b className="text-black-50">User Info</b>
                </h4>
                <Row>
                  <i className="text-black-50 ml-4"> UserName: {detail?.username}</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4"> Name:{detail?.name}</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4"> SurName:{detail?.lastName}</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4"> Age: {detail?.age}</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4"> Phone: {detail?.phoneNumber}</i>
                </Row>
                <Row>
                  <i className="text-black-50 ml-4 "> Email: {detail?.email}</i>
                </Row>
              </div>
            </h5>
            <Button className="btn btn-success" disabled={inEditMode} onClick={changeValues}>
              Edit Profile
            </Button>
            <Button
              className="btn  btn-success mt-2"
              disabled={inChangePassword}
              onClick={() => {
                setInChangePassword(true);
                setInEditMode(false);
              }}
            >
              Change Password
            </Button>
          </div>
        </Col>
        <Col sm={6}>
          {inEditMode && (
            <>
              <Button className="btn btn-danger" disabled={!inEditMode} onClick={() => setInEditMode(false)}>
                X Edit Profile Close
              </Button>
              <EditProfile setInEditMode={setInEditMode} setEditUserInfo={setEditUserInfo} />
            </>
          )}
          {inChangePassword && (
            <>
              <Button className="btn btn-danger" disabled={!inChangePassword} onClick={() => setInChangePassword(false)}>
                X Change Password Close
              </Button>
              <ChangePassword />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};
