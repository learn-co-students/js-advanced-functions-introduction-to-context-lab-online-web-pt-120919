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
  console.log(employees)
}
