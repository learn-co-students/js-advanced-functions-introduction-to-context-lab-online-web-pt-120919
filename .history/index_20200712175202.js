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
  let hourIn = parseInt(employeeObj.timeInEvents.find(obj => obj.date === date).hour).slice(0, 2)
  let hourOut = parseInt(employeeObj.timeOutEvents.find(obj => obj.date === date).hour).slice(0, 2)
  console.log(hourOut - hourIn)
}
