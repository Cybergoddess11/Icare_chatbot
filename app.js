// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
// We don't need analytics for this part, but you can add it back later if you want.
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT1ZaAtFS85oKA3RGbdnGnOrWradGpXS0",
  authDomain: "icare-mental-wellness-bot.firebaseapp.com",
  projectId: "icare-mental-wellness-bot",
  storageBucket: "icare-mental-wellness-bot.appspot.com", // Corrected this line for you
  messagingSenderId: "1087754401209",
  appId: "1:1087754401209:web:93ee57afb07d496036f268",
  measurementId: "G-9GS28KMMXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// const analytics = getAnalytics(app);

// --- Button Logic ---

// Get the buttons from your HTML file
const signInBtn = document.getElementById('signInBtn');
const guestBtn = document.getElementById('guestBtn');

// Add a "click" event listener to the Sign In button
signInBtn.addEventListener('click', () => {
    console.log("Sign In button was clicked!");
    alert("Sign In functionality will be added here.");
    // Later, we will add code here to sign in the user with Google, for example.
});

// Add a "click" event listener to the Guest button
guestBtn.addEventListener('click', () => {
    console.log("Use Bot as Guest button was clicked!");
    alert("Redirecting to the bot page...");
    // This will eventually take the user to your chatbot page.
    // For example: window.location.href = 'bot.html';
});
