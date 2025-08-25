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

// --- Chatbot Component ---
function Chatbot() {
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hello! How are you feeling today?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() === "") return;

        const userMessage = { from: "user", text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");

        setTimeout(() => {
            const botMessage = { from: "bot", text: "Thank you for sharing. Can you tell me more?" };
            setMessages([...newMessages, botMessage]);
        }, 1000);
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.from}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

// --- Main App Component ---
function App() {
    const [user, setUser] = useState(null);
    const [isGuest, setIsGuest] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleSignIn = () => { auth.signInWithRedirect(provider); };
    const handleSignOut = () => { auth.signOut().then(() => setIsGuest(false)); };
    const handleGuestSignIn = () => { setIsGuest(true); };

    if (loading) {
        return <div id="root"><h1>Loading...</h1></div>;
    }

    if (user || isGuest) {
        return <Chatbot />;
    } else {
        return (
            <div id="root">
                <h1>Welcome to iCare</h1>
                <p>Sign in or continue as a guest.</p>
                <button onClick={handleSignIn}>Sign In with Google</button>
                <button onClick={handleGuestSignIn}>Sign In as Guest</button>
            </div>
        );
    }
}

// --- Render the App ---
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
