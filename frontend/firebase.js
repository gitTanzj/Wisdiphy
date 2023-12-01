import * as firebase from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyDAfcC-rpoeLp_txcMEvjKes2qpuJxKIzs",

    authDomain: "wisdiphy-d0262.firebaseapp.com",

    projectId: "wisdiphy-d0262",

    storageBucket: "wisdiphy-d0262.appspot.com",

    messagingSenderId: "384442686133",

    appId: "1:384442686133:web:081d09b2ad3d95a33d7cfc",

    measurementId: "G-NZMYJ7WW5W"

}

let app
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

const analytics = getAnalytics(app);

export { auth }