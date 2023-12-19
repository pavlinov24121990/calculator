import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../page'; // Adjust the path accordingly

test('calculates addition correctly', () => {
  render(<Home />);
  fireEvent.click(screen.getByText('1'));
  fireEvent.click(screen.getByText('2'));
  const plusButtons = screen.getAllByText('+');
  fireEvent.click(plusButtons[1]);
  fireEvent.click(screen.getByText('3'));
  fireEvent.click(screen.getByText('='));
  expect(screen.getByText('15')).toBeInTheDocument()
});

test('safeMRNumber function adds a number to safeNumbers array MR+', () => {
  render(<Home />);
  fireEvent.click(screen.getByText('1'));
  fireEvent.click(screen.getByText('2'));
  const plusButtons = screen.getAllByText('+');
  fireEvent.click(plusButtons[1]);
  fireEvent.click(screen.getByText('3'));
  fireEvent.click(screen.getByText('='));
  fireEvent.click(screen.getByText('MR'));
  fireEvent.click(screen.getByText('1'));
  fireEvent.click(screen.getByText('2'));
  fireEvent.click(plusButtons[1]);
  fireEvent.click(screen.getByText('3'));
  fireEvent.click(screen.getByText('='));
  fireEvent.click(screen.getByText('MR'));
  fireEvent.click(screen.getByText('MR+'));
  expect(screen.getByText('30')).toBeInTheDocument()
});

test('safeMRNumber function adds a number to safeNumbers array MR-', () => {
  render(<Home />);
  fireEvent.click(screen.getByText('1'));
  fireEvent.click(screen.getByText('2'));
  const plusButtons = screen.getAllByText('+');
  fireEvent.click(plusButtons[1]);
  fireEvent.click(screen.getByText('3'));
  fireEvent.click(screen.getByText('='));
  fireEvent.click(screen.getByText('MR'));
  fireEvent.click(screen.getByText('1'));
  fireEvent.click(screen.getByText('2'));
  fireEvent.click(plusButtons[1]);
  fireEvent.click(screen.getByText('4'));
  fireEvent.click(screen.getByText('='));
  fireEvent.click(screen.getByText('MR'));
  fireEvent.click(screen.getByText('MR-'));
  expect(screen.getByText('-1')).toBeInTheDocument()
});

test('handleButtonClick change class operator panel', async () => {
  render(<Home />);

  const add = screen.getAllByText('+');
  fireEvent.click(add[1]);
  await waitFor(() => {
    expect(add[1]).toHaveClass("active button-operator");
  });

  const minus = screen.getByRole('button', { name: '—' })
  fireEvent.click(screen.getByRole('button', { name: '—' }));
  await waitFor(() => {
    expect(add[1]).toHaveClass("button-operator");
    expect(minus).toHaveClass("active button-operator");
  });

  const divide = screen.getByText('÷')
  fireEvent.click(divide);
  await waitFor(() => {
    expect(add[1]).toHaveClass("button-operator");
    expect(minus).toHaveClass("button-operator");
    expect(divide).toHaveClass("active button-operator");
  });

  const multiply = screen.getByText('x')
  fireEvent.click(multiply);
  await waitFor(() => {
    expect(divide).toHaveClass("button-operator");
    expect(add[1]).toHaveClass("button-operator");
    expect(minus).toHaveClass("button-operator");
    expect(multiply).toHaveClass("active button-operator");
  });
});
