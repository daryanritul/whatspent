import React from 'react';
import sty from './SpentCard.module.scss';

const SpentCard = ({ title, amount = 5688, type }) => {
  return (
    <div className={`${sty.spent} ${type}`}>
      <div className={sty.title}>{title}</div>
      <div className={sty.amnt}>₹ {amount}</div>
    </div>
  );
};

export default SpentCard;
