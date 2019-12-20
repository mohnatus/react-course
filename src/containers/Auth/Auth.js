import React, { Component } from 'react';
import classes from "./Auth.module.css";

import Button from "../../components/UI/Button/Button"
import Input from "../../components/UI/Input/Input"

export default class Auth extends Component {
    loginHandler = () => {

    }

    registerHandler = () => {

    }

    submitHandler = event => {
        event.preventDefault();
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit={this.submitHandler}
                        className={classes.AuthForm}>
                        <Input
                            errorMessage={'TEST'}
                            label="Email"
                        />
                        
                        <Input
                          
                            label="Пароль"
                        />

                        <Button
                            onClick={this.loginHandler}
                            type="success"
                        >Войти</Button>
                        <Button
                            onClick={this.registerHandler}
                            type="primary"
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
