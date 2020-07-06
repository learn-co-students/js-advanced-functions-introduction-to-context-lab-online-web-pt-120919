// const { transformFileSync } = require("babel-core")

// Your code here
function createEmployeeRecord(employeeInfoArray) {
    let dataObj = {}
    dataObj.firstName = employeeInfoArray[0]
    dataObj.familyName = employeeInfoArray[1]
    dataObj.title = employeeInfoArray[2]
    dataObj.payPerHour = employeeInfoArray[3]
    dataObj.timeInEvents = []
    dataObj.timeOutEvents = []

    return dataObj    
}

function createEmployeeRecords(arrOfArrs) {
    return arrOfArrs.map(function(e) {
        return createEmployeeRecord(e)
    })
}

let createTimeInEvent = function(empRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    empRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date 
    })
    return empRecord
}

let createTimeOutEvent = function(empRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    empRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date 
    })
    return empRecord
}

let hoursWorkedOnDate = function(empRecord, dateStamp) {
    let outEvent = empRecord.timeOutEvents.find(function(e) {return e.date === dateStamp})
    let inEvent = empRecord.timeInEvents.find(function(e) {return e.date === dateStamp})
    let hours = outEvent.hour - inEvent.hour
    return hours/100 
}

let wagesEarnedOnDate = function(empRecord, dateStamp) {
    let hours = hoursWorkedOnDate(empRecord, dateStamp)
    let moneyOwed = hours * empRecord.payPerHour
    return moneyOwed
}

let allWagesFor = function(empRecord) {
    let dates = empRecord.timeInEvents.map(function(e){
        return e.date 
    })
    let wages = dates.reduce(function(memo, date) {
        return memo += wagesEarnedOnDate(empRecord, date)
    },0)
    return wages 
}

let calculatePayroll = function(employees) {
    let total = employees.reduce(function(memo, employee) {
        return memo += allWagesFor(employee)
    },0)
    return total 
}

let findEmployeeByFirstName = function(employees, name) {
    let employee = employees.find(function(e){
        return e.firstName === name
    })
    return employee
}