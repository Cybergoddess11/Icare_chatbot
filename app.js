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
    const [isGuest, setIsGuest] = useState(false);
    const [loading, setLoading] = useState(true);

    // This is the new, more reliable way to check for a logged-in user.
    // This listener runs when the app first loads, and any time the user signs in or out.
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // If Firebase finds a user, we set them in our state.
                setUser(user);
            } else {
                // If not, we make sure the user state is empty.
                setUser(null);
            }
            // We're done checking, so we can stop loading.
            setLoading(false);
        });

        // This cleans up the listener when the component is no longer needed.
        return () => unsubscribe();
    }, []);

    const handleSignIn = () => {
        auth.signInWithRedirect(provider);
    };

    const handleSignOut = () => {
        auth.signOut().then(() => {
            setIsGuest(false);
        });
    };
    
    const handleGuestSignIn = () => {
        setIsGuest(true);
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (user || isGuest) {
        const welcomeName = user ? user.displayName : "Guest";
        
        return (
            <div>
                <h1>Welcome to the iCare Bot, {welcomeName}!</h1>
                <p>This is where your chatbot will go.</p>
                <button onClick={handleSignOut}>Exit</button>
            </div>
        );
    } else {
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
