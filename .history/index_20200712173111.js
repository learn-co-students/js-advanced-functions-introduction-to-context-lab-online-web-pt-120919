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
  console.log(split)
  // let timeEvent = {
  //   timeIn: time.split(" ")[0],
  //   date: time.split()
  // }
}
