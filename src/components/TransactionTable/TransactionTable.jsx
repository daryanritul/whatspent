import React, { useContext, useMemo } from 'react';
import styles from './TransactionTable.module.scss';
import TransectionCard from '../TransectionCard/TransectionCard';
import { MdDelete, MdEdit } from 'react-icons/md';
import { context } from '../../store/store';
import { deleteTransaction } from '../../store/actions';
import { calculateBalances } from '../../utils/transection';

const TransactionTable = ({ transactionList, mId, pId, pList }) => {
  const { dispatch } = useContext(context);

  const transactions = useMemo(
    () => calculateBalances(transactionList),
    [transactionList]
  );

  const handleDeleteTransection = id => {
    deleteTransaction(id, mId, pId)(dispatch);
  };

  return (
    <div className={styles.transactions}>
      <div className={styles.tableHead}>
        <h4>Transactions</h4>
        <p>{pList}</p>
      </div>
      {transactionList?.length > 0 ? (
        <>
          <table className={styles.transactionTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Updated Balance</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={`transaction-${index}`}
                  className={styles.transactionRow}
                >
                  <td className={styles.dateCell}>
                    {new Date(transaction.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </td>
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
                  <td className={styles.balanceCell}>
                    ₹ {transaction.newBal.toLocaleString() || '0'}
                  </td>
                  <td className={styles.deleteCell}>
                    <MdDelete
                      className={styles.icon}
                      onClick={() => handleDeleteTransection(transaction.uuid)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.map((transaction, index) => (
            <TransectionCard
              date={new Date(transaction.date).getDate()}
              month={new Date(transaction.date).toLocaleString('en-US', {
                month: 'short',
              })}
              description={transaction.description}
              category={transaction.category}
              amount={transaction.amount}
              type={transaction.type}
              newBal={transaction.newBal}
              uuid={transaction.uuid}
              handleDeleteTransection={handleDeleteTransection}
            />
          ))}
        </>
      ) : (
        <div className={styles.emptyList}>
          <p>There are no transactions yet. Start by adding some data!</p>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
