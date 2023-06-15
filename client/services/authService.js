import axios from 'axios';
import { push } from 'connected-react-router';

import { loginSuccess, loginFailure, logoutSuccess } from '../actions/authAction';
import { API_URL, JWT_TOKEN, CURRENT_USER } from '../config/config';
import { setLocalStorage, clearLocalStorage } from '../utils/storageUtil';

export const login = ({ email, password }) => {
  return (dispatch) => {
    axios
      .post(API_URL + 'auth/login', { email, password })
      .then((response) => {
        dispatch(loginSuccess(response.data.token));
        setLocalStorage(JWT_TOKEN, response.data.token);

        const user = response.data;
        const docData = {
          userName: user.userName,
          email: user.email,
          entrancetime: new Date(),
          lastupdatetime: new Date(),
          id: user.id,
          isOnline: true,
          visitsCount: 1,
        };

        setLocalStorage(CURRENT_USER, docData);
        dispatch(push('/dashboard'));
      })
      .catch((error) => {
        dispatch(loginFailure(error.response.data));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    clearLocalStorage(JWT_TOKEN);
    clearLocalStorage(CURRENT_USER);
    dispatch(logoutSuccess());
    dispatch(push('/'));
    return false;
  };
};
