const passwordValidator = (categoryObj) => {
  const error = {};

  if (!categoryObj.password) {
    error.password = "Required!";
  }

  if (!categoryObj.newPassword) {
    error.newPassword = "Required!";
  }
  if (!categoryObj.confirmPassword) {
    error.confirmPassword = "Required!";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default passwordValidator;
