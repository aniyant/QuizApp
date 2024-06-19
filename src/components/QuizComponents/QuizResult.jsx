import { useDispatch, useSelector } from 'react-redux';
import { resetQuiz } from '../../redux/actions/quizActions';
import {
  Box,
  VStack,
  Text,
  Button,
  Heading,
} from '@chakra-ui/react';

export const QuizResult = () => {
    const {score,questions} = useSelector((store) =>store.quiz);
    const dispatch = useDispatch();

    //restartquiz
    const restartQuiz = () => {
        dispatch(resetQuiz());
      };

  return (
    <VStack>
        <Heading m={10}>
        <Text color="teal">
            Welcome To <Box as="span" color="tomato">QuizY</Box>
        </Text>
        </Heading>
        <Heading mb={2}>
        <Text fontSize={24} color="tomato">Quiz Completed !</Text>
        </Heading>
        <Heading m={10}>
        <Text fontSize={18} m={2} color="teal">
            Your Score:
            <Box as="span" color="tomato"> {score}</Box> Out Of
            <Box as="span" color="tomato"> {questions.length}</Box>
        </Text>
        <Text fontSize={15} m={2} color="teal">
            Percentage Score:
            <Box as="span" color="tomato"> {(score / questions.length) * 100}%</Box>
        </Text>
        </Heading>
        <Button onClick={restartQuiz}>
        <Text p={2} fontSize={14}>Restart Quiz</Text>
        </Button>
    </VStack>
  )
}
