import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList';

// Helper function to render component and return a reference to the input and buttons
const renderTodoList = () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText('Add new todo');
  const addButton = screen.getByText('Add Todo');
  return { input, addButton };
};

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Learn Testing')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    const { input, addButton } = renderTodoList();

    // Simulate user typing and submitting the form
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    // Check if new todo appears in the list
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles a todo completion status', () => {
    render(<TodoList />);
    const todo = screen.getByText('Learn React');

    // Initial state (not completed)
    expect(todo).not.toHaveStyle('text-decoration: line-through');

    // Toggle completion
    fireEvent.click(todo);

    
    expect(todo).toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    const deleteButton = screen.getByText('Delete');

    
    fireEvent.click(deleteButton);

    
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});
