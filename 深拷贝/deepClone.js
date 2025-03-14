function isObject(value) {
    const valueType = typeof value
    return (value !== null) && (valueType === 'object' || valueType === 'function')
}

function deepClone(target, map = new WeakMap()) {

    if (typeof target === 'symbol') {
        return Symbol(target.description)
    }

    if (!isObject(target)) {
        return target
    }

    if (typeof target === 'function') {
        return target
    }

    if (target instanceof Set) {
        const set = new Set()
        for (let item of target) {
            set.add(item)
        }
        return set
    }

    if (map.has(target)) {
        return map.get(target)
    }

    const obj = Array.isArray(target) ? [] : {}
    map.set(target, obj)


    for (let key in target) {
        obj[key] = deepClone(target[key], map)
    }

    for (let key of Object.getOwnPropertySymbols(target)) {
        obj[Symbol(key.description)] = deepClone(target[key], map)
    }
    return obj
}

export default deepClone