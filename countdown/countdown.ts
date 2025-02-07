type TimeType = 'string' | {
    year?: number,
    month?: number,
    day?: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number
}

let endTime: Date | null = null
function createEndTime(time: TimeType) {
    if (typeof time === 'string') {
        endTime = new Date(time)
    } else if (typeof time === 'object') {
        endTime = new Date()
        const { year, month, day, hour,
            minute, second, millisecond, } = time
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
    const startTime = new Date()

    if (startTime > endTime!) {
        throw new Error('endTime must be greater than startTime')
    }

    const spaceTime = Math.floor((endTime?.getTime()! - startTime.getTime()) / 1000)

    const _hour = Math.floor(spaceTime / (60 * 60))
    const _minute = Math.floor(spaceTime / 60 % 60)
    const _second = spaceTime % 60

    return {
        hour: String(_hour).padStart(2, '0'),
        minute: String(_minute).padStart(2, '0'),
        second: String(_second).padStart(2, '0')
    }
}


export default function countdown(time: TimeType, callback: (hour: string, minute: string, second: string) => {}) {
    createEndTime(time)
    const timer = setInterval(function () {
        try {
            const { hour, minute, second } = formatCountdown()
            callback(hour, minute, second)
        }
        catch (error) {
            clearInterval(timer)
            throw error
        }
    }, 1000)
}
