import React, { Component } from 'react';
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
 
class Quiz extends Component {
    state = {
        activeQuestion: 0,
        quiz: [
            {
                question: 'Кто твой любимый персонаж в Хвосте Феи?',
                id: 1,
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
            },
            {
                question: 'Кто твой любимый персонаж в Бличе?',
                id: 2,
                answers: [
                    {
                        text: 'Ичиго',
                        id: 1
                    },
                    {
                        text: 'Орихиме',
                        id: 2
                    },
                    {
                        text: 'Кон',
                        id: 3
                    },
                    {
                        text: 'Бьякуя',
                        id: 4
                    },
                    {
                        text: 'Кенпачи',
                        id: 5
                    }
                ],
                correctAnswerId: 5
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log('answer', answerId)

        this.setState({
            activeQuestion: this.state.activeQuestion + 1
        })
    }

    render() {
        const activeQuestion = this.state.quiz[this.state.activeQuestion];
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz 
                        quizLength={this.state.quiz.length}
                        answerIndex={this.state.activeQuestion + 1}
                        question={activeQuestion.question}
                        answers={activeQuestion.answers}
                        onAnswerClick={this.onAnswerClickHandler} />
                </div>
            </div>
        );
    }

}

export default Quiz;