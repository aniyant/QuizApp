import { actionsTypes } from "../actions/quizActions";

const initialState = {
    categories:[],
    isLoadingCategories:false,
    isErrorLoadingCategories:false,
    questions:[],
    isLoadingQuestions:false,
    isErrorLoadingQuestions:false,
    currentQuestionIndex:0,
    score:0,
}

export const quizReducer = (state=initialState,actions) => {
    switch(actions.type) {
        case actionsTypes.FETCH_CATEGORIES_REQUEST:
            return {
               ...state,
                isLoadingCategories:true,
                isErrorLoadingCategories:false,
                categories:[],
            }
        case actionsTypes.FETCH_CATEGORIES_SUCCESS:
            return {
               ...state,
                categories:actions.payload,
                isLoadingCategories:false,
                isErrorLoadingCategories:false,
            }
        case actionsTypes.FETCH_CATEGORIES_FAILURE:
            return {
               ...state,
                isLoadingCategories:false,
                isErrorLoadingCategories:true,
                categories:[],
            }
        case actionsTypes.FETCH_QUESTION_REQUEST:
            return {
               ...state,
                isLoadingQuestions:true,
                isErrorLoadingQuestions:false,
                questions:[],
            }
        case actionsTypes.FETCH_QUESTION_SUCCESS:
            return {
               ...state,
                questions:actions.payload,
                isLoadingQuestions:false,
                isErrorLoadingQuestions:false,
            }
        case actionsTypes.FETCH_QUESTION_FAILURE:
            return {
                ...state,
                isLoadingQuestions:false,
                isErrorLoadingQuestions:true,
                questions:[],
            }
        case actionsTypes.NEXT_QUESTION:
            return {
                ...state,
                currentQuestionIndex:state.currentQuestionIndex+1,
            }
        case actionsTypes.RESET_QUIZ:
            return {
                ...state,
                currentQuestionIndex:0,
                score:0,
                questions:[],
            }
        case actionsTypes.INCREMENT_SCORE:
            return {
                ...state,
                score: state.score+1,
            }
        default:
            return state;
    }
}
