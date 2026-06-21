import styles from './TaskItem.module.css'

function TaskItem({ task, onDelete }) {
  return (
    <li className={styles.item}>
      <span className={styles.text}>{task.text}</span>
      <button
        className={styles.deleteBtn}
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task: ${task.text}`}
      >
        ✕
      </button>
    </li>
  )
}

export default TaskItem
