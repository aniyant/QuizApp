import axios from 'axios';

export const actionsTypes = {
    FETCH_CATEGORIES_SUCCESS:"FETCH_CATEGORIES_SUCCESS",
    FETCH_CATEGORIES_FAILURE:"FETCH_CATEGORIES_FAILURE",
    FETCH_CATEGORIES_REQUEST:"FETCH_CATEGORIES_REQUEST",
    FETCH_QUESTION_SUCCESS:"FETCH_QUESTION_SUCCESS",
    FETCH_QUESTION_FAILURE:"FETCH_QUESTION_FAILURE",
    FETCH_QUESTION_REQUEST:"FETCH_QUESTION_REQUEST",
    NEXT_QUESTION:"NEXT_QUESTION",
    RESET_QUIZ:"RESET_QUIZ",
    INCREMENT_SCORE:"INCREMENT_SCORE",
}

const categoryUrl = "https://opentdb.com/api_category.php";
const baseUrl = "https://opentdb.com/api.php?";

export const fetchCategories = () => {
    return async(dispatch) => {
        try{
            dispatch({type:actionsTypes.FETCH_CATEGORIES_REQUEST});
            const response = await axios.get(categoryUrl);
            dispatch({type:actionsTypes.FETCH_CATEGORIES_SUCCESS,payload:response.data.trivia_categories});
        }
        catch(error){
            console.log("error in category fetch", error);
            dispatch({type:actionsTypes.FETCH_CATEGORIES_FAILURE});
        }
    }
}

export const fetchQuestions = (params) => {
    return async(dispatch) => {
        const { category, difficulty,type,amount } = params;
        console.log(category, difficulty,type,amount);
        try{
            dispatch({type:actionsTypes.FETCH_QUESTION_REQUEST});
            const response = await axios.get(baseUrl+`?category=${category}&difficulty=${difficulty}&type=${type}&amount=${amount}`);
            // console.log(baseUrl+`?category=${category}&difficulty=${difficulty}&type=${type}&amount=${amount}`);
            // console.log(response.data);
            dispatch({type:actionsTypes.FETCH_QUESTION_SUCCESS,payload:response.data.results});
        }
        catch(error){
            console.log("error in category fetch", error);
            dispatch({type:actionsTypes.FETCH_QUESTION_FAILURE});
        }
    }
}

export const nextQuestion = () => ({type:actionsTypes.NEXT_QUESTION});
export const resetQuiz = () => ({type:actionsTypes.RESET_QUIZ});
export const incrementScore = () => ({type:actionsTypes.INCREMENT_SCORE});