import React, { useState } from 'react';
import styles from './TransectionCard.module.scss';
import { MdDelete } from 'react-icons/md';

const TransectionCard = ({
  date,
  month,
  description,
  category,
  amount,
  type,
  newBal,
  handleDeleteTransection,
  uuid,
}) => {
  const [toggleDelete, setToggleDelete] = useState(false);
  return (
    <div className={styles.card} onClick={() => setToggleDelete(!toggleDelete)}>
      <div className={styles.date}>
        <span className={styles.day}>{date}</span>
        <span className={styles.month}>{month}</span>
      </div>
      <div className={styles.details}>
        <span className={styles.description}>{description}</span>
        <span className={styles.category}>{category}</span>
      </div>
      <span>
        <div
          className={
            type === 'income'
              ? `${styles.amount} ${styles.income}`
              : `${styles.amount}`
          }
        >
          ₹ {amount.toLocaleString()}
        </div>
        <small>₹ {newBal.toLocaleString()}</small>
      </span>
      {toggleDelete && (
        <span
          className={styles.delete}
          onClick={() => handleDeleteTransection(uuid)}
        >
          <MdDelete className={styles.icon} />
        </span>
      )}
    </div>
  );
};

export default TransectionCard;
