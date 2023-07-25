import React, { useContext, useState } from 'react';
import sty from './Actionbar.module.scss';
import { addExpenses, signOutUser } from '../../store/actions';
import { context } from '../../store/store';

import logout from '../../assets/logout.svg';
import user from '../../assets/user.svg';
import { v4 } from 'uuid';
import Filters from '../Filters/Filters';

const Actionbar = ({ mobileState }) => {
  const { dispatch, state } = useContext(context);
  const today = new Date().toISOString().slice(0, 10);

  const [description, setDescription] = useState('');

  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(today);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = event => {
    const value = event.target.value;
    setLabel(value);
    const filteredSuggestions = expenseLabels.filter(label =>
      label.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const selectedList =
    state.lists.find(list => list.uid === state.selectedList) || {};
  const selectedListExpenses = selectedList?.expenses || [];
  const expenseLabels = [
    ...new Set(selectedListExpenses.map(expense => expense.label)),
  ];

  const handleSuggestionClick = suggestion => {
    setLabel(suggestion);
    setSuggestions([]);
  };

  const handleAddToList = () => {
    addExpenses({
      id: v4(),
      description,
      label,
      amount,
      pendingAmount: pendingAmount.length === 0 ? 0 : pendingAmount,
      date,
    })(dispatch);
    setDescription('');
    setLabel('');
    setAmount(0);
    setDate('');
    setPendingAmount(0);
  };

  return (
    <div
      className={`${sty.actionBar} ${
        mobileState === 'action' ? sty.open : sty.close
      }`}
    >
      <div className={sty.profile}>
        <span>
          <img src={user} alt="" />
          <p>{state.user.email.split('@')[0]}</p>
        </span>
        <img
          src={logout}
          className={sty.signout}
          alt=""
          onClick={() => signOutUser()(dispatch)}
        />
      </div>
      <p className={sty.titles}>Action Center</p>
      <Filters />
      <p className={sty.addTitle}>Add New Expence</p>
      <div className={`${sty.inputBox} ${sty.labelInput}`}>
        <label htmlFor="labelSelect">Labels</label>
        <div className={sty.labelOption}>
          <input
            type="text"
            placeholder="New Label"
            value={label}
            onChange={handleInputChange}
          />

          <select
            id={sty.labelSelect}
            value={label}
            onChange={e => setLabel(e.target.value)}
          >
            <option value="">Select</option>
            {expenseLabels.map(label => (
              <option value={label} key={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={sty.mobileBoxInput}>
        <div className={sty.inputBox}>
          <label htmlFor="">Amount</label>
          <input
            type="number"
            placeholder="Rs."
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div className={sty.inputBox}>
          <label htmlFor="">Pending Amount</label>
          <input
            type="number"
            placeholder="Rs."
            value={pendingAmount}
            onChange={e => setPendingAmount(e.target.value)}
          />
        </div>
      </div>
      <div className={sty.mobileBoxInput}>
        <div className={sty.inputBox} id={sty.dateBox}>
          <label htmlFor="">Date</label>
          <input
            type="date"
            placeholder="Select Date"
            value={date}
            onChange={e => setDate(e.target.value)}
            title="select"
          />
        </div>

        <div className={sty.inputBox}>
          <label htmlFor="">Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>
      <button onClick={() => handleAddToList()} className={sty.actionBtn}>
        Add Expance
      </button>
    </div>
  );
};

export default Actionbar;
