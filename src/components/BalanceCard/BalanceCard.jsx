import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';

import styles from './BalanceCard.module.scss';

const BalanceCard = ({ card1, card2, card3 }) => {
  const cards = [card1, card2, card3];
  return (
    <div className={styles.summary}>
      <div className={styles.balance}>
        {cards.map((val, index) => (
          <div key={index} className={styles.balanceItem}>
            <span>{val.label}</span>
            <strong>₹ {val.amount.toLocaleString()}</strong>
            <FaRupeeSign className={styles.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalanceCard;
