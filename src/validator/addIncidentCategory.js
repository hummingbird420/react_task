const addIncidentCategoryValidator = (categoryObj) => {
  const error = {};

  if (!categoryObj.incidentCategorys) {
    error.incidentCategorys = "Please provide a category name";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default addIncidentCategoryValidator;
