import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import Finished from "../../components/FInished/Finished";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizById, quizAnswerClick, restartQuiz } from "../../redux/actions/quiz";
 
class Quiz extends Component {
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.restartQuiz();
    }

    onAnswerClickHandler = (answerId) => {
        this.props.quizAnswerClick(answerId);
    }

    retryHandler = () => {
        this.props.restartQuiz();
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    { 
                        this.props.loading || !this.props.quiz
                            ?   <Loader />
                            : this.props.isFinished
                                ? <Finished 
                                        results={this.props.results} 
                                        quiz={this.props.quiz} 
                                        onRetry={this.retryHandler} />
            
                                    : <ActiveQuiz 
                                        answerState={this.props.answerState}
                                        quizLength={this.props.quiz.length}
                                        answerIndex={this.props.activeQuestion + 1}
                                        question={this.props.quiz[this.props.activeQuestion].question}
                                        answers={this.props.quiz[this.props.activeQuestion].answers}
                                        onAnswerClick={this.onAnswerClickHandler} />
                                    
                             
                    }
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results, 
        isFinished:  state.quiz.isFinished,
        activeQuestion:  state.quiz.activeQuestion,
        answerState:  state.quiz.answerState, 
        quiz:  state.quiz.quiz,
        loading:  state.quiz.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
        restartQuiz: () => dispatch(restartQuiz()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);