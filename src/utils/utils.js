export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = password => {
  return password.length >= 8;
};

export const comparePasswords = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const calculateTotals = (expenses, filters) => {
  let filteredExpenses = filters.label
    ? expenses.filter(expense => expense.label === filters.label)
    : expenses;

  if (filters.startDate && filters.endDate) {
    filteredExpenses = filteredExpenses.filter(
      expense =>
        new Date(expense.date) >= new Date(filters.startDate) &&
        new Date(expense.date) <= new Date(filters.endDate)
    );
  }

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );
  const totalPendingAmount = filteredExpenses.reduce(
    (sum, expense) => sum + Number(expense.pendingAmount),
    0
  );

  return { totalAmount, totalPendingAmount, filteredExpenses };
};
