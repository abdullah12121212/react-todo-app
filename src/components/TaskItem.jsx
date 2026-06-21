import styles from './TaskItem.module.css'

function TaskItem({ task, onDelete, onToggle }) {
  return (
    <li className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <span className={styles.text}>{task.text}</span>
      <div className={styles.actions}>
        {!task.completed && (
          <button
            className={styles.completeBtn}
            onClick={() => onToggle(task.id)}
            aria-label={`Mark "${task.text}" as complete`}
          >
            Complete
          </button>
        )}
        {task.completed && (
          <button
            className={styles.undoBtn}
            onClick={() => onToggle(task.id)}
            aria-label={`Undo complete for "${task.text}"`}
          >
            Undo
          </button>
        )}
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(task.id)}
          aria-label={`Delete task: ${task.text}`}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TaskItem
