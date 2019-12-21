import React, { Component } from 'react'
import classes from "./QuizList.module.css";
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader"
export default class QuizList extends Component {
    state = {
        quizes: [],
        loaded: false
    }

    renderQuizes() {
        return this.state.quizes.map((quiz, index) => {
            return (
                <li key={index}>
                    <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get('/quizes.json');
            const quizes = Object.keys(response.data).map((key, index) => {
                return { id: key, name: `Тест #${index}` }
            });
            this.setState({
                quizes,
                loaded: true
            });
        } catch(e) {
            console.error(e);
        }
        
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    { 
                        this.state.loaded 
                            ?   <ul>
                                    { this.renderQuizes() }
                                </ul>
                            :   <Loader />
                    }
                </div>
            </div>
        )
    }
}
