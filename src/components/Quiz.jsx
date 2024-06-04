import { Box, Radio, RadioGroup, Select, Stack, VStack,Text,Input,Button,Heading } from '@chakra-ui/react';
import React,{useEffect,useState,useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories,fetchQuestions,nextQuestion,incrementScore,resetQuiz } from '../redux/actions/quizActions';


export const Quiz = () => {
    const dispatch = useDispatch();
    const {categories,questions,currentQuestionIndex,score} = useSelector((state)=> state.quiz);
    const [category,setCategory] = useState('');
    const [difficulty,setDifficulty] = useState('');
    const [type,setType] = useState('');
    const [amount,setAmount] = useState('');
    const [selectedAnswer,setSelectedAnswer] = useState('');

    const submitAnswerButton = useRef();
  

    useEffect(() => {
        dispatch(fetchCategories());
       
    }, [dispatch]);
   
    //startquiz
    const startQuiz = () => {
        dispatch(fetchQuestions({category,difficulty,type,amount}));
    }
    
    //restartquiz
    const restartQuiz = () => {
        dispatch(resetQuiz());
    }

    const handleAnswer = (e) => {
        if(selectedAnswer ===  questions[currentQuestionIndex].correct_answer){
            submitAnswerButton.current.style.backgroundColor="green";
            submitAnswerButton.current.innerText = "Correct Answer";
            dispatch(incrementScore());
        }
        else{
            submitAnswerButton.current.style.backgroundColor="red";
            submitAnswerButton.current.innerText = "Wrong Answer";
        }
        setTimeout(()=>{
            setSelectedAnswer('');
            submitAnswerButton.current.style.backgroundColor="white";
            submitAnswerButton.current.innerText = "Submit Answer";
            dispatch(nextQuestion());
        },1000)

    }
    if(questions.length == 0) {
        return (
            <>
            <Heading m={10}>
                <Text color="teal">Welcome To <Box as="span" color="tomato">QuizY</Box></Text>
            </Heading>
            <VStack spacing={5}>
                {/* <Text>Select your quiz preferences:</Text> */}
                <Select variant="flushed" _placeholder={{color:"teal"}} color="teal" p={3} onChange={(e)=>setCategory(e.target.value)} placeholder='Select Category' >
                    {
                        categories.map((cat)=> {
                            return <option key={cat.id} value={cat.id}>{cat.name}</option>
                        })
                    }
                </Select>
                <Select type="number" variant="flushed" _placeholder={{color:"teal"}} p={3} color="teal" onChange={(e)=> setDifficulty(e.target.value)} placeholder='Select Difficulty'>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </Select>
                <Select type="number" variant="flushed" _placeholder={{color:"teal"}} p={3} color="teal" onChange={(e)=> setType(e.target.value)} placeholder='Select Type'>
                    <option value='multiple'>Multiple</option>
                    <option value='boolean'>Boolean</option>
                </Select>
                <Input type="number" variant="flushed" _placeholder={{color:"teal"}} p={3} color="teal" value={amount} onChange={(e)=> setAmount(e.target.value)} placeholder="Number Of Questions" min="1" max="50"/>
                <Button onClick={startQuiz}>Start Quiz</Button>
            </VStack>
            </>
        )
    }
    if(currentQuestionIndex >= questions.length){
        return (
            <VStack>
                <Heading m={10}>
                <Text color="teal">Welcome To <Box as="span" color="tomato">QuizY</Box></Text>
            </Heading>
                <Heading mb={2}>
                    <Text fontSize={24} color="tomato">Quiz Completed !</Text>
                </Heading> 
                <Heading m={10}>
                    <Text fontSize={18} m={2} color="teal">Your Score:<Box as="span" color="tomato"> {score}</Box> Out Of <Box as="span" color="tomato"> {questions.length}</Box></Text>
                    <Text fontSize={15} m={2} color="teal"> Percentage Score:<Box as="span" color="tomato"> {score/questions.length*100}%</Box> </Text>
                </Heading>
                <Button onClick={restartQuiz}><Text p={2} fontSize={14}>Restart Quiz</Text></Button>
            </VStack>
        )
    }

    const currentQuestion = questions[currentQuestionIndex];
    const answer = currentQuestion.correct_answer
    const incorrectAnswers = [...currentQuestion.incorrect_answers]
    const options = [answer,...incorrectAnswers].sort();
    console.log(currentQuestion);
    // console.log("option:",options);

  return (
    <Box>
        <Heading m={10}>
                <Text color="teal">Welcome To <Box as="span" color="tomato">QuizY</Box></Text>
        </Heading>
        <Heading fontSize={16} width={800} textAlign="left" mb={10}>
            <Text color="teal"><Text as ="span" paddingRight={10}>Q.{currentQuestionIndex+1}</Text>{currentQuestion.question}</Text>
        </Heading>
      
        <RadioGroup value={selectedAnswer} name="question">
            <Stack>
            {
                options.map((option,index)=>{
                    console.log("option",option)
                    return (
                        <Radio key={index} id={option} name='question' value={option} onChange={(e)=>{console.log(e.target);setSelectedAnswer(e.target.value)}}><Text color="teal">{option}</Text></Radio>
                    )
                })
            }
            <Box mt={10} width="100%">
            <button width="100%" onClick={handleAnswer}><Text p={2} fontSize={14} ref={submitAnswerButton}>Submit Answer</Text></button>
            </Box>
            </Stack>
        </RadioGroup>
    </Box>
  )
}
