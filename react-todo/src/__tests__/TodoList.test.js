import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList';

const renderTodoList = () => {
  render(<TodoList />);
  const input = screen.getByPlaceholderText('Add new todo');
  const addButton = screen.getByText('Add Todo');
  return { input, addButton };
};

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
   
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Learn Testing')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    const { input, addButton } = renderTodoList();

   
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

   
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles a todo completion status', () => {
    render(<TodoList />);
    const todo = screen.getByText('Learn React');

    
    expect(todo).not.toHaveStyle('text-decoration: line-through');

    
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
