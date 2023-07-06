import React from 'react';

import sty from './DataRows.module.scss';

const DataRows = ({ data, head = false }) => {
  return (
    <div className={`${sty.expRows} ${head === true && sty.head}`}>
      <p className={`${sty.cell1} ${sty.cells}`}>S.no</p>
      <p className={`${sty.cell4} ${sty.cells}`}>Label</p>
      <p className={`${sty.cell5} ${sty.cells}`}>Description</p>
      <p className={`${sty.cell3} ${sty.cells}`}>Amount</p>
      <p className={`${sty.cell6} ${sty.cells}`}>Pending</p>
    </div>
  );
};

export default DataRows;
