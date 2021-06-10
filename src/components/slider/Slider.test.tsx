import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useState } from 'react';

import { Slider } from '.';

describe('Slider', () => {
  it('renders a simple slider', () => {
    render(<Slider min={0} max={100} />);

    const handle = screen.getByRole('slider');

    // Sets the min, max, and current value.
    expect(handle).toHaveAttribute('aria-valuenow', '0');
    expect(handle).toHaveAttribute('aria-valuemin', '0');
    expect(handle).toHaveAttribute('aria-valuemax', '100');
  });

  describe('with custom min, max, and defaultValue props (uncontrolled mode)', () => {
    beforeEach(() => render(<Slider min={10} max={20} defaultValue={15} />));

    it('renders a slider with custom min, max, and defaultValue props', () => {
      const handle = screen.getByRole('slider');

      // Sets the min, max, and current value.
      expect(handle).toHaveAttribute('aria-valuenow', '15');
      expect(handle).toHaveAttribute('aria-valuemin', '10');
      expect(handle).toHaveAttribute('aria-valuemax', '20');
    });

    it('allows the value to be changed with user events', () => {
      const handle = screen.getByRole('slider');

      fireEvent.keyDown(handle, { key: 'ArrowRight', code: 39 });
      expect(handle).toHaveAttribute('aria-valuenow', '16');

      fireEvent.keyDown(handle, { key: 'ArrowLeft', code: 37 });
      expect(handle).toHaveAttribute('aria-valuenow', '15');

      fireEvent.keyDown(handle, { key: 'End', code: 35 });
      expect(handle).toHaveAttribute('aria-valuenow', '20');

      fireEvent.keyDown(handle, { key: 'Home', code: 36 });
      expect(handle).toHaveAttribute('aria-valuenow', '10');
    });
  });

  describe('with custom min, max, and value props (controlled mode)', () => {
    it('sets the custom min, max, and value props', () => {
      render(<Slider min={10} max={20} value={15} />);

      const handle = screen.getByRole('slider');

      // Sets the min, max, and current value.
      expect(handle).toHaveAttribute('aria-valuenow', '15');
      expect(handle).toHaveAttribute('aria-valuemin', '10');
      expect(handle).toHaveAttribute('aria-valuemax', '20');
    });

    it('does not allow the value to be changed with user events', () => {
      render(<Slider min={10} max={20} value={15} />);

      const handle = screen.getByRole('slider');

      fireEvent.keyDown(handle, { key: 'ArrowRight', code: 39 });
      expect(handle).toHaveAttribute('aria-valuenow', '15');

      fireEvent.keyDown(handle, { key: 'ArrowLeft', code: 37 });
      expect(handle).toHaveAttribute('aria-valuenow', '15');

      fireEvent.keyDown(handle, { key: 'End', code: 35 });
      expect(handle).toHaveAttribute('aria-valuenow', '15');

      fireEvent.keyDown(handle, { key: 'Home', code: 36 });
      expect(handle).toHaveAttribute('aria-valuenow', '15');
    });

    it('changes the slider value when the controlled value changes', () => {
      function ControlledSlider() {
        const [value, setValue] = useState(15);

        return (
          <>
            <button onClick={() => setValue(20)}>Change value</button>
            <Slider min={10} max={20} value={value} />
          </>
        );
      }

      render(<ControlledSlider />);

      const handle = screen.getByRole('slider');
      const button = screen.getByRole('button', { name: 'Change value' });

      expect(handle).toHaveAttribute('aria-valuenow', '15');

      userEvent.click(button);

      expect(handle).toHaveAttribute('aria-valuenow', '20');
    });
  });

  describe('with a drawTo extrema outside the min/max', () => {
    beforeEach(() =>
      render(<Slider drawToMin={5} drawToMax={25} min={10} max={20} defaultValue={15} />)
    );

    it('sets the min value', () => {
      const handle = screen.getByRole('slider');
      expect(handle).toHaveAttribute('aria-valuemin', '10');
    });

    it('sets the max value', () => {
      const handle = screen.getByRole('slider');
      expect(handle).toHaveAttribute('aria-valuemax', '20');
    });

    it('does not allow moving the value beyond the min/max', () => {
      const handle = screen.getByRole('slider');

      fireEvent.keyDown(handle, { key: 'End', code: 35 });
      expect(handle).toHaveAttribute('aria-valuenow', '20');

      fireEvent.keyDown(handle, { key: 'Home', code: 36 });
      expect(handle).toHaveAttribute('aria-valuenow', '10');
    });
  });
});
