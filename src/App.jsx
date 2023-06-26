import { useState } from 'react'
import './App.css'
import Game from './Components/Game/Game'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Game/>
    </>
  )
}

export default App
