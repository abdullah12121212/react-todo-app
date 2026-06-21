import { useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import './styles/App.css'

function App() {
  const [tasks, setTasks] = useState([])

  const handleAdd = (text) => {
    setTasks((prev) => [...prev, { id: Date.now(), text }])
  }

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <main className="app" role="main" id="main-content">
      <h1 id="app-title">My Todos</h1>
      <TaskInput onAdd={handleAdd} />
      <section aria-label="Task list" aria-live="polite">
        <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />
      </section>
    </main>
  )
}

export default App
