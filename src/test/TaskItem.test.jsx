import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TaskItem from '../components/TaskItem'

const mockTask = { id: 1, text: 'Buy milk', completed: false }
const completedTask = { id: 2, text: 'Done task', completed: true }

describe('TaskItem', () => {
  it('renders task text', () => {
    render(<TaskItem task={mockTask} onDelete={vi.fn()} onToggle={vi.fn()} />)
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  it('renders Complete button for active task', () => {
    render(<TaskItem task={mockTask} onDelete={vi.fn()} onToggle={vi.fn()} />)
    expect(screen.getByRole('button', { name: /mark "buy milk" as complete/i })).toBeInTheDocument()
  })

  it('renders Undo button for completed task', () => {
    render(<TaskItem task={completedTask} onDelete={vi.fn()} onToggle={vi.fn()} />)
    expect(screen.getByRole('button', { name: /undo complete/i })).toBeInTheDocument()
  })

  it('does not render Complete button for completed task', () => {
    render(<TaskItem task={completedTask} onDelete={vi.fn()} onToggle={vi.fn()} />)
    expect(screen.queryByRole('button', { name: /as complete/i })).not.toBeInTheDocument()
  })

  it('calls onToggle with task id when Complete clicked', () => {
    const onToggle = vi.fn()
    render(<TaskItem task={mockTask} onDelete={vi.fn()} onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button', { name: /as complete/i }))
    expect(onToggle).toHaveBeenCalledWith(1)
  })

  it('calls onToggle with task id when Undo clicked', () => {
    const onToggle = vi.fn()
    render(<TaskItem task={completedTask} onDelete={vi.fn()} onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button', { name: /undo complete/i }))
    expect(onToggle).toHaveBeenCalledWith(2)
  })

  it('calls onDelete with task id when Delete clicked', () => {
    const onDelete = vi.fn()
    render(<TaskItem task={mockTask} onDelete={onDelete} onToggle={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /delete task: buy milk/i }))
    expect(onDelete).toHaveBeenCalledWith(1)
  })

  it('renders delete button with correct aria-label', () => {
    render(<TaskItem task={mockTask} onDelete={vi.fn()} onToggle={vi.fn()} />)
    expect(screen.getByRole('button', { name: /delete task: buy milk/i })).toBeInTheDocument()
  })
})
