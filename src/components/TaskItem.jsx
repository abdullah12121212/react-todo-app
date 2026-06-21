import styles from './TaskItem.module.css'

function TaskItem({ task, onDelete, onToggle }) {
  return (
    <li className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <div className={styles.left}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <span className={styles.text}>{task.text}</span>
      </div>
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
