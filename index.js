// Your code here
function createEmployeeRecord(arr){
 const employee = {
     firstName: arr[0],
     familyName: arr[1],
     title: arr[2],
     payPerHour: arr[3],
     timeInEvents: [],
     timeOutEvents: []
 }
 return employee
}

function createEmployeeRecords(arrOfEmployees){
    return arrOfEmployees.map(item => {
        return createEmployeeRecord(item)
    })
}

function createTimeInEvent(record, dateStamp){
    const parseStamp = dateStamp.split(' ')
    const clockIn = {
        type: "TimeIn",
        hour: parseInt(parseStamp[1],10),
        date: parseStamp[0]
    }
    record.timeInEvents.push(clockIn)
return record
}

function createTimeOutEvent(record, dateStamp){
    const parseStamp = dateStamp.split(' ')
    const clockOut = {
        type: "TimeOut",
        hour: parseInt(parseStamp[1],10),
        date: parseStamp[0]
    }
    record.timeOutEvents.push(clockOut)
return record
}

let hoursWorkedOnDate = function(record, date){
    let timeIn = record.timeInEvents.find(event =>{
        return event.date == date
    })

    let timeOut = record.timeOutEvents.find(event =>{
        return event.date == date
    })
       return  (timeOut["hour"] - timeIn["hour"])/100
       
    }

let wagesEarnedOnDate = function (record, date){
return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record){
    let dates = record.timeInEvents.map(event =>{
        return event.date
    })

    let pay = dates.reduce(function(total, d){
       return total + wagesEarnedOnDate(record, d)
    },0)
    return pay
}

function findEmployeeByFirstName(arr, firstName){
   let foundEmployee = arr.find(record =>{
        return record.firstName === firstName
    })
    return foundEmployee
}
    
function calculatePayroll(arr){
   let allEmployee = arr.reduce((total,record) =>{
    return total + allWagesFor(record)
    },0)
return allEmployee
}
