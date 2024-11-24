import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  test('renders TodoList component', () => {
    render(<TodoList />);
    const heading = screen.getByText(/Todo List/i);
    expect(heading).toBeInTheDocument();
  });

  test('displays initial todos', () => {
    render(<TodoList />);
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(3);  // Initial todos
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const button = screen.getByText(/Add Todo/i);

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    const newTodo = screen.getByText(/New Todo/i);
    expect(newTodo).toBeInTheDocument();
  });

  test('toggles todo completion status', () => {
    render(<TodoList />);
    
    const todo = screen.getByText(/Learn React/i);
    fireEvent.click(todo);

    expect(todo).toHaveStyle('text-decoration: line-through');

    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: none');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    
    const todo = screen.getByText(/Learn React/i);
    const deleteButton = screen.getByText(/Delete/i);

    fireEvent.click(deleteButton);

    expect(todo).not.toBeInTheDocument();
  });
});
