import React, { useContext } from 'react';
import styles from './Saved.module.scss';
import { context } from '../../store/store';
import { MdAdd, MdDelete } from 'react-icons/md';
import { addTransaction, deleteSavedTransaction } from '../../store/actions';
import { v4 } from 'uuid';
import SavedCard from '../../components/SavedCard/SavedCard';

const Saved = () => {
  const { state, dispatch } = useContext(context);
  const { financialData } = state;
  const { savedTransactions } = financialData;

  const handleAddTransaction = newTransaction => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const monthYear = month * 10000 + year;
    const mId = state.financialData.monthlyData.find(
      monthData => monthData.monthYear === monthYear
    )?.mId;

    addTransaction({
      transection: {
        ...newTransaction,
        date: new Date().toISOString(),
        uuid: v4(),
      },
      mId,
      pId: null,
    })(dispatch);
  };

  return (
    <div className={styles.savedContainer}>
      <div className={styles.transactions}>
        <div className={styles.tableHead}>
          <h4>Saved Transactions ({savedTransactions?.length})</h4>
        </div>
        {savedTransactions?.length > 0 ? (
          <>
            <table className={styles.transactionTable}>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Quick Add</th>
                </tr>
              </thead>
              <tbody>
                {savedTransactions.map((transaction, index) => (
                  <tr className={styles.transactionRow} key={index}>
                    <td className={styles.descriptionCell}>
                      {transaction.description}
                    </td>
                    <td className={styles.categoryCell}>
                      {transaction.category || 'N/A'}
                    </td>
                    <td
                      className={
                        transaction.type === 'income'
                          ? styles.incomeActivity
                          : styles.expenseActivity
                      }
                    >
                      ₹ {transaction.amount.toLocaleString()}
                    </td>
                    <td className={styles.addCell}>
                      <span onClick={() => handleAddTransaction(transaction)}>
                        ADD
                      </span>
                      <span
                        onClick={() =>
                          deleteSavedTransaction(transaction.uuid)(dispatch)
                        }
                      >
                        <MdDelete className={styles.icon} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {savedTransactions.map((transaction, index) => (
              <SavedCard
                description={transaction.description}
                amount={transaction.amount}
                category={transaction.category || 'N/A'}
                onAdd={() => handleAddTransaction(transaction)}
                onRemove={() =>
                  deleteSavedTransaction(transaction.uuid)(dispatch)
                }
                type={transaction.type}
                key={index}
              />
            ))}
          </>
        ) : (
          <div className={styles.emptyList}>
            <p>There are no transactions yet. Start by adding some!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
