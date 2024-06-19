import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  fetchQuestions
} from '../../redux/actions/quizActions';
import {
  Box,
  Select,
  VStack,
  Text,
  Input,
  Button,
  Heading,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';


export const QuizSetup = () => {
  const { categories } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  //startquiz
  const startQuiz = () => {
    dispatch(fetchQuestions({ category, difficulty, type, amount }));
  };

  return (
    <>
      <Heading m={10}>
        <Text color="teal">
          Welcome To <Box as="span" color="tomato">QuizY</Box>
        </Text>
      </Heading>
      <VStack spacing={5}>
        <Select
          variant="flushed"
          _placeholder={{ color: 'teal' }}
          color="teal"
          p={3}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Select Category"
        >
          {categories.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            );
          })}
        </Select>
        <Select
          variant="flushed"
          _placeholder={{ color: 'teal' }}
          p={3}
          color="teal"
          onChange={(e) => setDifficulty(e.target.value)}
          placeholder="Select Difficulty"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>
        <Select
          variant="flushed"
          _placeholder={{ color: 'teal' }}
          p={3}
          color="teal"
          onChange={(e) => setType(e.target.value)}
          placeholder="Select Type"
        >
          <option value="multiple">Multiple</option>
          <option value="boolean">Boolean</option>
        </Select>
        <Input
          variant="flushed"
          _placeholder={{ color: 'teal' }}
          p={3}
          color="teal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Number Of Questions"
          min="1"
          max="50"
        />
        <Button onClick={startQuiz}>Start Quiz</Button>
      </VStack>
    </>
  )
}
