import React, { Component } from 'react';
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
 
class Quiz extends Component {
    state = {
        quiz: [
            {
                question: 'Кто твой любимый персонаж в Хвосте Феи?',
                answers: [
                    {
                        text: 'Хэппи',
                        id: 1
                    },
                    {
                        text: 'Эльза',
                        id: 2
                    },
                    {
                        text: 'Нацу',
                        id: 3
                    },
                    {
                        text: 'Грей',
                        id: 4
                    },
                    {
                        text: 'Люси',
                        id: 5
                    }
                ],
                correctAnswerId: 1
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log('answer', answerId)
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz 
                        question={this.state.quiz[0].question}
                        answers={this.state.quiz[0].answers}
                        onAnswerClick={this.onAnswerClickHandler} />
                </div>
            </div>
        );
    }

}

export default Quiz;