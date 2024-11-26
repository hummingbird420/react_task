const recoveryValidator = (categoryObj) => {
  const error = {};

  if (!categoryObj.userName) {
    error.userName = "Required!";
  }

  if (!categoryObj.cellPhone) {
    error.cellPhone = "Required!";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default recoveryValidator;
