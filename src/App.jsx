import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Container from './Container.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Container></Container>
      <Container></Container>
      <Container></Container>
      <Container></Container>
      <Container></Container>
      <p>hello  </p>
    </>
  )
}

export default App
