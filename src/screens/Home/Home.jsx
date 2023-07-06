import React, { useContext } from 'react';
import sty from './Home.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import SpentCard from '../../components/SpentCard/SpentCard';
import DataRows from '../../components/DataRows/DataRows';
import Actionbar from '../../components/Actionbar/Actionbar';
import { context } from '../../store/store';

const Home = () => {
  const { state, dispatch } = useContext(context);
  return (
    <div className={sty.home}>
      <Sidebar />
      <div className={sty.body}>
        <p className={sty.titles}>Overview</p>
        <div className={sty.overviewBox}>
          <SpentCard title={'Total Expances'} type="primary" />
          <SpentCard title={'Total Paid'} type="success" />
          <SpentCard title={'Total Pending'} type="danger" />
        </div>
        <p className={sty.titles}>Expanses</p>
        <div className={sty.exp}>
          <DataRows head={true} />
          <DataRows />
          <DataRows />
          <DataRows />
          <DataRows />
          <DataRows />
          <DataRows />
          <DataRows />
          <DataRows />
          <DataRows />
          <DataRows />
          <div className={sty.pages}></div>
        </div>
      </div>
      <Actionbar />
    </div>
  );
};
export default Home;
