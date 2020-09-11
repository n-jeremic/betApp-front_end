export const generatePeriods = numOfPeriods => {
  const periods = []

  for (let i = 0; i < numOfPeriods; i++) {
    const from = new Date()
    if (periods.length) {
      from.setDate(periods[i - 1].to.getDate() + 1)
    }
    const to = generateEndDateBasedOnStartDate(from)
    periods.push({
      from,
      to
    })
  }

  return periods.map(element => {
    element.to = generateDateString(element.to)
    element.from = generateDateString(element.from)
    return element
  })
}

export const generateDateString = dateObject => {
  const year = dateObject.getFullYear()
  let month = (dateObject.getMonth() + 1).toString()
  let day = dateObject.getDate()

  if (month.length === 1) {
    month = `0${month}`
  }

  if (day.length === 1) {
    day = `0${day}`
  }

  return `${year}-${month}-${day}`
}

export const filterResolvedPromises = responsesArray => {
  const map = []
  responsesArray.forEach(axiosObject => {
    const errors = axiosObject.data.errors
    if (Array.isArray(errors) && errors.length === 0) {
      if (axiosObject.data.response.length) {
        map.push(axiosObject.data.response)
      }
    } else {
      throw new Error()
    }
  })

  return map
}

const generateEndDateBasedOnStartDate = startDateObject => {
  let result = new Date()
  const requiredDay = startDateObject.getDay()
  const requiredDate = startDateObject.getDate()

  if (findPeriodForRequiredDay(requiredDay) === 'tue - thu') {
    result.setDate(requiredDate + (4 - requiredDay))
    return result
  }

  if (requiredDay === 0) result.setDate(requiredDate + 1)
  else if (requiredDay === 1) result = startDateObject
  else result.setDate(requiredDate + (8 - requiredDay))

  return result
}

const findPeriodForRequiredDay = day => {
  if (day > 1 && day < 5) return 'tue - thu'
  else return 'fri - mon'
}
