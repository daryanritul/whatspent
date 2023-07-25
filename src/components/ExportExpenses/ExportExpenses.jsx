import React, { useContext, useRef } from 'react';
import sty from './ExportExpenses.module.scss';
import ExcelJS from 'exceljs';

import download from '../../assets/download.svg';
import upload from '../../assets/upload.svg';
import { setExpenses } from '../../store/actions';
import { context } from '../../store/store';
import { v4 } from 'uuid';

const ExportExpenses = ({ expenses }) => {
  const { dispatch } = useContext(context);
  const fileInputRef = useRef(null);

  const handleExportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Expenses');

    // Add headers
    sheet.addRow([
      'Id',
      'Date',
      'Label',
      'Description',
      'Amount',
      'Pending Amount',
    ]);

    // Add data
    expenses.forEach(expense => {
      sheet.addRow([
        expense.id,
        expense.date,
        expense.label,
        expense.description,
        expense.amount,
        expense.pendingAmount,
      ]);
    });

    // Generate the file
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Expenses.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async e => {
        const buffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        const worksheet = workbook.getWorksheet(1);

        const importedExpenses = [];
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber > 1) {
            const [sno, id, date, label, description, amount, pendingAmount] =
              row.values;
            importedExpenses.push({
              id: v4(),
              date,
              label,
              description,
              amount,
              pendingAmount,
            });
          }
        });

        setExpenses(importedExpenses)(dispatch);
      };

      reader.readAsArrayBuffer(file);
    }
    event.target.value = null;
  };

  return (
    <div className={sty.exportExpenses}>
      {/* Excel Export */}
      <button onClick={handleExportToExcel} className={sty.exportBtn}>
        <img src={download} alt="" className={sty.downImg} />
        Export Excel
      </button>
      <div className={sty.exportBtn}>
        <img src={upload} alt="" className={`${sty.downImg}`} />
        Import Excel
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className={sty.upload}
          title=" "
          id="file-input"
        />
      </div>
    </div>
  );
};

export default ExportExpenses;
