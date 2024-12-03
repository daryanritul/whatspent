import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import styles from './NotificationProvider.module.scss';

let setNotificationState;

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ message: '', type: '' });

  setNotificationState = setNotification;

  return (
    <>
      {children}
      {notification.message && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
          <button
            onClick={() => setNotification({ message: '', type: '' })}
            className={styles.closeBtn}
          >
            <MdClose className={styles.icon} />
          </button>
        </div>
      )}
    </>
  );
};

export const showNotification = (message, type) => {
  if (setNotificationState) {
    setNotificationState({ message, type });
    setTimeout(() => {
      setNotificationState({ message: '', type: '' });
    }, 3000);
  }
};
