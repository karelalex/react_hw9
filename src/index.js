import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Обычные и колбэк рефы
class SimpleRef extends React.PureComponent{
    inputRef = React.createRef()
    pElement = null
    setPElement = el => this.pElement = el
    componentDidMount() {
        this.inputRef.current.value = 'Всё заработало'
        this.pElement.innerText = 'И тут работает'
    }

    render() {
        return (
            <div>
                <input ref={this.inputRef} />
                <p ref={this.setPElement} />
            </div>
        )
    }
}

// проброс колбэк рефа в дочерний компонент и обманка с другим именем пропса
class ChildRef extends React.PureComponent{
    inputElement = null
    setInputElement = el => this.inputElement = el
    secondInputRef = React.createRef()
    componentDidMount() {
        this.inputElement.value = 'Я смог вставить текст в дочернем элементе'
        this.secondInputRef.current.value = 'И тут всех обманул'
    }
    render() {
        return(
            <div>
                <p>Вставляем потомку</p>
                <ChildInput refProp={this.setInputElement} /><br />
                <ChildInput refProp={this.secondInputRef} />
            </div>
        )
    }
}

const ChildInput = ({refProp}) => <input ref={refProp} />

const ForwardedInput = React.forwardRef((props, ref) => (
    <div>
        <p>Лучший инпут в городе</p>
        <input ref={ref}/>
    </div>

))

// Использование форвард реф.
const ForwardRef = () => {
    const ref = useRef()
    const clickHandler = () => {
        ref.current.value = 'меня кликнули'
        ref.current.focus()
    }
    return (
        <div>
            <ForwardedInput ref={ref} />
            <button onClick={clickHandler}>Жми</button>
        </div>
    )
}



function App() {
    return (
        <div className="App">
            <SimpleRef />
            <ChildRef />
            <ForwardRef />
        </div>
    );
}


ReactDOM.render(
    <React.StrictMode>
            <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
