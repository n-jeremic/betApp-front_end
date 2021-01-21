export const filterResolvedPromise = (apiResponse, type) => {
  if (type === 'array') {
    const map = []
    apiResponse.forEach(axiosObject => {
      if (!checkErrors(axiosObject)) {
        if (axiosObject.data.response.length) {
          map.push(axiosObject.data.response)
        }
      } else {
        throw new Error()
      }
    })

    return map
  } else {
    if (!checkErrors(apiResponse)) return apiResponse.data.response[0]
    else throw new Error()
  }
}

export const globalErrorHandler = componentErrorHandlerObj => {
  const callbackArg = componentErrorHandlerObj.argument
  if (callbackArg) componentErrorHandlerObj.callback(callbackArg)
  else componentErrorHandlerObj.callback()
}

const checkErrors = axiosObject => {
  const errors = axiosObject.data.errors
  return !(Array.isArray(errors) && errors.length === 0)
}
