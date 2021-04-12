import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Disclosure, DisclosureButton, DisclosurePanel } from '.';

/**
 * Disclosure and DisclosureButton are re-exports from @reach/disclosure. These tests are to assert
 * that we didn't break anything from that library, and that the custom styling works when the
 * Disclosure is open.
 */

describe('Disclosure', () => {
  it('renders a Disclosure', () => {
    render(
      <Disclosure>
        <DisclosureButton>Open</DisclosureButton>
        <DisclosurePanel data-testid="contents">Contents</DisclosurePanel>
      </Disclosure>
    );

    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
    expect(screen.getByTestId('contents')).toHaveAttribute('hidden');

    userEvent.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByTestId('contents')).not.toHaveAttribute('hidden');
    expect(screen.getByTestId('contents')).toHaveStyle({ height: 'auto' });
  });
});
