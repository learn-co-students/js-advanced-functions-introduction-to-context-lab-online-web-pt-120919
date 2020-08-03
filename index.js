// Your code here
function createEmployeeRecord(arr) {
  let record = { 
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return record;
}

function createEmployeeRecords(arr) {
  
  let records = [];
  for (let i = 0; i < arr.length; i++) {
    records.push(createEmployeeRecord(arr[i]));
  } 
  return records;
}

function createTimeInEvent(record, event) {
  let newEvent = {
    type: "TimeIn",
    date: event.split(' ')[0],
    hour: parseInt(event.split(' ')[1])
  };
  record.timeInEvents.push(newEvent);
  return record;
}

function createTimeOutEvent(record, event) {
  let newEvent = {
    type: "TimeOut",
    date: event.split(' ')[0],
    hour: parseInt(event.split(' ')[1])
  };
  record.timeOutEvents.push(newEvent);
  return record;
}

function hoursWorkedOnDate(record, date) {
  let timeIn = record.timeInEvents.find(event => event.date == date).hour;
  let timeOut = record.timeOutEvents.find(event => event.date == date).hour;
  const timeWorked = timeOut - timeIn;
  return timeWorked/100;
}

function wagesEarnedOnDate(record, date) {
  const rate = record.payPerHour;
  const hours = hoursWorkedOnDate(record, date);
  const wage = rate * hours;
  return wage;
}

function allWagesFor(record) {
  let dates = record.timeInEvents.map(event => {return event.date;});
  
  let total = dates.reduce((acc, itt) => {
    return acc + wagesEarnedOnDate(record, itt);
  }, 0);
  
  return total;
}

function calculatePayroll(employees) {
  let total = employees.reduce((acc, emp) => {
    return acc + allWagesFor(emp);
  }, 0);

  return total;
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find(e => { return e.firstName == firstName; });
}