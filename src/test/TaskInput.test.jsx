import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TaskInput from '../components/TaskInput'

describe('TaskInput', () => {
  it('renders input and Add button', () => {
    render(<TaskInput onAdd={vi.fn()} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument()
  })

  it('calls onAdd with trimmed value on button click', async () => {
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    await userEvent.type(screen.getByRole('textbox'), '  Buy milk  ')
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    expect(onAdd).toHaveBeenCalledWith('Buy milk')
  })

  it('calls onAdd when Enter key is pressed', async () => {
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    await userEvent.type(screen.getByRole('textbox'), 'Buy milk{Enter}')
    expect(onAdd).toHaveBeenCalledWith('Buy milk')
  })

  it('clears input after successful submit', async () => {
    render(<TaskInput onAdd={vi.fn()} />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'Buy milk')
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    expect(input).toHaveValue('')
  })

  it('shows error when submitting empty input', async () => {
    render(<TaskInput onAdd={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    expect(screen.getByRole('alert')).toHaveTextContent('Task cannot be empty.')
  })

  it('shows error when submitting whitespace only', async () => {
    render(<TaskInput onAdd={vi.fn()} />)
    await userEvent.type(screen.getByRole('textbox'), '   ')
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    expect(screen.getByRole('alert')).toHaveTextContent('Task cannot be empty.')
  })

  it('clears error when user starts typing', async () => {
    render(<TaskInput onAdd={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    expect(screen.getByRole('alert')).toBeInTheDocument()
    await userEvent.type(screen.getByRole('textbox'), 'a')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('does not call onAdd for empty input', () => {
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    expect(onAdd).not.toHaveBeenCalled()
  })
})
