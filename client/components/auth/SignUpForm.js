import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

// Import custom components
import renderText from '../common/form/renderText';
import  '../styles/common.scss';

const SignUpForm = (props) => {
  const { handleSubmit, onSubmit, errorMessage } = props;

  return (
    <main className="main">
      <div className="container">
        <section className="wrapper">
          <div className="heading">
            <h1 className="text text-large">Sign Up</h1>
            <p className="text text-normal">Already have an account? <span><a href="/" className="text text-links">Login</a></span></p>
          </div>
          <form name="signup" className="form" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-control">
              <Field type="text" name="first_name" component={renderText} label="First Name"   placeholder="First Name"/>
            </div>
            <div className="input-control">
              <Field type="text" name="last_name" component={renderText} label="Last Name"  placeholder="Last Name" />
            </div>
            <div className="input-control">
              <Field type="text" name="email" component={renderText} label="Email"  placeholder="Email" />
            </div>

            <div className="input-control">
              <Field type="password" name="password" component={renderText} placeholder="Password" />
            </div>

            {errorMessage &&(
              <div className="input-control">{errorMessage}</div>
            )}
            <div className="input-control">
              <input type="submit" name="submit" className="input-submit" value="Sign up" />
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

const validateSignUp = (values) => {
  const errors = {};

  const requiredFields = ['first_name', 'last_name', 'email', 'password'];
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

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'SignUpForm', // a unique identifier for this form
  validate: validateSignUp, // ←Callback function for client-side validation
})(SignUpForm);
