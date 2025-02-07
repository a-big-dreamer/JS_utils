var endTime = null
function createEndTime(time) {
    if (typeof time === 'string') {
        endTime = new Date(time)
    } else if (typeof time === 'object') {
        endTime = new Date()
        var year = time.year
        var month = time.month
        var day = time.day
        var hour = time.hour
        var minute = time.minute
        var second = time.second
        var millisecond = time.millisecond
        year && endTime.setFullYear(year)
        month && endTime.setMonth(month - 1)
        day && endTime.setDate(day)
        typeof hour === 'number' && endTime.setHours(hour)
        typeof minute === 'number' && endTime.setMinutes(minute)
        typeof second === 'number' && endTime.setSeconds(second)
        typeof millisecond === 'number' && endTime.setMilliseconds(millisecond)
    } else {
        throw new Error('time must be string or object')
    }
}


function formatCountdown() {
    var startTime = new Date()

    if (startTime > endTime) {
        throw new Error('endTime must be greater than startTime')
    }

    var spaceTime = Math.floor((endTime - startTime) / 1000)

    var _hour = Math.floor(spaceTime / (60 * 60))
    var _minute = Math.floor(spaceTime / 60 % 60)
    var _second = spaceTime % 60

    return {
        hour: String(_hour).padStart(2, '0'),
        minute: String(_minute).padStart(2, '0'),
        second: String(_second).padStart(2, '0')
    }
}


export default function countdown(time, callback) {
    createEndTime(time)
    var timer = setInterval(function () {
        try {
            var formatTime = formatCountdown()
            callback(formatTime.hour, formatTime.minute, formatTime.second)
        }
        catch (error) {
            clearInterval(timer)
            throw error
        }
    }, 1000)
}
