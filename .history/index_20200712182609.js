function createEmployeeRecord(arr) {
  let person = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return person
}

function createEmployeeRecords(employees) {
  let employeeRecords = [];
  employees.forEach(record => employeeRecords.push(createEmployeeRecord(record)))
  return employeeRecords
}

function createTimeInEvent(employee, time) {
  let split = time.split(" ")
  let timeEvent = {
    type: "TimeIn",
    hour: parseInt(split[1]),
    date: split[0]
  }
  employee.timeInEvents.push(timeEvent)
  return employee
}

function createTimeOutEvent(employee, time) {
  let split = time.split(" ")
  let timeEvent = {
    type: "TimeOut",
    hour: parseInt(split[1]),
    date: split[0]
  }
  employee.timeOutEvents.push(timeEvent)
  return employee
}

function hoursWorkedOnDate(employeeObj, date) {
  let hourIn = employeeObj.timeInEvents.find(obj => obj.date === date).hour
  let hourOut = employeeObj.timeOutEvents.find(obj => obj.date === date).hour
  return (hourOut - hourIn) / 100
}

function wagesEarnedOnDate(workerObject, date) {
  let hours = hoursWorkedOnDate(workerObject, date)
  return workerObject.payPerHour * hours
}

function allWagesFor(workerObj) {
  let accum = 0
  for (let i = 0; i < workerObj.timeInEvents.length; i++){
    accum += (hoursWorkedOnDate(workerObj, workerObj.timeInEvents[i].date))
  }
  return accum * workerObj.payPerHour
}

function calculatePayroll(something){
  let newMap =  something.map(person => allWagesFor(person))
  return newMap.reduce((accum, num)=>{return accum + num})
}

function findEmployeeByFirstName(arr, employee) {
  return arr.forEach(employee => employee.find(value => value.firstName === employeeName))
}