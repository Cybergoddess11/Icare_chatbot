// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT1ZaAtFS85oKA3RGbdnGnOrWradGpXS0",
  authDomain: "icare-mental-wellness-bot.firebaseapp.com",
  projectId: "icare-mental-wellness-bot",
  storageBucket: "icare-mental-wellness-bot.appspot.com",
  messagingSenderId: "1087754401209",
  appId: "1:1087754401209:web:93ee57afb07d496036f268",
  measurementId: "G-9GS28KMMXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Create a new instance of the Google provider
const provider = new GoogleAuthProvider();

// --- Button Logic ---

const signInBtn = document.getElementById('signInBtn');
const guestBtn = document.getElementById('guestBtn');

// Add a "click" event listener to the Sign In button
signInBtn.addEventListener('click', () => {
    // Start the sign-in process
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            
            // Log the user's name to the console and show a welcome message
            console.log("Signed in user:", user.displayName);
            alert("Welcome, " + user.displayName + "!");

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Sign in error:", errorCode, errorMessage);
            alert("Error signing in: " + errorMessage);
        });
});

// Add a "click" event listener to the Guest button
guestBtn.addEventListener('click', () => {
    console.log("Use Bot as Guest button was clicked!");
    alert("Redirecting to the bot page...");
    // For example: window.location.href = 'bot.html';
});
