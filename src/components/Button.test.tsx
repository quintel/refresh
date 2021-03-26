import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Hello, world!</Button>);
    expect(screen.getByRole('button', { name: 'Hello, world!' })).toBeInTheDocument();
  });
});
