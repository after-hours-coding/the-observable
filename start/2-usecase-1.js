class Publisher {
  constructor(initialState) {
    this.state = initialState;
    this.subscribers = new Set();
  }

  publish(state) {
    this.state = state;
    this.subscribers.forEach( subscriber => subscriber.update(state));
  }

  subscribe(subscriber) {
    subscriber.update(this.state);
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber) {
    this.subscribers.delete(subscriber);
  }
}

