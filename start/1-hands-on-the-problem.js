class Publisher {
  constructor() {
    this.subscribers = new Set();
  }

  publish(state) {
    this.subscribers.forEach( subscriber => subscriber.update(state));
  }

  subscribe(subscriber) {
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber) {
    this.subscribers.delete(subscriber);
  }
}

class StatefulPublisher extends Publisher{
  constructor(initialState) {
    super();
    this.state = initialState;
  }

  publish(state) {
    this.state = state;
    super.publish(state);
  }

  subscribe(subscriber) {
    subscriber.update(this.state)
    super.subscribe(subscriber);
  }
}

class Auth extends StatefulPublisher {
  constructor() {
    super(null);
    this.currentUser = null;
  }

  signIn() {
    this.currentUser = {name: "Nir"};
    this.publish(this.currentUser);
  }

  signOut() {
    this.currentUser = null;
    this.publish(this.currentUser);
  }
}

class ToastMessage {
  update(user) {
    if(user) {
      this.showToast(user.name)
    }

  }

  showToast(message) {
    console.log('Display toast message: ' + message);
  }
}
class PermissionManager {
  update(user) {
    if(user) {
      this.getPermissionsForUser(user);
    }
  }
  getPermissionsForUser(user) {
    console.log('Fetching permissions for: ' + user.name);
  }
}
class Router {
  update(user) {
    this.redirectTo(user ? 'dashboard' : 'login')
  }
  redirectTo(routeName) {
    console.log('Redirecting to' + routeName);
  }
}

// runtime
const auth = new Auth();

const toast = new ToastMessage();
const permissionManager = new PermissionManager();
const router = new Router();

// subscribe

auth.subscribe(permissionManager);
auth.subscribe(router);

auth.signIn();

auth.subscribe(toast);



