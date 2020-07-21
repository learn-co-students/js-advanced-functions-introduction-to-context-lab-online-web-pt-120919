// Your code here
let createEmployeeRecord = function(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents : [],
        timeOutEvents:[]   
    }
}

let createEmployeeRecords = function(employeeRecords){
    return employeeRecords.map(function(array){
        return createEmployeeRecord(array)        
    })
}

let createTimeInEvent = function(record, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return record
}

let createTimeOutEvent = function(record, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return record
}

let hoursWorkedOnDate = function(record, workDate){
    let inEvent = record.timeInEvents.find(function(e){
        return e.date === workDate
    })

    let outEvent = record.timeOutEvents.find(function(e){
        return e.date === workDate
    })
    
    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(record, workDate){
    let realWages = hoursWorkedOnDate(record, workDate) * record.payPerHour
        return realWages
}

let allWagesFor = function(record){
    let workDates = record.timeInEvents.map(function(e){
        return e.date
    })

    let pay = workDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(record, d)
    }, 0)
    return pay
}

let findEmployeeByFirstName = function(array, firstName){
    return array.find(function(record){
        return record.firstName === firstName
    })
}

let calculatePayroll = function(array){
    return array.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)

}