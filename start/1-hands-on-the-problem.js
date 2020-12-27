// Holds a state (currentUser), end expose
// methods to alter it
class Auth {
  constructor() {
    this.currentUser = null;
  }

  signIn() {
    this.currentUser = {name: "Nir"};
  }

  signOut() {
    this.currentUser = null;
  }
}

// Represents a UI component that shows a message
// TODO: When a use logged in - show a message with the user name
class ToastMessage {
  showToast(message) {
    console.log('Display toast message: ' + message);
  }
}

// Represents a Service that knows how to fetch permissions
// for a provided User
// TODO: When a use logged in - fetch a permissions
class PermissionManager {
  getPermissionsForUser(user) {
    console.log('Fetching permissions for: ' + user.name);
  }
}

// Responsible for routing and redirects
// TODO: When a use logged in - route to dashboard
// TODO: When a use logged out - route to back to login screen
class Router {
  redirectTo(routeName) {
    console.log('Redirecting to' + routeName);
  }
}
