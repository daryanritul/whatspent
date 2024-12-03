import React, { useContext, useState } from 'react';
import styles from './ProgressBar.module.scss';
import UpdateModal from '../UpdateModal/UpdateModal';
import { setMonthlyBudget } from '../../store/actions';
import { context } from '../../store/store';

const ProgressBar = ({ budget, spentPercentage, monthYear }) => {
  const [isActive, setIsActive] = useState(false);
  const [newBudget, setNewBudget] = useState(budget || 0);
  const { dispatch } = useContext(context);

  const handleBudgetChange = () => {
    setMonthlyBudget(monthYear, Number(newBudget))(dispatch);
    setIsActive(false);
  };

  const calPercentage = () => {
    const validSpentPercentage = Number.isFinite(spentPercentage)
      ? spentPercentage
      : 0;
    return validSpentPercentage >= 100
      ? 100
      : validSpentPercentage <= 0
      ? 0
      : validSpentPercentage.toFixed(2);
  };

  return (
    <div className={styles.progressBar}>
      <div className={styles.budgetTitle}>
        <span>Monthly Budget</span>
        <span>
          ₹ {budget.toLocaleString('en-IN')}
          <button
            className={styles.budgetUpdate}
            onClick={() => setIsActive(true)}
          >
            UPDATE
          </button>
        </span>
        {isActive && (
          <UpdateModal
            heading={'Update Monthly Budget'}
            modalClose={() => setIsActive(false)}
            value={newBudget}
            onValueChange={setNewBudget}
            placeholder={'Enter Monthly Budget'}
            type={'number'}
            onSave={() => handleBudgetChange()}
          />
        )}
      </div>
      <div className={styles.progress}>
        <div
          className={`${styles.progressBarFill} ${
            spentPercentage > 100 ? styles.BarFilled : ''
          }`}
          style={{
            width: `${calPercentage()}%`,
          }}
        ></div>
      </div>
      <div className={styles.budgetFoot}>
        <div>Spent {calPercentage()}%</div>
        <div>Left {(100 - calPercentage()).toFixed(2)}%</div>
      </div>
    </div>
  );
};

export default ProgressBar;
