export const filterFinancialData = (financialData, filters) => {
  const { listType, month, year, pId } = filters;

  const monthYearFilter = month * 10000 + year;

  if (listType === 'monthly') {
    const filtered = financialData.transactions?.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() + 1 === month &&
        transactionDate.getFullYear() === year
      );
    });

    const summary = financialData.monthlyData.find(
      data => data.monthYear === monthYearFilter
    ) || {
      income: 0,
      expenses: 0,
      planned: 0,
      actual: 0,
      monthYear: monthYearFilter,
    };

    return { transactions: filtered, summary };
  }

  if (listType === 'personal') {
    const personalList = financialData.personalLists?.find(
      list => list.pId === pId
    );

    if (!personalList) {
      return {
        transactions: [],
        summary: { income: 0, expenses: 0, planned: 0, actual: 0 },
      };
    }

    const { income, expenses, planned, actual } = personalList;
    const summary = { income, expenses, planned, actual };

    return { transactions: personalList.transactions, summary };
  }

  return {
    transactions: [],
    summary: { income: 0, expenses: 0, planned: 0, actual: 0 },
  };
};
