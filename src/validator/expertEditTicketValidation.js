const expertEditTicketValidation = (ticketObj) => {
  const error = {};

  if (!ticketObj.description) {
    error.description = "Required!";
  }
  if (!ticketObj.dateReported) {
    error.dateReported = "Required!";
  }
  if (!ticketObj.facilityID) {
    error.facilityID = "Please select an option!";
  }
  if (!ticketObj.systemID) {
    error.systemID = "Please select an option!";
  }
  if (!ticketObj.thirdLevelCategoryID) {
    error.thirdLevelCategoryID = "Please select an option!";
  }
  if (!ticketObj.secondLevelCategoryID) {
    error.secondLevelCategoryID = "Please select an option!";
  }
  if (!ticketObj.firstLevelCategoryID) {
    error.firstLevelCategoryID = "Please select an option!";
  }
  if (!ticketObj.priorityID) {
    error.priorityID = "Please select an option!";
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default expertEditTicketValidation;
