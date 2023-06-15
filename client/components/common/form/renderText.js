import React from 'react';
import PropTypes from 'prop-types';
const renderText = ({name, placeholder, input, label, type, meta: { touched,  invalid } }) => {
  return (
    <>
      <label htmlFor={name} className="input-label" hidden>{label}</label>
      <input  type={type} name={name} id={name} className="input-field" placeholder={placeholder}  error={touched && invalid}  {...input}  />
    </>
  )
};

renderText.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  name:  PropTypes.string,
  placeholder:  PropTypes.string,
  value: PropTypes.string, 
  meta: PropTypes.object
};

export default renderText;
