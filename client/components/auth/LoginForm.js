import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

// Import custom components
import renderText from '../common/form/renderText';
import  '../styles/common.scss';

const LoginForm = (props) => {
  const { handleSubmit, onSubmit, errorMessage } = props;
  
  return (
    <main className="main">
      <div className="container">
        <section className="wrapper">
          <div className="heading">
            <h1 className="text text-large">Sign In</h1>
            <p className="text text-normal">Don't have an account? <span><a href="/signup" className="text text-links">Signup</a></span>
            </p>
          </div>
          <form name="signin" className="form" method="post" onSubmit={handleSubmit(onSubmit) }>
            <div className="input-control">
              <Field type="text" name="email" component={renderText} label="Username" placeholder="Username" />
            </div>
            <div className="input-control">
              <Field type="password" name="password" placeholder="Password" component={renderText} label="Password" />
            </div>

            {errorMessage &&(
              <div className="input-control">{errorMessage}</div>
            )}
            <div className="input-control">
              <input type="submit" name="submit" className="input-submit" value="Sign In" />
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

const validateLogin = (values) => {
  const errors = {};

  const requiredFields = ['email', 'password'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = '(The ' + field + ' field is required.)';
    }
  });

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '(Invalid email address.)';
  }

  return errors;
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  validate: validateLogin, // ←Callback function for client-side validation
})(LoginForm);
