import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const mega = {
    ping: () => alert("Привет")
}

const MegaContext = React.createContext(null)

const Provider = ({value, children}) => (
    <MegaContext.Provider value={value}>
        {children}
    </MegaContext.Provider>
)
const Sega = ({mega}) => (
    <button onClick={mega.ping}>Жмакни меня</button>
)

const Giper = () => (
    <div>
        <h1>Я гипер</h1>
        <MegaContext.Consumer>
            {(mega) => (<Sega mega={mega}/>)}
        </MegaContext.Consumer>

    </div>
)

function App() {
    return (
        <div className="App">
            <Giper />
        </div>
    );
}


ReactDOM.render(
    <React.StrictMode>
        <Provider value={mega}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
