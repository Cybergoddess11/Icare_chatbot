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

function App() {
    const [user, setUser] = useState(null);
    const [isGuest, setIsGuest] = useState(false); // New state for guest mode!
    const [loading, setLoading] = useState(true);

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
    }, []);

    const handleSignIn = () => {
        auth.signInWithRedirect(provider);
    };

    const handleSignOut = () => {
        auth.signOut().then(() => {
            setUser(null);
            setIsGuest(false); // Also exit guest mode on sign out
        });
    };
    
    // This function sets guest mode to true
    const handleGuestSignIn = () => {
        setIsGuest(true);
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    // New Logic: If the user is signed in OR they are a guest, show the chatbot.
    if (user || isGuest) {
        // We check if the user exists to personalize the welcome message.
        const welcomeName = user ? user.displayName : "Guest";
        
        return (
            <div>
                <h1>Welcome to the iCare Bot, {welcomeName}!</h1>
                <p>This is where your chatbot will go.</p>
                <button onClick={handleSignOut}>Exit</button>
            </div>
        );
    } else {
        // If they are not logged in and not a guest, show the login screen.
        return (
            <div>
                <h1>Welcome to iCare</h1>
                <p>Sign in or continue as a guest.</p>
                <button onClick={handleSignIn}>Sign In with Google</button>
                <button onClick={handleGuestSignIn}>Sign In as Guest</button>
            </div>
        );
    }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
