const editUserValidation = (ticketObj) => {
  const error = {};

  if (!ticketObj.name) {
    error.name = "Required!";
  }
  if (!ticketObj.surname) {
    error.surname = "Required!";
  }

  if (!ticketObj.cellphone) {
    error.cellphone = "Required!";
  }

  if (!ticketObj.countryCode) {
    error.countryCode = "Required!";
  }

  if (!ticketObj.roleID) {
    error.roleID = "Please select an option!";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default editUserValidation;
