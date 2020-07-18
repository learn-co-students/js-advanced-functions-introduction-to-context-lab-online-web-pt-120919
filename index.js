function createEmployeeRecord(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees){
    return employees.map(employee => {return createEmployeeRecord(employee)})
}

function createTimeInEvent(employee, date){
    let [day, hour] = date.split(" ")
    let clockIn = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: day
    }
    employee.timeInEvents.push(clockIn)
    return employee
}

function createTimeOutEvent(employee, date){
    let [day, hour] = date.split(" ")
    let clockOut = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: day
    }
    employee.timeOutEvents.push(clockOut)
    return employee
}

function hoursWorkedOnDate(employee, day){
    return ((employee.timeOutEvents.find(el => el.date == day ).hour - employee.timeInEvents.find(el => el.date == day ).hour)/100)
}

function wagesEarnedOnDate(employee, day){
    return hoursWorkedOnDate(employee, day) * employee.payPerHour
}

function allWagesFor(employee){

    return employee.timeInEvents.reduce(function(wages, day){
        return wages + wagesEarnedOnDate(employee, day.date)
    }, 0)

}

function calculatePayroll(employees){
    return employees.reduce(function(wages, employee){
        return wages + allWagesFor(employee)
    }, 0)
}

function findEmployeeByFirstName(employees, firstName){
    return employees.find(employee => employee.firstName == firstName)
}