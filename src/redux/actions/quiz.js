import axios from "../../axios/axios-quiz";
import { 
    FETCH_QUIZES_START, 
    FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZ_SUCCESS, 
    FETCH_QUIZES_ERROR,
    QUIZ_SET_STATE,
    QUIZ_FINISH,
    QUIZ_ACTIVE_QUESTION,
    RESTART_QUIZ,
} from "./actionTypes";

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START,
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes,
    }
}


export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz,
    }
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error,
    }
}

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quizes.json');
            const quizes = Object.keys(response.data)
                .map((key, index) => {
                    return {
                        id: key,
                        name: `Тест #${index + 1}`
                    };
                });

                dispatch(fetchQuizesSuccess(quizes))
        } catch(e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(id) {
    return async (dispatch) => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/${id}.json`);
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz))
        } catch(e) {
            dispatch(fetchQuizesError(e))
        }
    }
}


export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, 
        results
    };
}

export function finishQuiz() {
    return {
        type: QUIZ_FINISH
    };
}

export function quizSetActiveQuestion(activeQuiestionId) {
    return {
        type: QUIZ_ACTIVE_QUESTION,
        activeQuestion: activeQuiestionId
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;

        const isQuizFinished = state.activeQuestion + 1 >= state.quiz.length;

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return;
            }
        }

        const question = state.quiz[state.activeQuestion];
        const results = state.results;

        if (answerId === question.correctAnswerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            dispatch(quizSetState(
                {[answerId]: 'success'},
                results
            ));
                
            let timeout = setTimeout(() => {
                if (isQuizFinished) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizSetActiveQuestion(state.activeQuestion + 1))
                }

                clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            dispatch(quizSetState(
                {[answerId]: 'error'},
                results
            ));
        }
    }
}

export function restartQuiz() {
    return {
        type: RESTART_QUIZ,
    }
}