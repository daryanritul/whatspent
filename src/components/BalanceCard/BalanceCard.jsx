import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import styles from './BalanceCard.module.scss';

const BalanceCard = ({ cards = [] }) => {
  return (
    <div className={styles.summary}>
      <div className={styles.balance}>
        {cards.map((card, index) => (
          <div key={index} className={styles.balanceItem}>
            <span>{card.label || 'N/A'}</span>
            <strong>₹ {card.amount?.toLocaleString() || 0}</strong>
            <FaRupeeSign className={styles.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalanceCard;
