import { useState } from 'react'
import styles from './TaskInput.module.css'

function TaskInput({ onAdd }) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task..."
        aria-label="New task"
      />
      <button
        className={styles.button}
        onClick={handleSubmit}
        aria-label="Add task"
      >
        Add
      </button>
    </div>
  )
}

export default TaskInput
