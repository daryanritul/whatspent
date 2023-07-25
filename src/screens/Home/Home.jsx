import React, { useContext, useState } from 'react';
import sty from './Home.module.scss';

import Sidebar from '../../components/Sidebar/Sidebar';
import SpentCard from '../../components/SpentCard/SpentCard';
import DataRows from '../../components/DataRows/DataRows';
import Actionbar from '../../components/Actionbar/Actionbar';

import { context } from '../../store/store';

import { calculateTotals, formatDate } from '../../utils/utils';

import library from '../../assets/library.svg';
import noDollar from '../../assets/noDollar.svg';
import close from '../../assets/close.svg';
import setting from '../../assets/setting.svg';
import ExportExpenses from '../../components/ExportExpenses/ExportExpenses';

const Home = () => {
  const { state, dispatch } = useContext(context);
  const [selectedData, setSelectedData] = useState(false);
  const [mobileState, setMobileState] = useState('home');
  const selectedList =
    state.lists.find(list => list.uid === state.selectedList) || {};
  const selectedListExpenses = selectedList?.expenses || [];

  const filters = selectedList?.filters || {
    label: '',
    startDate: null,
    endDate: null,
  };

  const { totalAmount, totalPendingAmount, filteredExpenses } = calculateTotals(
    selectedListExpenses,
    filters
  );

  selectedListExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className={sty.home}>
      <Sidebar mobileState={mobileState} setMobileState={setMobileState} />
      <div className={`${sty.homeBody}`}>
        <div className={sty.titles}>
          <p>{selectedList.name}</p>
          <div className={sty.desktopOnly}>
            <ExportExpenses expenses={selectedListExpenses} />
          </div>
        </div>
        <div className={sty.overviewBox}>
          <SpentCard
            title={'Total Expances'}
            type="primary"
            amount={totalAmount}
          />
          <SpentCard
            title={'Total Paid'}
            type="success"
            amount={totalAmount - totalPendingAmount}
          />
          <SpentCard
            title={'Total Pending'}
            type="danger"
            amount={totalPendingAmount}
          />
        </div>
        <div className={sty.expTitles}>
          <p>
            Expenses
            <small>
              {' '}
              ({selectedList.filters.label ? selectedList.filters.label : 'All'}
              )
            </small>
            {selectedList.filters.startDate && selectedList.filters.endDate ? (
              <small>
                From{' '}
                <strong>{formatDate(selectedList.filters.startDate)}</strong> to{' '}
                <strong>{formatDate(selectedList.filters.endDate)}</strong>
              </small>
            ) : (
              <></>
            )}
          </p>
        </div>
        <div className={sty.exp}>
          <DataRows head={true} />
          {filteredExpenses.length > 0 ? (
            <>
              {filteredExpenses.map((data, index) => (
                <DataRows
                  key={index}
                  data={data}
                  index={index + 1}
                  setData={setSelectedData}
                  head={false}
                />
              ))}
            </>
          ) : (
            <div className={sty.emptyList}>
              <img src={noDollar} alt="" />
              <p>Sorry! No Record Found</p>
            </div>
          )}
        </div>
        <div className={sty.mobileNav}>
          {mobileState === 'home' ? (
            <>
              <div
                className={sty.mobileItem}
                onClick={() => setMobileState('library')}
              >
                <img src={library} alt="" />
                <p>My Library</p>
              </div>
              <div
                className={sty.mobileItem}
                onClick={() => setMobileState('action')}
              >
                <img src={setting} alt="" />
                <p>Action Center</p>
              </div>
            </>
          ) : (
            <div
              className={sty.mobileItem}
              onClick={() => setMobileState('home')}
            >
              <img src={close} alt="" />
              <p>CLOSE</p>
            </div>
          )}
        </div>
      </div>
      <Actionbar mobileState={mobileState} setMobileState={setMobileState} />
    </div>
  );
};
export default Home;
