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

    useEffect(() => {
        console.log("Setting up auth listener..."); // Debug message 1
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log("Auth state changed. User object:", user); // Debug message 2
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
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

    console.log("Component is rendering. Current user state:", user); // Debug message 3
    console.log("Component is rendering. Current guest state:", isGuest); // Debug message 4

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
