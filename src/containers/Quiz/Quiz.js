import React, { Component } from 'react';
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import Finished from "../../components/FInished/Finished";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader"
 
class Quiz extends Component {
    state = {
        results: {}, // { [id]: 'success' 'error' }
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' 'error' }
        quiz: [],
        loaded: false,
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
            const quiz = response.data;
            this.setState({
                quiz,
                loaded: true
            });
        } catch(e) {
            console.error(e);
        }
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
                        this.state.loaded 
                            ?   this.state.isFinished
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
                            :   <Loader />
                    }
                    
                </div>
            </div>
        );
    }

}

export default Quiz;