import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TaskList from '../components/TaskList'

const tasks = [
  { id: 1, text: 'Buy milk', completed: false },
  { id: 2, text: 'Call dentist', completed: true },
]

describe('TaskList', () => {
  it('renders empty state when no tasks', () => {
    render(<TaskList tasks={[]} onDelete={vi.fn()} onToggle={vi.fn()} />)
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
  })

  it('renders all tasks', () => {
    render(<TaskList tasks={tasks} onDelete={vi.fn()} onToggle={vi.fn()} />)
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Call dentist')).toBeInTheDocument()
  })

  it('renders correct task count in aria-label', () => {
    render(<TaskList tasks={tasks} onDelete={vi.fn()} onToggle={vi.fn()} />)
    expect(screen.getByRole('list')).toHaveAttribute('aria-label', '2 tasks')
  })

  it('renders singular task count in aria-label', () => {
    render(<TaskList tasks={[tasks[0]]} onDelete={vi.fn()} onToggle={vi.fn()} />)
    expect(screen.getByRole('list')).toHaveAttribute('aria-label', '1 task')
  })
})
