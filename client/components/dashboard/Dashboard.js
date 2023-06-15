import React, { useState, useEffect } from 'react';
import Popup from '../Popup/Popup'; //User details popup
import { PING_DELAY } from '../../config/config';
import * as httpService from '../../services/httpService';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = (user) => {
    //  setUserInfo(user);
    setIsOpen(!isOpen);
  };

  const getUsers = async () => {
    setIsLoading(true);
    setIsError(false);
    let jsonData;
    let session_id = localStorage.getItem('session_id');
    let session_id_term = '?session_id=' + session_id;

    if (!session_id) {
      session_id_term = '';
    }

    try {
      const response = await httpService.fetchEntity('users');

      jsonData = await response.data.data;

      console.log({ data: jsonData });
    } catch (error) {
      setIsError(true);
    }

    setUserData(jsonData);
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
    let timer = setInterval(() => getUsers(), PING_DELAY);
    return () => {
      clearInterval(timer);
      timer = null;
    };
  }, []);

  const getUser = async (user) => {
    setIsLoading(true);
    setIsError(false);
    let jsonData = [];
    let session_id = localStorage.getItem('session_id');
    let session_id_term = '&session_id=' + session_id;
    if (!session_id) {
      session_id_term = '';
    }
    try {
      const response = await httpService.fetchEntityById('online_users', user.id);
      jsonData =  await response.data.data;
    } catch (error) {
      console.log({ error });
      setIsError(true);
    }

    

    setUserDetails(jsonData[0]);
    setIsLoading(false);
  };

  const handleCellClick = (user) => {
    getUser(user);
    togglePopup();
  };

  return (
    <section className="userList">
      <table>
        <thead>
          <tr className="no-hover">
            <th>
              <span>Id</span>
            </th>
            <th>
              <span>Username</span>
            </th>
            <th>
              <span>Login time</span>
            </th>
            <th>
              <span>Last update time</span>
            </th>
            <th>
              <span>Last Login</span>
            </th>
            <th>
              <span>User IP</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {userData &&
            Object.keys(userData).map((index) => (
              <tr
                id={userData[index].hash}
                key={index}
                onClick={() => handleCellClick(userData[index])}
              >
                <td>{userData[index].id}</td>
                <td>{userData[index].email}</td>
                <td>{userData[index].login_time}</td>
                <td>{userData[index].last_update_time}</td>
                <td>{userData[index].last_login}</td>
                <td>{userData[index].user_ip}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {isOpen && (
        <Popup handleClose={togglePopup}>
          <>
            <b>Details of user</b>
            <p>User-Agent: {userDetails?.user_agent}</p>
            <p>Register time: {userDetails?.register_time} </p>
            <p>Logins count: {userDetails?.logins_count}</p>
          </>
        </Popup>
      )}
    </section>
  );
};

export default Dashboard;
