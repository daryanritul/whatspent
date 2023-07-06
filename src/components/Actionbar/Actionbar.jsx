import React, { useState } from 'react';
import sty from './Actionbar.module.scss';

const expenseLabels = [
  'Others',
  'Rent',
  'Utilities',
  'Groceries',
  'Transportation',
  'Insurance',
  'Healthcare',
  'Entertainment',
  'Education',
  'Debt Payments',
  'Recharge',
];

const Actionbar = () => {
  const [description, setDescription] = useState('');
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = event => {
    const value = event.target.value;
    setLabel(value);
    // Filter suggestions based on input value
    const filteredSuggestions = expenseLabels.filter(label =>
      label.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = suggestion => {
    setLabel(suggestion);
    setSuggestions([]);
  };

  return (
    <div className={sty.actionBar}>
      <p className={sty.titles}>Action Center</p>
      <div className={sty.inputBox}>
        <label htmlFor="">Description</label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={val => setDescription(val)}
        />
      </div>
      <div className={sty.inputBox}>
        <label htmlFor="">Amount</label>
        <input
          type="number"
          placeholder="Rs."
          value={amount}
          onChange={val => setAmount(val)}
        />
      </div>
      <div className={sty.inputBox}>
        <label htmlFor="">Pending Amount</label>
        <input
          type="number"
          placeholder="Pending Amount"
          value={pendingAmount}
          onChange={val => pendingAmount(val)}
        />
      </div>
      <div className={sty.inputBox}>
        <label htmlFor="">Labels</label>
        <input
          type="text"
          placeholder="Select Label"
          value={label}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button>ADD TO THE LIST</button>
    </div>
  );
};

export default Actionbar;
