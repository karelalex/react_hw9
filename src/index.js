import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button, makeStyles, TextField} from "@material-ui/core";
import axios from "axios";

const API_KEY = 'a11070a4af37df186a9157cc0dbb3a72'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const Form = () => {
    const classes = useStyles();
    const [message, setMessage] = useState('')
    const onSubmit = async (e) => {
        e.preventDefault()
        const cityName = e.target.elements.city.value
        if (cityName) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
            try {
                const result = await axios.get(url).then(response => response.data)
                setMessage(`В городе ${cityName} прям ща температура ${result.main.temp}`)
            }
            catch (e) {
                setMessage('Ошибка запроса')
            }

        }
    }
    return (
        <>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextField
                    id="city"
                    name="city"
                    label="Город"
                />

                <Button variant="contained" color="primary" type="submit">
                    Отправить
                </Button>
            </form>
            <div>{message}</div>
        </>

    );
}


function App() {
    return (
        <div className="App">
            <Form/>
        </div>
    );
}


ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
