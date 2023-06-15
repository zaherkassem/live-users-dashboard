import React from 'react';
import PropTypes from 'prop-types';

// Import custom components
import Header from '../header/Header';
import Footer from '../footer/Footer';
import '../../styles/common.scss';

const MainLayout = (props) => {
  const { children } = props;
  return (
    <>
      <main className="main grid">
        <Header />
        <>{children}</>

        <Footer />
      </main>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element,
};

export default MainLayout;
