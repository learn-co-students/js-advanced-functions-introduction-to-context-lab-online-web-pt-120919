// Your code here
function createEmployeeRecord(array) {
  const employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee
}

function createEmployeeRecords(arrayOfEmployees) {
  return arrayOfEmployees.map(emp => createEmployeeRecord(emp))
}


function createTimeInEvent(employee, dateTime) {
  let [date, hour] = dateTime.split(' ')

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

function createTimeOutEvent(employee, dateTime) {
  let [date, hour] = dateTime.split(' ')

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(function (e){
    return e.date === date
  })

  let timeOut = employee.timeOutEvents.find(function (e){
    return e.date === date
  })

  return (timeOut["hour"] - timeIn["hour"]) / 100
}

function wagesEarnedOnDate(employee, date){
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
  let dates = employee.timeInEvents.map(e => {
    return e.date
  })

  let wages = dates.reduce(function(pay, date){
    return pay + wagesEarnedOnDate(employee, date)
  }, 0)
  return wages
}

function calculatePayroll(employees){
  return employees.reduce(function(memo, emp){
    return memo + allWagesFor(emp)
  }, 0)
}

function findEmployeeByFirstName(array, firstName){
  return array.find(function(name){
    return name.firstName === firstName
  })
}
