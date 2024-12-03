export const getPersonalListOptions = financialData => {
  const { personalLists } = financialData;

  if (!Array.isArray(personalLists)) {
    return [];
  }

  return personalLists.map(list => ({
    pId: list.pId,
    name: list.name,
  }));
};

export const calculateBalances = transactions => {
  return transactions
    ?.sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, transaction, index) => {
      const previousBalance = acc[0]?.newBal || 0;
      const newBalance =
        transaction.type === 'income'
          ? previousBalance + transaction.amount
          : previousBalance - transaction.amount;

      return [{ ...transaction, newBal: newBalance }, ...acc];
    }, []);
};
