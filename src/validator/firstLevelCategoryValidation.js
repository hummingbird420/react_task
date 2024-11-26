const fistLevelCategoryValidator = (categoryObj) => {
  const error = {};

  if (!categoryObj.description) {
    error.description = "Required!";
  }

  if (!categoryObj.incidentCategorys) {
    error.incidentCategorys = "Required!";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default fistLevelCategoryValidator;
