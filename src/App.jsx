import { useState } from 'react'
import './App.css'
import { Container } from '@chakra-ui/react';
import { Quiz } from './components/Quiz';

function App() {

  return (
    <Container>
      <Quiz />
    </Container>
  )
}

export default App
