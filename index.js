// Your code here
const createEmployeeRecord = function(arr) { 
    return { 
        firstName: arr[0], 
        familyName: arr[1], 
        title: arr[2], 
        payPerHour: arr[3], 
        timeInEvents: [], 
        timeOutEvents: []
    }
} 

const createEmployeeRecords = function(employeeData) { 
    return employeeData.map(function(data) { 
        return createEmployeeRecord(data)
    })
}

const createTimeInEvent = function(employee, dateTime) { 
    let [date, hour] = dateTime.split(' ')
    
    employee.timeInEvents.push({ 
        type: "TimeIn", 
        hour: parseInt(hour, 10), 
        date,
    }) 
    return employee
}

const createTimeOutEvent = function(employee, dateTime) { 
    let [date, hour] = dateTime.split(' ') 

    employee.timeOutEvents.push({ 
        type: "TimeOut", 
        hour: parseInt(hour, 10), 
        date,
    }) 
    return employee
}

const hoursWorkedOnDate = function(employee, neededDate) { 
    let inDate = employee.timeInEvents.find(function(e) { 
        return e.date === neededDate
    }) 

    let outDate = employee.timeOutEvents.find(function(e){ 
        return e.date === neededDate
    }) 

    return (outDate.hour - inDate.hour) / 100
}
const wagesEarnedOnDate = function(employee, neededDate){ 
    let hours = hoursWorkedOnDate(employee, neededDate) 
    let wage = hours * employee.payPerHour 
    return parseFloat(wage.toString())
}

const allWagesFor = function(employee){ 
    let allDates = employee.timeInEvents.map(function(e){ 
        return e.date
    }) 

    let amount = allDates.reduce(function(memo, i){ 
        return memo + wagesEarnedOnDate(employee, i)
    }, 0) 
    return amount
} 

const findEmployeeByFirstName = function(arr, firstName){ 
    return arr.find(function(employee){ 
        return employee.firstName === firstName
    })
} 

const calculatePayroll = function(arr){ 
    return arr.reduce(function(memo, i){ 
        return memo + allWagesFor(i)
    }, 0)
}