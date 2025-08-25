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
const provider = new GoogleAuthProvider();

// --- This is our main React Component ---
function App() {

    // This function will be called when the Sign In button is clicked
    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("Signed in user:", user.displayName);
                alert("Welcome, " + user.displayName + "!");
            })
            .catch((error) => {
                console.error("Sign in error:", error);
                alert("Error signing in: " + error.message);
            });
    };

    // This function will be called when the Guest button is clicked
    const handleGuest = () => {
        console.log("Use Bot as Guest button was clicked!");
        alert("The chatbot will go here!");
    };

    // This is the HTML that our component will display on the screen
    return (
        <div>
            <h1>Welcome to iCare</h1>
            <p>Sign in or continue as a guest.</p>
            <button onClick={handleSignIn}>Sign In with Google</button>
            <button onClick={handleGuest}>Use Bot as Guest</button>
        </div>
    );
}

// --- This tells React to render our App component in the 'root' div ---
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
