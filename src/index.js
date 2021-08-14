import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Button, makeStyles, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import moment from 'moment'
import axios from "axios";

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
    const {register, handleSubmit, formState: {errors, isSubmitSuccessful}, watch, setValue} = useForm()
    const onSubmit = data => {
        console.log(data)
        axios.post('https://jsonplaceholder.typicode.com/posts', data)
            .then(resp => {
                console.log(resp.data)
            })
    }
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

            <TextField
                id="surname"
                label="Фамилия" {...register('surname', {
                    required: 'Поле обязательно для заполнения',
                maxLength: {
                    value: 50,
                    message: 'Длина значения не должка превышать 50 символов'
                }
                })}
                helperText={errors.surname?.message}
                error={!!errors.surname}
                disabled={isSubmitSuccessful}
            />
            <TextField
                id="name"
                label="Имя" {...register('name', {
                required: 'Поле обязательно для заполнения',
                maxLength: {
                    value: 31,
                    message: 'Длина значения не должка превышать 31 символа'
                }
            })}
                helperText={errors.name?.message}
                error={!!errors.name}
                disabled={isSubmitSuccessful}
            />
            <TextField
                id="patronymic"
                label="Отчество" {...register('patronymic', {
                required: 'Поле обязательно для заполнения',
                maxLength: {
                    value: 31,
                    message: 'Длина значения не должка превышать 31 символа'
                }
            })}
                helperText={errors.patronymic?.message}
                error={!!errors.patronymic}
                disabled={isSubmitSuccessful}
            />

            {isSubmitSuccessful ? (
                <TextField
                    id="birthdayDisabled"
                    key="birthdayDisabled"
                    label="Дата рождения"
                    disabled={true}
                    value={watch('birthday')}
                />
            ) : (<TextField
                key="birthday"
                id="birthday"
                label="Дата рождения" {...register('birthday', {
                setValueAs: value => moment(value, 'YYYY-MM-DD').format('DD.MM.YYYY'),
                required: 'Поле обязательно для заполнения',
                pattern: {
                    value: /^[0123]\d\.[01]\d\.(?:19|20)\d{2}$/,
                    message: 'Допустимый формат ДД.MM.ГГГГ'
                },

            })}
                onChange={
                    (e) => setValue('birthday', e.target.value)
                }
                helperText={errors.birthday?.message}
                error={!!errors.birthday}
                type= "date"
                InputLabelProps={{
                    shrink: true,
                }}
            />) }

            <TextField
                id="phone"
                label="Телефон" {...register('phone', {
                required: 'Поле обязательно для заполнения',
                pattern: {
                    value:  /^\+\d\(\d{3}\) \d{3} \d{2} \d{2}$/,
                    message: 'Допустимый формат +7(NNN) NNN NN NN'
                },

            })}
                helperText={errors.phone?.message}
                error={!!errors.phone}
                placeholder= "+7(NNN) NNN NN NN"
                disabled={isSubmitSuccessful}
            />

            <TextField
                id="email"
                label="Электронная почта" {...register('email', {
                pattern: {
                    value:  /^[a-z.]+@[a-z]+\.[a-z]{2,}$/,
                    message: 'Недопустимый адрес электоронной почты'
                },

            })}
                helperText={errors.email?.message}
                error={!!errors.email}
                disabled={isSubmitSuccessful}
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
