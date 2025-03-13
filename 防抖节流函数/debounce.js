function debounce(fn, delay, immediate = true) {
    let timer = null
    let isInvoke = false
    function _debounce(...args) {

        return new Promise((resolve, reject) => {
            try {
                if (timer) clearTimeout(timer)

                if (!isInvoke && immediate) {
                    const result = fn.apply(this, args)
                    resolve(result)
                    isInvoke = true
                    return
                }

                timer = setTimeout(() => {
                    const result = fn.apply(this, args)
                    resolve(result)
                    isInvoke = false
                    timer = null
                }, delay)
            } catch (error) {
                reject(error)
            }
        })
    }
    _debounce.cancel = function () {
        if (timer) clearTimeout(timer)
        timer = null
    }
    return _debounce
}

export default debounce