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
    default:
      return '';
  }
};
