function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(function(emp){ 
        return createEmployeeRecord(emp)
    })
}

function createTimeInEvent(emp, timeIn) {
    let [day, time] = timeIn.split(' ')
    emp.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: day
    })
    return emp
}

function createTimeOutEvent(emp, timeOut) {
    let [day, time] = timeOut.split(' ')
    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: day
    })
    return emp
}

function hoursWorkedOnDate(emp, day) {
    let timeIn = emp.timeInEvents.find(function(e){
        return e.date === day
    })

    let timeOut = emp.timeOutEvents.find(function(e){
        return e.date === day
    })

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(emp, day) {
    let workedHours = hoursWorkedOnDate(emp, day)
    let payRate = emp.payPerHour

    return workedHours * payRate
}

function allWagesFor(emp) {
    let dates = emp.timeInEvents.map(function(e) {
        return e.date
    })

    let amountPerDay = dates.map(function(e) {
        return wagesEarnedOnDate(emp, e)
    })

    return amountPerDay.reduce(function(a, b) {return a + b})
}

function findEmployeeByFirstName(sourceArray, name) {
    return sourceArray.find(function(e){
        return e.firstName === name
    })
}

function calculatePayroll(employees){
    let empPay = employees.map(function(emp) {
        return allWagesFor(emp)
    })

    return empPay.reduce(function(a, b) {return a + b})
}