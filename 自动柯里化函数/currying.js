export default function gCurrying(fn) {
    function currying(...args1) {
        if (args1.length >= fn.length) {
            return fn.apply(this, args1)
        } else {
            return function (...args2) {
                return currying.apply(this, [...args1, ...args2])
            }
        }
    }
    return currying
}