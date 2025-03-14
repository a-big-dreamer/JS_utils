class EventBus {
    constructor() {
        this.listeners = new Map()
        this.wildcards = new Set()
        this.batchHandlers = new WeakMap()
    }

    on(events, handler) {
        if (typeof events === 'string') events = [events]
        events.forEach(event => this._registerEvent(event, handler))
    }

    ons(events, handler) {
        const wrapper = (...args) => handler(...args)
        this.batchHandlers.set(handler, wrapper)
        events.forEach(event => this._registerEvent(event, wrapper))
    }

    // 触发事件
    emit(event, ...args) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(handler => handler(...args))
        }

        this.wildcards.forEach(({ pattern, handler }) => {
            if (pattern.test(event)) handler(...args)
        })
    }


    off(event, handler) {
        const handlers = this.listeners.get(event)
        if (!handlers) return
        handlers.forEach(_handler => {
            if (_handler === handler) {
                handlers.delete(handler)
                return
            }
        })
    }

    offs(events, handler) {
        const wrapper = this.batchHandlers.get(handler)
        if (!wrapper) return

        events.forEach(event => {
            const handlers = this.listeners.get(event)
            if (handlers) handlers.delete(wrapper)
        })
        this.batchHandlers.delete(handler)
    }

    _registerEvent(event, handler) {
        if (event.includes('*')) {
            this.wildcards.add({
                pattern: event.includes('.') ? new RegExp(`^${event.replace(/\.\*/g, '\\..*')}$`) : new RegExp(`^${event.replace(/\*/g, '.*')}$`),
                handler
            })
        } else {
            if (!this.listeners.has(event)) this.listeners.set(event, new Set())
            this.listeners.get(event).add(handler)
        }
    }
}

export default new EventBus()