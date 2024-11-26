const editProjectValidator = (categoryObj) => {
  const error = {};

  if (!categoryObj.projectName) {
    error.projectName = "Required!";
  }

  if (!categoryObj.description) {
    error.description = "Required!";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default editProjectValidator;
