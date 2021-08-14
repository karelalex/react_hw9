import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Form extends React.PureComponent{
    state = {
        simpleInput: 'инпут',
        textArea: 'Ария',
        selector: 3,
        multiSelector: [2,4],
        checker: false,
        radio: 'два'
    }

    ref = React.createRef()

    changeHandler = (e) => {
        const {name, value, type, selectedOptions, checked} = e.target
        if (type === 'select-multiple') {
            const newValues = Array.from(selectedOptions,option => option.value)
            this.setState({
                [name]: newValues
            })
            return
        }

        if (type === 'checkbox') {
           this.setState({
               [name]: checked
           })
            return;
        }

        this.setState({
            [name]: value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.ref.current.value)
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div>
                    <h5>
                        простой инпут
                    </h5>
                    <p>
                        <input name="simpleInput" value={this.state.simpleInput} onChange={this.changeHandler} />
                    </p>
                </div>
                <div>
                    <h5>
                        Текстовая ария
                    </h5>
                    <p>
                        <textarea name="textArea" value={this.state.textArea} onChange={this.changeHandler} />
                    </p>
                </div>
                <div>
                    <h5>
                        Селект без мультивыбора
                    </h5>
                    <p>
                        <select name="selector" value={this.state.selector} onChange={this.changeHandler} >
                            <option value={1}>Один</option>
                            <option value={2}>Два</option>
                            <option value={3}>Три</option>
                            <option value={4}>Четыре</option>
                            <option value={5}>Пять</option>
                        </select>
                    </p>
                </div>
                <div>
                    <h5>
                        Селект c мультивыбором
                    </h5>
                    <p>
                        <select multiple name="multiSelector" value={this.state.multiSelector} onChange={this.changeHandler} >
                            <option value={1}>Один</option>
                            <option value={2}>Два</option>
                            <option value={3}>Три</option>
                            <option value={4}>Четыре</option>
                            <option value={5}>Пять</option>
                        </select>
                    </p>
                </div>
                <h5>
                    Чекбокс
                </h5>
                <p>
                    <input type="checkbox" name="checker" checked={this.state.checker} onChange={this.changeHandler} />
                </p>
                <h5>
                    Радиокнопка
                </h5>
                <p>
                    Один <input type="radio" name="radio" checked={this.state.radio === 'один'} value="один" onChange={this.changeHandler} /> <br />
                    Два <input type="radio" name="radio" checked={this.state.radio === 'два'} value="два" onChange={this.changeHandler} /> <br />
                    Три <input type="radio" name="radio" checked={this.state.radio === 'три'} value="три" onChange={this.changeHandler} /> <br />
                </p>
                <div>
                    <h5>
                        Неконтролируемый инпут
                    </h5>
                    <p>
                        <input name="uncontrolledInput" ref={this.ref} />
                    </p>
                    <p>
                        <button type="submit">Послать</button>
                    </p>
                </div>
            </form>
        )
    }
}

function App() {
    return (
        <div className="App">
            <Form />
        </div>
    );
}


ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
