const loginValidator = (categoryObj) => {
  const error = {};

  if (!categoryObj.userName) {
    error.userName = "Required!";
  }

  if (!categoryObj.password) {
    error.password = "Required!";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default loginValidator;
