import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App — integration', () => {
  it('renders heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /my todos/i })).toBeInTheDocument()
  })

  it('shows empty state on load', () => {
    render(<App />)
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
  })

  it('adds a task to the list', async () => {
    render(<App />)
    await userEvent.type(screen.getByRole('textbox'), 'Buy milk')
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  it('clears input after adding a task', async () => {
    render(<App />)
    await userEvent.type(screen.getByRole('textbox'), 'Buy milk')
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it('deletes a task', async () => {
    render(<App />)
    await userEvent.type(screen.getByRole('textbox'), 'Buy milk')
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    fireEvent.click(screen.getByRole('button', { name: /delete task: buy milk/i }))
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
  })

  it('shows empty state after deleting all tasks', async () => {
    render(<App />)
    await userEvent.type(screen.getByRole('textbox'), 'Buy milk')
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    fireEvent.click(screen.getByRole('button', { name: /delete task: buy milk/i }))
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
  })

  it('marks a task as complete', async () => {
    render(<App />)
    await userEvent.type(screen.getByRole('textbox'), 'Buy milk')
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    fireEvent.click(screen.getByRole('button', { name: /as complete/i }))
    expect(screen.getByRole('button', { name: /undo complete/i })).toBeInTheDocument()
  })

  it('unmarks a completed task', async () => {
    render(<App />)
    await userEvent.type(screen.getByRole('textbox'), 'Buy milk')
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    fireEvent.click(screen.getByRole('button', { name: /as complete/i }))
    fireEvent.click(screen.getByRole('button', { name: /undo complete/i }))
    expect(screen.getByRole('button', { name: /as complete/i })).toBeInTheDocument()
  })

  it('adds multiple tasks', async () => {
    render(<App />)
    for (const task of ['Task 1', 'Task 2', 'Task 3']) {
      await userEvent.type(screen.getByRole('textbox'), task)
      fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    }
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
    expect(screen.getByText('Task 3')).toBeInTheDocument()
  })

  it('shows validation error for empty submit', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
