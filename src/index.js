import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const LoggerHOC = (Comp) => {
    class Logger extends React.PureComponent {

        componentDidMount() {
            console.log("Текущие пропсы", this.props)
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            console.log("Прошлые пропсы", prevProps)
            console.log("Текущие пропсы", this.props)
        }

        render() {
            return <Comp {...this.props} ref={this.props.forwarderRef}/>
        }
    }

    return React.forwardRef((props, ref) => <Logger {...props} forwarderRef={ref}/>)

}

const ForwardedInput = React.forwardRef((props, ref) => (
    <div>
        <p>Лучший инпут в городе</p>
        <input ref={ref} value={props.value} onChange={event => {props.input(event.target.value)}} />
    </div>

))

const MegaForwardedInput = LoggerHOC(ForwardedInput)

const ForwardRef = () => {
    const ref = useRef()
    const clickHandler = () => {
        ref.current.value = 'меня кликнули'
        ref.current.focus()
    }
    const [inputValue, setInputValue] = useState('привет')
    return (
        <div>
            <MegaForwardedInput ref={ref} value={inputValue} input={setInputValue}/>
            <button onClick={clickHandler}>Жми</button>
        </div>
    )
}


function App() {
    return (
        <div className="App">
            <ForwardRef/>
        </div>
    );
}


ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
