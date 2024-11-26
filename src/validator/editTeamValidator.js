const editTeamValidator = (categoryObj) => {
  const error = {};

  if (!categoryObj.teamName) {
    error.teamName = "Required!";
  }

  if (!categoryObj.description) {
    error.description = "Required!";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default editTeamValidator;
