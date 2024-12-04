import React, { useState } from 'react';
import styles from './TransectionCard.module.scss';
import { MdDelete } from 'react-icons/md';

const TransectionCard = ({ transaction, handleDeleteTransection }) => {
  const [toggleDelete, setToggleDelete] = useState(false);
  return (
    <div className={styles.card} onClick={() => setToggleDelete(!toggleDelete)}>
      <div className={styles.date}>
        <span className={styles.day}>
          {new Date(transaction.date).getDate()}
        </span>
        <span className={styles.month}>
          {new Date(transaction.date).toLocaleString('en-US', {
            month: 'short',
          })}
        </span>
      </div>
      <div className={styles.details}>
        <span className={styles.description}>{transaction.description}</span>
        <span className={styles.category}>{transaction.category}</span>
      </div>
      <span>
        <div
          className={
            transaction.type === 'income'
              ? `${styles.amount} ${styles.income}`
              : `${styles.amount}`
          }
        >
          ₹ {transaction.amount.toLocaleString()}
        </div>
        <small>₹ {transaction.newBal.toLocaleString()}</small>
      </span>
      {toggleDelete && (
        <span
          className={styles.delete}
          onClick={() => handleDeleteTransection(transaction.uuid)}
        >
          <MdDelete className={styles.icon} />
        </span>
      )}
    </div>
  );
};

export default TransectionCard;
