function createEmployeeRecord(employeeArray) {
    return Object.assign({
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    })
}

function createEmployeeRecords(arrayOfArrays){
    let employeeArray = []
    for (const employee of arrayOfArrays){
        employeeArray.push(createEmployeeRecord(employee))
    }
    return employeeArray
}

function createTimeInEvent(record, dateTime){
    let [date, hour] = dateTime.split(" ")
    let newRecord = record
    newRecord.timeInEvents.push({
        "type": "TimeIn",
        "hour": parseInt(hour, 10),
        date,
    })
    return newRecord 
}

function createTimeOutEvent(record, dateTime){
    let [date, hour] = dateTime.split(" ")
    let newRecord = record
    newRecord.timeOutEvents.push({
        "type": "TimeOut",
        "hour": parseInt(hour, 10),
        date,
    })
    return newRecord 
}

function hoursWorkedOnDate(record, date){
    let inEvent = record.timeInEvents.find(function(event){
        return event.date === date 
    })

    let outEvent = record.timeOutEvents.find(function(event){
        return event.date === date
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(record, date){
    let hours = hoursWorkedOnDate(record, date)
    return hours * record.payPerHour
}

function allWagesFor(record){
    let dates = record.timeInEvents.map(record => record.date)

    let wages = dates.reduce(function(wages, date){
        return wages + wagesEarnedOnDate(record, date)
    }, 0)

    return wages
}

function findEmployeeByFirstName(srcArray, firstName){
    let employee = srcArray.find(function(event){
        return event.firstName === firstName
    })

    return employee
}

function calculatePayroll(array){
    let wages = array.reduce(function(wages, employee){
        return wages + allWagesFor(employee)
    }, 0)

    return wages
}

