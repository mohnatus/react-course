import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-19ae1.firebaseio.com'
});