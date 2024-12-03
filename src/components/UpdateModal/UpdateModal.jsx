import React from 'react';
import styles from './UpdateModal.module.scss';
const UpdateModal = ({
  heading,
  placeholder,
  value,
  onValueChange,
  modalClose,
  onSave,
  type = 'text',
}) => {
  return (
    <div className={styles.modalList}>
      <div className={styles.modalContent}>
        <h2>{heading}</h2>
        <input
          type={type}
          value={value}
          onChange={e => onValueChange(e.target.value)}
          placeholder={placeholder}
          className={styles.input}
        />
        <button onClick={onSave} className={styles.saveBtn}>
          Update
        </button>
        <button onClick={modalClose} className={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateModal;
