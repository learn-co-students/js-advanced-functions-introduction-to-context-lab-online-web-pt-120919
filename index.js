function createEmployeeRecord(employeeRecord) {
  return {
    firstName: employeeRecord[0],
    familyName: employeeRecord[1],
    title: employeeRecord[2],
    payPerHour: employeeRecord[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employeeRecords){
  return employeeRecords.map(function(employeeRecord) {
    return createEmployeeRecord(employeeRecord)
  })
}

function createTimeInEvent(employeeRecord, dateStamp) {
  let [date, hour] = dateStamp.split(" ")
  
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  })
  debugger
  return employeeRecord

}

function createTimeOutEvent(employeeRecord, dateStamp) {
  let [date, hour] = dateStamp.split(" ")
  
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  })
  return employeeRecord

}

function hoursWorkedOnDate(employeeRecord, date) {
  let clockIn = employeeRecord.timeInEvents.find( (event) => {
    return event.date === date
  })
  let clockOut = employeeRecord.timeOutEvents.find( (event) => {
    return event.date === date
  })
  return (clockOut.hour - clockIn.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, date) {
  let hours = hoursWorkedOnDate(employeeRecord, date)
  let wage = employeeRecord.payPerHour
  return hours * wage
}

function allWagesFor(employeeRecord) {
  let payPeriodHours = employeeRecord.timeInEvents.map( (events) => {
    return events.date
  })
  let totalPay = payPeriodHours.reduce(function(hours, date) {
    return hours + wagesEarnedOnDate(employeeRecord, date)
  }, 0)
  return totalPay
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(function(hours, records){
    return hours + allWagesFor(records)
}, 0)
}

function findEmployeeByFirstName(employeeRecords, firstName) {
  return employeeRecords.find(function(record){
    return record.firstName === firstName
  })
}