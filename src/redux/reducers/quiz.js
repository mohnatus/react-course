import { 
    FETCH_QUIZES_START, 
    FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZ_SUCCESS, 
    FETCH_QUIZES_ERROR, 
    QUIZ_SET_STATE,
    QUIZ_FINISH,
    QUIZ_ACTIVE_QUESTION,
    RESTART_QUIZ
} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: false,
    error: null,

    results: {}, 
    isFinished: false,
    activeQuestion: 0,
    answerState: null, 
    quiz: null,
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state,
                loading: true,
            };
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                loading: false,
                quizes: action.quizes,
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            };
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results,
            };
        case QUIZ_FINISH:
            return {
                ...state,
                isFinished: true
            };
        case QUIZ_ACTIVE_QUESTION:
            return {
                ...state,
                answerState: null,
                activeQuestion: action.activeQuestion,
            };
        case RESTART_QUIZ:
            return { 
                ...state,
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            };
        default:
            return state;
    } 
}