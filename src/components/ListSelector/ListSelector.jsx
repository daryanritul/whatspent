import React, { useContext, useState } from 'react';
import styles from './ListSelector.module.scss';
import UpdateModal from '../UpdateModal/UpdateModal';
import { context } from '../../store/store';
import { createPersonalList, deletePersonalList } from '../../store/actions';
import { v4 } from 'uuid';
import { MdAdd, MdDelete } from 'react-icons/md';
import { getPersonalListOptions } from '../../utils/transection';
const ListSelector = ({ filters, setFilters }) => {
  const [activeModal, setActiveModal] = useState(false);
  const { state, dispatch } = useContext(context);
  const { financialData } = state;
  const [listName, setListName] = useState('');
  const [listId, setListId] = useState('');

  const personalListOptions = getPersonalListOptions(financialData);

  const handleMonthChange = e => {
    setFilters({
      ...filters,
      month: parseInt(e.target.value, 10),
    });
  };

  const handleYearChange = e => {
    setFilters({
      ...filters,
      year: parseInt(e.target.value, 10),
    });
  };

  const handleListTypeChange = e => {
    setFilters({
      ...filters,
      listType: e.target.value,
      pId: '',
      pName: '',
    });
  };

  const handlePersonalListChange = e => {
    const pList = personalListOptions.filter(
      list => list.pId === e.target.value
    )[0];
    setListName(pList.name);
    setListId(pList.pId);

    setFilters({
      ...filters,
      pId: e.target.value,
      pName: pList.name,
    });
  };

  const handleDeleteList = uuid => {
    if (!uuid) return;
    deletePersonalList(uuid)(dispatch);
    setFilters({
      ...filters,
      pId: '',
      pName: '',
    });
    setListName('');
    setListId('');
  };

  const handleCreateNewList = () => {
    if (listName.trim() === '') return;

    const newId = v4();
    setFilters({
      ...filters,
      pId: newId,
      pName: listName,
    });
    setListId(newId);
    createPersonalList({ name: listName, pId: newId })(dispatch);
    setListName('');
    setActiveModal(false);
  };
  return (
    <div className={styles.selectorContainer}>
      <div className={styles.listTypeContainer}>
        <select
          id="listType"
          value={filters.listType}
          onChange={handleListTypeChange}
        >
          <option value="monthly">Monthly</option>
          <option value="personal">Personal</option>
        </select>

        {filters.listType === 'personal' && (
          <select
            id="personalList"
            value={listId}
            onChange={handlePersonalListChange}
          >
            <option value="" disabled>
              Select List
            </option>
            {personalListOptions.map(list => (
              <option key={list.pId} value={list.pId}>
                {list.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className={styles.monthSelector}>
        {filters.listType === 'monthly' && (
          <>
            <select
              id="month"
              value={filters.month}
              onChange={handleMonthChange}
            >
              {Array.from({ length: new Date().getMonth() + 1 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', {
                    month: 'long',
                  })}
                </option>
              ))}
            </select>
            <select id="year" value={filters.year} onChange={handleYearChange}>
              {Array.from({ length: 2 }, (_, i) => (
                <option key={2024 + i} value={2024 + i}>
                  {2024 + i}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      {filters.listType === 'personal' && (
        <div className={styles.personalListActions}>
          <button
            onClick={() => setActiveModal(true)}
            className={styles.addButton}
          >
            <MdAdd className={styles.icon} />
          </button>
          <button
            onClick={() => handleDeleteList(filters.pId)}
            className={styles.deleteListBtn}
          >
            <MdDelete className={styles.icon} />
          </button>
        </div>
      )}

      {activeModal && (
        <UpdateModal
          heading={'Add new List'}
          placeholder={'Enter List name'}
          value={listName}
          onValueChange={setListName}
          modalClose={() => setActiveModal(false)}
          onSave={handleCreateNewList}
        />
      )}
    </div>
  );
};

export default ListSelector;
