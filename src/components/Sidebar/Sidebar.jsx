import React, { useContext, useState } from 'react';
import sty from './Sidebar.module.scss';

import logoLg from '../../assets/logo-full.svg';
import { v4 } from 'uuid';
import { context } from '../../store/store';
import { createNewList, selectList } from '../../store/actions';

const Sidebar = () => {
  const { state, dispatch } = useContext(context);
  const [cnfDelete, setCnfDelete] = useState(false);
  const [workspaceModal, setWorkspaceModal] = useState(false);
  const [item, setItem] = useState({
    value: '',
    status: false,
  });
  const deleteSpaceHandler = () => {
    console.log('DELETED');
    setCnfDelete(false);
  };
  const setWorkspaceIndex = id => {
    selectList(id)(dispatch);
  };
  const addToList = () => {
    createNewList({
      uid: v4(),
      name: item.value,
      expanses: [],
    })(dispatch);
  };
  console.log(state);
  return (
    <>
      {/* {cnfDelete && (
        <div className={sty.confirm}>
          <p>Deleting a workspace delete all Todos and Progress</p>
          <span>
            <button onClick={() => deleteSpaceHandler()}>Confrim Delete</button>
            <button onClick={() => setCnfDelete(false)}>Cancel Delete</button>
          </span>
        </div>
      )} */}
      <div className={sty.sidebar}>
        <div className={sty.logo}>
          <h2>WhatSpent</h2>
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
