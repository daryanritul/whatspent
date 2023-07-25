import React, { useContext, useState } from 'react';
import sty from './Sidebar.module.scss';

import logoLg from '../../assets/logo-full.svg';
import { v4 } from 'uuid';
import { context } from '../../store/store';
import { createNewList, deleteList, selectList } from '../../store/actions';
import Delete from '../../assets/delete.svg';
import Logo from '../../assets/Logo.svg';

const Sidebar = ({ mobileState }) => {
  const { state, dispatch } = useContext(context);
  const [cnfDelete, setCnfDelete] = useState(false);
  const [workspaceModal, setWorkspaceModal] = useState(false);
  const [item, setItem] = useState({
    value: '',
    status: false,
  });
  const deleteSpaceHandler = () => {
    deleteList(cnfDelete)(dispatch);
    setCnfDelete(false);
  };
  const deleteHandler = (event, uid) => {
    event.stopPropagation();
    setCnfDelete(uid);
  };
  const setWorkspaceIndex = id => {
    selectList(id)(dispatch);
  };
  const addToList = () => {
    createNewList({
      uid: v4(),
      name: item.value,
      expenses: [],
      filters: {
        label: '',
        startDate: null,
        endDate: null,
      },
    })(dispatch);
  };
  return (
    <>
      {cnfDelete && (
        <div className={sty.confirm}>
          <div className={sty.confirmBox}>
            <h3>Confirm the action</h3>
            <p>Are you sure you want to delete this expense list?</p>
            <span>
              <button onClick={() => setCnfDelete(false)}>Cancel</button>
              <button onClick={() => deleteSpaceHandler()}>Delete</button>
            </span>
          </div>
        </div>
      )}
      <div
        className={`${sty.sidebar} ${
          mobileState === 'library' ? sty.open : sty.close
        }`}
      >
        <div className={sty.logo}>
          <img src={Logo} alt="" />
        </div>

        <p
          className={sty.title}
          onClick={() => setWorkspaceModal(!workspaceModal)}
        >
          My Expence List
        </p>
        <div className={`${sty.worklist} ${workspaceModal && sty.activeModal}`}>
          {state.lists.map((list, index) => (
            <div
              key={index}
              className={`${sty.workitem}
              ${state.selectedList === list.uid && sty.active}
              `}
              onClick={() => setWorkspaceIndex(list.uid)}
            >
              {list.name}
              {state.selectedList !== list.uid && list.uid !== 'abc123' && (
                <img
                  src={Delete}
                  alt="img"
                  className={sty.deleteBtn}
                  onClick={event => deleteHandler(event, list.uid)}
                />
              )}
            </div>
          ))}
        </div>
        <div className={sty.buttonBox}>
          {!item.status ? (
            <button
              className={sty.button}
              onClick={() => {
                setItem({
                  ...item,
                  status: true,
                });
              }}
            >
              Add new List
            </button>
          ) : (
            <input
              type={'text'}
              className={`${sty.button} ${sty.input}`}
              onChange={event =>
                setItem({
                  ...item,
                  value: event.target.value,
                })
              }
              value={item.value}
              autoFocus={item.status}
              placeholder={'Enter List Name'}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  if (item.value !== '') {
                    addToList();
                  }
                  setItem({
                    value: '',
                    status: false,
                  });
                }
              }}
              onBlur={() =>
                setItem({
                  value: '',
                  status: false,
                })
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
