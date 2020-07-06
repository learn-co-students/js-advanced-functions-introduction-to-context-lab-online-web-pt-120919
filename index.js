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
    console.log(outEvent)
    console.log(inEvent)
    let hours = outEvent.hour - inEvent.hour
    return hours
}