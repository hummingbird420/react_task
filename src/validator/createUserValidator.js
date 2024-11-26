const createUserValidator = (ticketObj) => {
  const error = {};

  if (!ticketObj.countryCode) {
    error.countryCode = "Required!";
  }
  if (!ticketObj.cellphone) {
    error.cellphone = "Required!";
  }
  if (!ticketObj.roleID) {
    error.roleID = "Please select an option!";
  }
  if (!ticketObj.password) {
    error.password = "Required!";
  }

  if (!ticketObj.username) {
    error.username = "Required!";
  }
  if (!ticketObj.surname) {
    error.surname = "Required!";
  }

  if (!ticketObj.name) {
    error.name = "Required!";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default createUserValidator;
