import React, { useContext } from 'react';

import sty from './DataRows.module.scss';
import {
  deleteExpense,
  selectedExpences,
  updateExpensePendingAmount,
} from '../../store/actions';
import { context } from '../../store/store';
import Delete from '../../assets/delete.svg';
import checkmark from '../../assets/checkmark.svg';
import { formatDate } from '../../utils/utils';

const DataRows = ({ data, index, head = false, setData }) => {
  const { dispatch, state } = useContext(context);
  const handleSelectExpenses = data => {
    if (!head) {
      selectedExpences(data)(dispatch);
    }
  };

  const updateAmountHandler = () => {
    updateExpensePendingAmount(state.selectedList, data.id)(dispatch);
  };
  const deleteExpensesHandler = () => {
    deleteExpense(state.selectedList, data.id)(dispatch);
  };
  return (
    <div
      className={`${sty.expRows} ${head === true && sty.head}`}
      onClick={() => handleSelectExpenses(data)}
    >
      <p className={`${sty.cell1} ${sty.cells}`}>
        {head ? 'S.no' : index + '.'}
      </p>
      <p className={`${sty.cell2} ${sty.cells}`}>
        {head ? 'Date' : formatDate(data.date)}
      </p>
      <p className={`${sty.cell3} ${sty.cells}`}>
        {head ? 'Label' : data.label}
      </p>
      <p className={`${sty.cell4} ${sty.cells}`}>
        {head
          ? 'Description'
          : data.description.length
          ? data.description
          : '--'}
      </p>
      <p className={`${sty.cell5} ${sty.cells}`}>
        {!head && '₹ '}
        {head ? 'Amount' : data.amount}
      </p>
      {head && <p className={`${sty.cell6} ${sty.cells}`}>Pending</p>}
      {!head && (
        <>
          {data.pendingAmount === 0 && (
            <p className={`${sty.cell6} ${sty.cells} ${sty.paidAmount}`}>
              Paid
            </p>
          )}
          {data.pendingAmount > 0 && (
            <p className={`${sty.cell6} ${sty.cells} ${sty.unpaidAmount}`}>
              ₹ {data.pendingAmount}
            </p>
          )}
        </>
      )}
      {!head && (
        <div className={sty.dataOptions}>
          {data.pendingAmount > 0 && (
            <button className={sty.paid} onClick={() => updateAmountHandler()}>
              <img src={checkmark} alt="" className={sty.optionIcon} />
            </button>
          )}
          <button
            className={sty.delete}
            onClick={() => deleteExpensesHandler()}
          >
            <img src={Delete} className={sty.optionIcon} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DataRows;
