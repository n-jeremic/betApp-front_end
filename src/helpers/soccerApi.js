import store from '../store/index'

export const filterResolvedPromise = (apiResponse, type) => {
  if (type === 'array') {
    const map = []
    apiResponse.forEach(axiosObject => {
      if (!checkErrors(axiosObject)) {
        if (axiosObject.data.response.length) {
          map.push(axiosObject.data.response)
        }
      } else if (axiosObject.data.errors.requests) {
        throw new Error('api_key_expired')
      } else {
        throw new Error()
      }
    })

    return map
  } else {
    if (!checkErrors(apiResponse)) return apiResponse.data.response[0]
    else if (apiResponse.data.errors.requests) throw new Error('api_key_expired')
    else throw new Error()
  }
}

export const globalErrorHandler = async (errorObject, componentErrorHandlerObj, callbackFn) => {
  if (errorObject.message === 'api_key_expired') {
    const actionResponse = await store.dispatch('soccerApi/refreshApiKey')
    if (actionResponse === 'success') return callbackFn()
  }

  const callbackArg = componentErrorHandlerObj.argument
  return componentErrorHandlerObj.callback(callbackArg)
}

const checkErrors = axiosObject => {
  const errors = axiosObject.data.errors
  return !(Array.isArray(errors) && errors.length === 0)
}
