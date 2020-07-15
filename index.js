// Your code here

let createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arr) {
       return arr.map(createEmployeeRecord)
}

let createTimeInEvent = function(emply, dateTime) {
    let [date, hour] = dateTime.split(' ')

    emply.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10), 
        date
    })
    return emply
}

let createTimeOutEvent = function(emply, dateTime) {
    let [date, hour] = dateTime.split(' ')

    emply.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10), 
        date
    })
    return emply
}

let hoursWorkedOnDate = function(emply, needDate) {
    let clockIn = emply.timeInEvents.find(function(e) {
       return e.date === needDate
    })

    let clockOut = emply.timeOutEvents.find(function(e){
       return e.date === needDate
    })
    return (clockOut.hour - clockIn.hour) / 100
}

let wagesEarnedOnDate = function(emply, needDate) {
    let gross = hoursWorkedOnDate(emply, needDate) 
     * emply.payPerHour

     return gross
}

let allWagesFor = function(emply) {
    let useDates = emply.timeOutEvents.map(function(e) {
        return e.date
    })

    let payUp = useDates.reduce(function(pay, date){
        return pay + wagesEarnedOnDate(emply, date)}, 0)
    
        return payUp
}

let calculatePayroll = function(records) {
    return records.reduce(function(memo, rec){
        return memo + allWagesFor(rec)},0)
    
}

let findEmployeeByFirstName = function(srcArray, firstName) {
   return srcArray.find(function(name){
       return  name.firstName === firstName
    })

}