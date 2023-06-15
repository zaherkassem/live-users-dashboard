import React from 'react';
import './Popup.scss';

const Popup = (props) => {
  return (
    <>
      <div id="popup1" className="overlay">
        <div className="popup">
          <a className="close" onClick={props.handleClose}>
            &times;
          </a>
          <div className="content">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Popup;
