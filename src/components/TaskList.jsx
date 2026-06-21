import TaskItem from './TaskItem'
import styles from './TaskList.module.css'

function TaskList({ tasks, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return <p className={styles.empty} aria-live="polite">No tasks yet. Add one above!</p>
  }

  return (
    <ul className={styles.list} aria-label={`${tasks.length} task${tasks.length !== 1 ? 's' : ''}`}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  )
}

export default TaskList
