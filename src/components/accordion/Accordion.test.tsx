import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '.';

/**
 * Accordion and AccordionButton are re-exports from @reach/accordion. These tests are to assert
 * that we didn't break anything from that library, and that the custom styling works when the
 * Accordion is open.
 */

describe('Accordion', () => {
  it('renders a Accordion', () => {
    render(
      <Accordion>
        <AccordionItem>
          <AccordionButton>Open one</AccordionButton>
          <AccordionPanel data-testid="contents-one">Contents one</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Open two</AccordionButton>
          <AccordionPanel data-testid="contents-two">Contents two</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByRole('button', { name: 'Open one' })).toBeInTheDocument();
    expect(screen.getByTestId('contents-one')).not.toHaveAttribute('hidden');

    expect(screen.getByRole('button', { name: 'Open two' })).toBeInTheDocument();
    expect(screen.getByTestId('contents-two')).toHaveAttribute('hidden');

    userEvent.click(screen.getByRole('button', { name: 'Open two' }));

    expect(screen.getByRole('button', { name: 'Open one' })).toBeInTheDocument();
    expect(screen.getByTestId('contents-one')).toHaveAttribute('hidden');

    expect(screen.getByRole('button', { name: 'Open two' })).toBeInTheDocument();
    expect(screen.getByTestId('contents-two')).not.toHaveAttribute('hidden');
  });
});
