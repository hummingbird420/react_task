const clientEditTicketValidation = (ticketObj) => {
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

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

export default clientEditTicketValidation;
