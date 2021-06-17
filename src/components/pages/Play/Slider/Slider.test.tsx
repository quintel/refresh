import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Slider from '.';

function renderSlider(customProps: Partial<React.ComponentProps<typeof Slider>> = {}) {
  const props = {
    defaultValue: 10,
    description: 'Hello, world',
    min: 0,
    max: 100,
    name: 'Test slider',
    step: 1,
    ...customProps,
  };

  return render(<Slider {...props} />);
}

describe('Slider', () => {
  it('renders Slider', () => {
    renderSlider({ defaultValue: 10, max: 100, min: 0 });

    const handle = screen.getByRole('slider');

    // Sets the min, max, and current value.
    expect(handle).toHaveAttribute('aria-valuenow', '10');
    expect(handle).toHaveAttribute('aria-valuemin', '0');
    expect(handle).toHaveAttribute('aria-valuemax', '100');
  });

  it('can toggle the description', () => {
    const { container } = renderSlider({ description: 'Hello, world' });

    const nonAriaDescButton = screen.getByTestId('show-description');
    const ariaDescButton = screen.getByRole('button', { name: 'Show description' });
    const description = container.querySelector('[data-reach-disclosure-panel]');

    expect(nonAriaDescButton).toBeEnabled();
    expect(ariaDescButton).toBeInTheDocument();

    expect(description).toBeInTheDocument();
    expect(description).not.toHaveAttribute('open');

    userEvent.click(nonAriaDescButton);

    expect(description).toBeInTheDocument();
    expect(description).toHaveAttribute('open');
  });

  it('can omit the description', () => {
    const { container } = renderSlider({ description: undefined });

    const nonAriaDescButton = screen.getByTestId('show-description');

    expect(nonAriaDescButton).toBeDisabled();

    expect(screen.queryByRole('button', { name: 'Show description' })).not.toBeInTheDocument();
    expect(container.querySelector('[data-reach-disclosure-panel]')).not.toBeInTheDocument();
  });

  it('disables the (-) button when the value is already at the minimum', () => {
    renderSlider({ defaultValue: 0, min: 0 });

    expect(screen.getByRole('button', { name: 'Decrease value' })).toBeDisabled();

    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight', code: 39 });

    expect(screen.getByRole('button', { name: 'Decrease value' })).toBeEnabled();
  });

  it('disables the (+) button when the value is already at the maximum', () => {
    renderSlider({ defaultValue: 10, max: 10 });

    expect(screen.getByRole('button', { name: 'Increase value' })).toBeDisabled();

    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft', code: 37 });

    expect(screen.getByRole('button', { name: 'Increase value' })).toBeEnabled();
  });

  it('can reset the slider value with the reset button', () => {
    renderSlider({ defaultValue: 10, max: 20, min: 0, step: 1 });

    const reset = screen.getByRole('button', { name: 'Reset to original value' });
    const handle = screen.getByRole('slider');

    expect(reset).toBeDisabled();
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft', code: 37 });
    expect(reset).toBeEnabled();

    expect(handle).toHaveAttribute('aria-valuenow', '9');
    userEvent.click(reset);
    expect(handle).toHaveAttribute('aria-valuenow', '10');
    expect(reset).toBeDisabled();
  });
});
