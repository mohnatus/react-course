import React, { Component } from 'react';
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
 
class Quiz extends Component {
    state = {
        quiz: [
            {
                answers: [
                    {
                        text: 'Ответ 1',
                    },
                    {
                        text: 'Ответ 2'
                    },
                    {
                        text: 'Ответ 3'
                    },
                    {
                        text: 'Ответ 4'
                    }
                ]
            }
        ]
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz 
                        answers={this.state.quiz[0].answers} />
                </div>
            </div>
        );
    }

}

export default Quiz;