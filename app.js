// This line imports the 'useState' and 'useEffect' hooks from React
const { useState, useEffect } = React;

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
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // This hook runs once when the component first loads to check for a redirect result
    useEffect(() => {
        auth.getRedirectResult()
            .then((result) => {
                if (result.user) {
                    setUser(result.user);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Redirect result error:", error);
                setLoading(false);
            });
    }, []); // The empty array ensures this runs only once on page load

    const handleSignIn = () => {
        // We now use a redirect instead of a pop-up
        auth.signInWithRedirect(provider);
    };

    const handleSignOut = () => {
        auth.signOut().then(() => {
            setUser(null);
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return (
            <div>
                <h1>Welcome to the iCare Bot, {user.displayName}!</h1>
                <p>This is where your chatbot will go.</p>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        );
    } else {
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
