import React, { Component } from 'react';
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import Finished from "../../components/FInished/Finished";
 
class Quiz extends Component {
    state = {
        results: {}, // { [id]: 'success' 'error' }
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' 'error' }
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

    componentDidMount() {
        console.log('Quiz ID = ', this.props.match.params.id);
        
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (answerId === question.correctAnswerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }
            
            this.setState({
                results,
                answerState: {
                    [answerId]: 'success'
                }
            });

            let timeout = setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    });
                } else {
                    this.setState({
                        answerState: null,
                        activeQuestion: this.state.activeQuestion + 1,
                    });
                }

                clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            this.setState({
                results,
                answerState: {
                    [answerId]: 'error'
                }
            });
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 >= this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        });
    }

    render() {
        const activeQuestion = this.state.quiz[this.state.activeQuestion];
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.isFinished
                        ? <Finished 
                            results={this.state.results} 
                            quiz={this.state.quiz} 
                            onRetry={this.retryHandler} />

                        : <ActiveQuiz 
                            answerState={this.state.answerState}
                            quizLength={this.state.quiz.length}
                            answerIndex={this.state.activeQuestion + 1}
                            question={activeQuestion.question}
                            answers={activeQuestion.answers}
                            onAnswerClick={this.onAnswerClickHandler} />

                    }
                    
                </div>
            </div>
        );
    }

}

export default Quiz;