import firebase from 'firebase/app';
import 'firebase/auth';

class AuthService {
  // Existing methods...

  // Method to listen for authentication state changes
  onAuthStateChanged(callback) {
    return firebase.auth().onAuthStateChanged(callback);
  }
}

export default new AuthService();