class Store {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  dispatch(state) {
    this.state = Object.assign(this.state, state);
    this.listeners.forEach( listener => listener(this.state));
  }

  subscribe(listenerFn) {
    this.listeners.add(listenerFn);
    return () => this.listeners.delete(listenerFn);
  }
}

