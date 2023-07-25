export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = password => {
  return password.length >= 6;
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

export const getAuthErrorMessage = errorCode => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'User not found';
    case 'auth/wrong-password':
      return 'Invalid password';
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/invalid-email':
      return 'Invalid email';
    case 'auth/weak-password':
      return 'Weak password';
    case 'auth/network-request-failed':
      return 'Network request failed';
    // Add more cases for other error codes as needed
    default:
      return '';
  }
};
export const formatDate = dateStr => {
  const date = new Date(dateStr);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};
