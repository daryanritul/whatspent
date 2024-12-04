import React, { useState, useContext, useEffect } from 'react';
import styles from './Home.module.scss';

import { context } from '../../store/store';
import { filterFinancialData } from '../../utils/filters';

import TransactionModal from '../../components/TransactionModal/TransactionModal';
import BalanceCard from '../../components/BalanceCard/BalanceCard';
import ListSelector from '../../components/ListSelector/ListSelector';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Transactions from '../../components/Transactions/Transactions';

const Home = () => {
  const { state } = useContext(context);
  const { financialData } = state;
  const [activeModal, setActiveModal] = useState(null);

  const [data, setData] = useState({
    transactions: [],
    summary: { income: 0, expenses: 0, planned: 0, actual: 0 },
  });

  const BalanceList = [
    {
      label: 'Total Income',
      amount: data.summary.income,
    },
    {
      label: 'Total Expenses',
      amount: data.summary.expenses,
    },
    {
      label: 'Remaining Balance',
      amount: data.summary.actual,
    },
  ];

  const [filters, setFilters] = useState({
    listType: 'monthly',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    pId: '',
    pName: '',
  });

  useEffect(() => {
    const result = filterFinancialData(financialData, filters);
    setData(result);
  }, [filters, financialData]);

  return (
    <div className={styles.homeContainer}>
      <ListSelector filters={filters} setFilters={setFilters} />
      <BalanceCard cards={BalanceList} />
      <div className={styles.summary}>
        {filters.listType === 'monthly' && (
          <ProgressBar
            budget={data.summary.planned}
            spentPercentage={
              (data.summary.expenses / data.summary.planned) * 100
            }
            monthYear={filters.month * 10000 + filters.year}
          />
        )}
      </div>
      <Transactions
        transactionList={data.transactions}
        mId={filters.listType === 'monthly' ? data.summary.mId : false}
        pId={filters.listType === 'personal' ? filters.pId : false}
        pList={filters.listType === 'personal' ? filters.pName : false}
      />

      <div className={styles.addNewBtn}>
        <button onClick={() => setActiveModal('income')}>
          <span> Add Income</span>
        </button>
        <button onClick={() => setActiveModal('expenses')}>
          <span> Add Expense</span>
        </button>
      </div>

      {(activeModal === 'income' || activeModal === 'expenses') && (
        <TransactionModal
          closeModal={() => setActiveModal(null)}
          filters={filters}
          type={activeModal}
          mId={data.summary.mId}
        />
      )}
    </div>
  );
};

export default Home;
