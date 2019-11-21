const catchErrors = (error, displayErr) => {
  let errorMsg
  if (error.response) {
    // The request was made and server responded with
    //status code that is not in the range of 2XX
    errorMsg = error.response.data
    console.log('Error response', errorMsg)

    // For cloudinary image uploads
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message
    }
  } else if (error.request) {
    // request was made but no response back
    errorMsg = error.request
    console.log('Error request', errorMsg)
  } else {
    //   Something else in request casuing error
    errorMsg = error.message
    console.log('Error message', errorMsg)
  }
  displayErr(errorMsg)
}

export default catchErrors
