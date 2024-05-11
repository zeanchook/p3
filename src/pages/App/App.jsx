import debug from "debug"; 

const log = debug("mern:pages:App:App");
localStorage.debug = "mern:*";

function App() {
    log("inside App");
    return <main className="App">App</main>;
}

export default App
