// This line imports the 'useState' hook from React, which is our app's "memory"
const { useState } = React;

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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// --- This is our main React Component ---
function App() {
    // Here we create our state. 'user' will hold the user's info, or 'null' if they're logged out.
    const [user, setUser] = useState(null);

    const handleSignIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                // Instead of just an alert, we now save the user to our state!
                setUser(result.user);
            })
            .catch((error) => console.error("Sign in error:", error));
    };

    const handleSignOut = () => {
        auth.signOut().then(() => {
            // When the user signs out, we clear the user from our state.
            setUser(null);
        });
    };

    // This is the new logic: check if 'user' exists in our state.
    if (user) {
        // IF the user is logged in, show this chatbot screen:
        return (
            <div>
                <h1>Welcome to the iCare Bot, {user.displayName}!</h1>
                <p>This is where your chatbot will go.</p>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        );
    } else {
        // ELSE, if the user is logged out, show this login screen:
        return (
            <div>
                <h1>Welcome to iCare</h1>
                <p>Sign in to continue.</p>
                <button onClick={handleSignIn}>Sign In with Google</button>
            </div>
        );
    }
}

// --- This tells React to render our App component ---
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
