import { useState } from 'react'
import './App.css'
import { Button, Container } from '@chakra-ui/react';
import { Quiz } from './components/Quiz';

function App() {
  const [showQuiz,setShowQuiz] = useState(false);

  return (
    <Container>
      <Button onClick={()=>setShowQuiz((prev)=>!prev)}>Wanna Play Quiz</Button>
      {showQuiz && <Quiz/>}
    </Container>
  )
}

export default App
