import TaskItem from './TaskItem'
import styles from './TaskList.module.css'

function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return <p className={styles.empty}>No tasks yet. Add one above!</p>
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default TaskList
