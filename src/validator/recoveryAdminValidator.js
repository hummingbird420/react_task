const recoveryAdminValidator = (categoryObj) => {
  const error = {};

  if (!categoryObj.password) {
    error.password = "Required!";
  }

  if (!categoryObj.confirmPassword) {
    error.confirmPassword = "Required!";
  } else if (categoryObj.password !== categoryObj.confirmPassword) {
    error.password = "Password are not same!";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default recoveryAdminValidator;
