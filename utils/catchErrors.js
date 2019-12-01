function catchErrors(error, displayError){
  let errorMsg;
  if (error.response) {
    // The request was made and the serveer responseded with status code that is not range of 2XX
    errorMsg = error.response.data
    console.error("Error response", errorMsg)

    // For Cloudinary image upload
    if(error.response.data.error){
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    // Request was made, but no response was recieved
    errorMsg = error.request
    console.error("Error request", errorMsg)
  } else { 
    // Something else in request triggering error
    errorMsg = error.message
    console.error("Error message", errorMsg)
  }
  displayError(errorMsg)
}

export default catchErrors
