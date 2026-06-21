import { useState } from 'react'
import styles from './TaskInput.module.css'

const MAX_LENGTH = 200

function TaskInput({ onAdd }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    const trimmed = value.trim()

    if (!trimmed) {
      setError('Task cannot be empty.')
      return
    }

    if (trimmed.length > MAX_LENGTH) {
      setError(`Task must be ${MAX_LENGTH} characters or fewer.`)
      return
    }

    onAdd(trimmed)
    setValue('')
    setError('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    if (error) setError('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          aria-label="New task"
          aria-describedby={error ? 'task-error' : undefined}
          maxLength={MAX_LENGTH + 1}
        />
        <button
          className={styles.button}
          onClick={handleSubmit}
          aria-label="Add task"
        >
          Add
        </button>
      </div>
      {error && (
        <p id="task-error" className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default TaskInput
