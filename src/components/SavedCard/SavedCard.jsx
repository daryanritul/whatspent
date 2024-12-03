import React from 'react';
import styles from './SavedCard.module.scss';
import { MdAdd, MdDelete } from 'react-icons/md';

const SavedCard = ({
  description,
  amount,
  category,
  onAdd,
  onRemove,
  type,
}) => {
  return (
    <div className={styles.savedCard}>
      <div className={styles.details}>
        <p className={styles.description}>{description}</p>
        <p className={styles.category}>{category}</p>
      </div>
      <p
        className={
          type === 'income' ? styles.incomeActivity : styles.expenseActivity
        }
      >
        ₹ {amount.toLocaleString()}
      </p>
      <div className={styles.actions}>
        <button className={styles.add} onClick={onAdd}>
          <MdAdd />
        </button>
        <button className={styles.remove} onClick={onRemove}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default SavedCard;
