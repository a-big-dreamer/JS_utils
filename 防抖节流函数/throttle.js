function throttle(fn, interval, { leading = false, trailing = true } = {}) {
    let startTime = 0
    let timer = null
    function _throttle(...args) {
        return new Promise((resolve, reject) => {
            try {
                let nowTime = Date.now()
                if (!leading && startTime === 0) {
                    startTime = nowTime
                }
                let waitTime = interval - (nowTime - startTime)
                if (waitTime <= 0) {
                    if (timer) clearTimeout(timer)
                    const result = fn.apply(this, args)
                    resolve(result)
                    startTime = nowTime
                    timer = null
                    return
                }

                if (trailing && !timer) {
                    timer = setTimeout(() => {
                        const result = fn.apply(this, args)
                        resolve(result)
                        startTime = Date.now()
                        timer = null
                    }, waitTime)
                }

            } catch (error) {
                reject(error)
            }
        })


    }
    _throttle.cancel = function () {
        if (timer) clearTimeout(timer)
        startTime = 0
        timer = null
    }

    return _throttle
}

export default throttle