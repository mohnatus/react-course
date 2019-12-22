import axios from "../../axios/axios-quiz";
import { 
    CREATE_QUIZ_QUESTION,
    CREATE_QUIZ
} from "./actionTypes";

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    };
}

export function finishQuizCreation() {
    return {
        type: CREATE_QUIZ,
    };
}

export function createQuiz() {
    return async (dispatch, getState) => {
        try {
            await axios.post('/quizes.json', getState().create.quiz);
            dispatch(finishQuizCreation());
        } catch(e) {
            console.error(e)
        }
    }
}