import React from 'react';
import sty from './Loading.module.scss';
import logo from '../../assets/Logo.svg';
const Loading = () => {
  return (
    <div className={sty.loading}>
      <img src={logo} alt="" />
      <p>Loading...</p>
      <div className={sty.dots}></div>
    </div>
  );
};

export default Loading;
