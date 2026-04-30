export class MockEmitter {
    constructor(events, callback) {
        this.events = events;
        this.callback = callback;
    }

    start() {
        this.events.forEach((event, i) => {
            setTimeout(() => {
                this.callback(event);
            }, i * 800);
        });
    }
}