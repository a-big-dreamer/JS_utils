export default function compose(...fns) {
    var length = fns.length
    if (length === 0) return

    fns.forEach((item, index) => {
        if (typeof item !== 'function') {
            throw new TypeError(`The ${index} arguments is not a function`)
        }
    })

    return function (...args) {
        var result = fns[0].apply(this, args)
        var index = 0
        while (++index < length) {
            result = fns[index].call(this, result)
        }
        return result
    }
}