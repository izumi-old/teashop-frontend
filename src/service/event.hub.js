class EventHub {
    constructor() {
        this.listeners = new Map();
    }

    subscribe(key, listener) {
        let subscribed;
        if (!this.listeners.has(key)) {
            subscribed = [];
            this.listeners.set(key, subscribed);
        } else {
            subscribed = this.listeners.get(key);
        }

        subscribed.push(listener);
    }

    fire(key) {
        if (!this.listeners.has(key)) {
            return;
        }

        let subscribed = this.listeners.get(key);
        for (let i = 0; i < subscribed.length; i++) {
            let callable = subscribed[i];
            callable();
        }
    }
}

export default EventHub