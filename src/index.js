import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button, makeStyles, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const schema = yup.object().shape({
    userName: yup.string()
        .required('Поле обязательно для заполнения'),
    password: yup.string()
        .required('Поле обязательно для заполнения')
        .min(5, 'Должно быть минимум 5 символов'),
    email: yup.string()
        .required('Поле обязательно для заполнения')
        .email('Поле должно быть корректным адресом электронной почты')

})

const Form = () => {
    const classes = useStyles();
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)

    })
    const onSubmit = data => console.log(data)
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                id="name"
                label="Имя" {...register('userName')}
                helperText={errors.userName?.message}
                error={errors.userName}
            />
            <TextField
                id="email"
                label="Электронная почта" {...register('email')}
                helperText={errors.email?.message}
                error={errors.email}
            />
            <TextField
                id="pass"
                label="Пароль"
                type="password" {...register('password')}
                helperText={errors.password?.message} error={errors.password}
            />
            <Button variant="contained" color="primary" type="submit">
                Отправить
            </Button>
        </form>
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
