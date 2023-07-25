import React, { useContext, useEffect, useState } from 'react';
import sty from './Filters.module.scss';

import { context } from '../../store/store';
import { setFilters } from '../../store/actions';
const Filters = () => {
  const [selectedLabel, setSelectedLabel] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { state, dispatch } = useContext(context);

  const handleLabelChange = e => {
    setSelectedLabel(e.target.value);
  };

  const selectedList =
    state.lists.find(list => list.uid === state.selectedList) || {};
  const selectedListExpenses = selectedList?.expenses || [];
  const labels = [
    ...new Set(selectedListExpenses.map(expense => expense.label)),
  ];

  const handleFilterChange = () => {
    setFilters({
      label: selectedLabel,
      startDate,
      endDate,
    })(dispatch);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedLabel]);

  useEffect(() => {
    if (startDate && endDate && new Date(startDate) <= new Date(endDate)) {
      handleFilterChange();
    }
  }, [startDate, endDate]);
  const handleFilterReset = () => {
    setSelectedLabel('');
    setStartDate('');
    setEndDate('');
    setFilters({
      label: '',
      startDate: '',
      endDate: '',
    })(dispatch);
  };
  return (
    <div className={sty.filters}>
      <p className={sty.filterTitile}>Filters</p>
      <div className={sty.filterBox}>
        <label htmlFor="labelFilter">Label</label>
        <select
          id="labelFilter"
          value={selectedLabel}
          onChange={handleLabelChange}
        >
          <option value="">All</option>
          {labels.map(label => (
            <option value={label} key={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className={sty.filterBox}>
        <label htmlFor="monthFilter">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
      </div>
      <div className={sty.filterBox}>
        <label htmlFor="monthFilter">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </div>
      <div className={sty.filterOption}>
        <button onClick={() => handleFilterReset()} className={sty.filterReset}>
          Reset Filters
        </button>
        <button
          onClick={() => handleFilterChange()}
          className={sty.filterApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filters;
