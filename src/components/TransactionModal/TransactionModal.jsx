import React, { useContext, useState } from 'react';
import styles from './TransactionModal.module.scss';
import { v4 } from 'uuid';
import { addSavedTransaction, addTransaction } from '../../store/actions';
import { context } from '../../store/store';

const TransactionModal = ({ closeModal, mId, filters, type }) => {
  const [saved, setSaved] = useState(false);
  const { dispatch, state } = useContext(context);
  const { profile } = state;

  const [newTransaction, setNewTransaction] = useState({
    uuid: v4(),
    type: type,
    date: new Date().toISOString(),
    amount: '',
    description: '',
    category: '',
    listType: 'monthly',
  });

  const handleCategoryChange = e => {
    setNewTransaction({ ...newTransaction, category: e.target.value });
  };

  const handleAddTransaction = () => {
    if (
      newTransaction.date &&
      newTransaction.amount &&
      newTransaction.description
    ) {
      const updatedTransaction = {
        ...newTransaction,
        amount: parseFloat(newTransaction.amount),
        date: new Date(newTransaction.date).toISOString(),
        listType: filters.listType,
      };

      addTransaction({
        transection: updatedTransaction,
        pId: filters.pId,
        mId,
      })(dispatch);

      if (saved) {
        addSavedTransaction({
          uuid: updatedTransaction.uuid,
          amount: updatedTransaction.amount,
          category: updatedTransaction.category,
          description: updatedTransaction.description,
          listType: 'monthly',
          type: updatedTransaction.type,
        })(dispatch);
      }

      setNewTransaction({
        uuid: v4(),
        type: 'expenses',
        date: new Date().toISOString(),
        amount: '',
        description: '',
        category: '',
        listType: 'monthly',
      });

      closeModal();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Add New Transaction</h3>
        <input
          type="text"
          placeholder="Description"
          value={newTransaction.description}
          onChange={e =>
            setNewTransaction({
              ...newTransaction,
              description: e.target.value,
            })
          }
          className={styles.input}
        />

        <input
          type="number"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={e =>
            setNewTransaction({
              ...newTransaction,
              amount: e.target.value,
            })
          }
          className={styles.input}
        />

        <input
          type="datetime-local"
          value={new Date(newTransaction.date).toISOString().slice(0, 16)}
          onChange={e =>
            setNewTransaction({
              ...newTransaction,
              date: e.target.value,
            })
          }
          className={styles.input}
          min={
            filters.listType === 'personal'
              ? undefined
              : `${filters.year}-${String(filters.month).padStart(
                  2,
                  '0'
                )}-01T00:00`
          }
          max={
            filters.listType === 'personal'
              ? undefined
              : `${filters.year}-${String(filters.month).padStart(
                  2,
                  '0'
                )}-${String(
                  new Date(filters.year, filters.month, 0).getDate()
                ).padStart(2, '0')}T23:59`
          }
        />

        <select
          value={newTransaction.category}
          onChange={handleCategoryChange}
          className={styles.select}
        >
          <option>Select Category</option>
          {profile.categories[newTransaction.type].map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className={styles.checkboxContainer}>
          <label>
            <input
              type="checkbox"
              checked={saved}
              onChange={() => setSaved(!saved)}
            />
            <span>Save this Transaction</span>
          </label>
        </div>

        <button onClick={handleAddTransaction} className={styles.addBtn}>
          Add Transaction
        </button>
        <button className={styles.closeBtn} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TransactionModal;
