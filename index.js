function createEmployeeRecord(arr){
    let obj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return obj
}

function createEmployeeRecords(arrays){
    let newArr = [];
    
    for (let arr of arrays) {
        newArr.push(createEmployeeRecord(arr))
    }
    return newArr;
}


function createTimeInEvent(employee, date){
    let dateArr = date.split(" ")
    
    let timeInEventsObj = {
        type: "TimeIn",
        hour: Number(dateArr[1]),
        date: dateArr[0]
    }

    employee.timeInEvents.push(timeInEventsObj);
    return employee
}

function createTimeOutEvent(employee, date){
    let dateArr = date.split(" ")
    
    let timeOutEventsObj = {
        type: "TimeOut",
        hour: Number(dateArr[1]),
        date: dateArr[0]
    }

    employee.timeOutEvents.push(timeOutEventsObj);
    return employee;
}

function hoursWorkedOnDate(employee, date){
    let timeOut;
    for (let event of employee.timeOutEvents){
        if (event.date == date)
            timeOut = event.hour;
    }  
   
    let timeIn;
    for (let event of employee.timeInEvents){
        if (event.date == date)
            timeIn = event.hour;
    } 
 
    return ((timeOut - timeIn) / 100)
}

function wagesEarnedOnDate(employee, date){
    let answer = hoursWorkedOnDate(employee, date)
    let wage = employee.payPerHour
    return answer * wage 
}

function allWagesFor(employee){
    let answer = [];
    for (let event of employee.timeInEvents){
        answer.push(wagesEarnedOnDate(employee, event.date))
    }
    
    return answer.reduce((accumulator, wage) => {
        return wage + accumulator
    }, 0)

    /////
    let total = 0;
    for (let event of employee.timeInEvents){
        total += wagesEarnedOnDate(employee, event.date)
    }
    return total;

}

function findEmployeeByFirstName(srcArray, firstName){
    let found = srcArray.find(function(record) {
        if(record.firstName == firstName)
            return true;
    });

    return found
}

function calculatePayroll(employees){
    // let answer = [];
    // for (let employee of employees){
    //     answer.push(allWagesFor(employee))
    // }
    // return answer.reduce((accumulator, wageTotals) => {
    //     return wageTotals + accumulator
    // }, 0)

    return employees.reduce((accumulator, employee) => {
        return allWagesFor(employee) + accumulator
    }, 0)
}