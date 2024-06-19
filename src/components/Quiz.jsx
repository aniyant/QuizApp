import {useSelector } from 'react-redux';
import { QuizSetup } from './QuizComponents/QuizSetup';
import { QuizResult } from './QuizComponents/QuizResult';
import { QuizQuestions } from './QuizComponents/QuizQuestions';
  
  export const Quiz = () => {
    const { questions, currentQuestionIndex } = useSelector((state) => state.quiz);

    if (questions.length === 0) {
      return (
        <>
          <QuizSetup/>
        </>
      );
    }
    if (currentQuestionIndex >= questions.length) {
      return (
        <QuizResult/>
      );
    }
  
    return (
      <QuizQuestions/>
    );
  };
  