import { useState } from 'react'
import TaskInput from './components/TaskInput'
import './styles/App.css'

function App() {
  const [tasks, setTasks] = useState([])

  const handleAdd = (text) => {
    setTasks((prev) => [...prev, { id: Date.now(), text }])
  }

  return (
    <main className="app">
      <h1>Todo App</h1>
      <TaskInput onAdd={handleAdd} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </main>
  )
}

export default App
