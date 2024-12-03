import React, { useState, useContext, useMemo, useEffect } from 'react';
import styles from './Home.module.scss';
import { context } from '../../store/store';
import {
  addTransaction,
  createPersonalList,
  deletePersonalList,
  setMonthlyBudget,
} from '../../store/actions';
import { v4 } from 'uuid';

import { filterFinancialData } from '../../utils/filters';
import TransactionModal from '../../components/TransactionModal/TransactionModal';

import BalanceCard from '../../components/BalanceCard/BalanceCard';
import ListSelector from '../../components/ListSelector/ListSelector';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import TransactionTable from '../../components/TransactionTable/TransactionTable';

const Home = () => {
  const { state, dispatch } = useContext(context);
  const { financialData, profile } = state;
  const [activeModal, setActiveModal] = useState(null);
  const [newListName, setNewListName] = useState('');

  const [data, setData] = useState({
    transactions: [],
    summary: { income: 0, expenses: 0, planned: 0, actual: 0 },
  });

  const [newTransaction, setNewTransaction] = useState({
    uuid: v4(),
    type: 'expenses',
    date: new Date().toISOString(),
    amount: '',
    description: '',
    category: '',
    newBal: 0,
    listType: 'monthly',
  });

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

  const handleDeleteList = uuid => {
    deletePersonalList(uuid)(dispatch);
    setFilters({
      ...filters,
      pId: '',
      pName: '',
    });
  };

  const handleCreateNewList = () => {
    if (newListName.trim() === '') return;

    const newList = {
      pId: v4(),
      name: newListName,
    };

    setFilters({
      ...filters,
      pId: newList.pId,
      pName: newList.name,
    });
    createPersonalList(newListName)(dispatch);
    setNewListName('');
    setActiveModal(null);
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
        mId: data.summary.mId,
      })(dispatch);

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

  const openModal = type => {
    setNewTransaction({
      ...newTransaction,
      type: type,
    });
    setActiveModal(type);
  };
  const closeModal = () => setActiveModal(null);
  return (
    <div className={styles.homeContainer}>
      <ListSelector filters={filters} setFilters={setFilters} />
      <BalanceCard
        card1={{
          label: 'Total Income',
          amount: data.summary.income.toLocaleString(),
        }}
        card2={{
          label: 'Total Expenses',
          amount: data.summary.expenses.toLocaleString(),
        }}
        card3={{
          label: 'Remaining Balance',
          amount: data.summary.actual.toLocaleString(),
        }}
      />
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
      <TransactionTable
        transactionList={data.transactions}
        mId={filters.listType === 'monthly' ? data.summary.mId : false}
        pId={filters.listType === 'personal' ? filters.pId : false}
        pList={filters.listType === 'personal' ? filters.pName : false}
      />

      <div className={styles.addNewBtn}>
        <button onClick={() => openModal('income')}>
          <span> Add Income</span>
        </button>
        <button onClick={() => openModal('expenses')}>
          <span> Add Expense</span>
        </button>
      </div>

      {(activeModal === 'income' || activeModal === 'expenses') && (
        <TransactionModal
          closeModal={closeModal}
          filters={filters}
          type={activeModal}
          mId={data.summary.mId}
        />
      )}
    </div>
  );
};

export default Home;
