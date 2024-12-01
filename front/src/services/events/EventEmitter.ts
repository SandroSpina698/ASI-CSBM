export class EventEmitter {
    events: any;

    constructor() {
        this.events = {}
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(listener);
    }

    emit(event, payload) {
        console.log(this.events);
        const listeners = this.events[event];
        if (listeners) {
            listeners.forEach(listener => listener(payload));
        }
    }
}