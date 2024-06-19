import { Box, Heading, Radio, RadioGroup, Stack, Button, Text} from '@chakra-ui/react';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { incrementScore, nextQuestion } from '../../redux/actions/quizActions';

export const QuizQuestions = () => {
    const dispatch = useDispatch();
    const { questions, currentQuestionIndex } = useSelector((state) => state.quiz);
    
    const currentQuestion = questions[currentQuestionIndex];
    const answer = currentQuestion.correct_answer;
    const incorrectAnswers = [...currentQuestion.incorrect_answers];
    const options = [answer, ...incorrectAnswers].sort();

    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
  
    const submitAnswerButton = useRef();
  
    const handleAnswer = () => {
      if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
        setIsCorrect(true);
        dispatch(incrementScore());
      } else {
        setIsCorrect(false);
      }
      setTimeout(() => {
        setSelectedAnswer('');
        setIsCorrect(null);
        dispatch(nextQuestion());
      }, 1000);
    };
  return (
    <Box>
    <Heading m={10}>
        <Text color="teal">
        Welcome To <Box as="span" color="tomato">QuizY</Box>
        </Text>
    </Heading>
    <Heading fontSize={16} width={800} textAlign="left" mb={10}>
        <Text color="teal">
        <Text as="span" paddingRight={10}>
            Q.{currentQuestionIndex + 1}
        </Text>
        {currentQuestion.question}
        </Text>
    </Heading>

    <RadioGroup value={selectedAnswer} name="question">
        <Stack>
        {options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectAnswer = option === answer;
            const bgColor = isCorrect === null
            ? 'white'
            : isSelected && isCorrectAnswer
                ? 'lightgreen'
                : isSelected && !isCorrectAnswer
                ? 'red'
                : 'white';

            return (
            <Radio
                key={index}
                id={option}
                name="question"
                value={option}
                onChange={(e) => {
                setSelectedAnswer(e.target.value);
                }}
            >
                <Text
                color="teal"
                bg={bgColor}
                padding="5px"
                borderRadius="5px"
                >
                {option}
                </Text>
            </Radio>
            );
        })}
        <Box mt={10} width="100%">
            <Button width="100%" onClick={handleAnswer}>
            <Text p={2} fontSize={14} ref={submitAnswerButton}>
                Submit Answer
            </Text>
            </Button>
        </Box>
        </Stack>
    </RadioGroup>
    </Box>
  )
}
