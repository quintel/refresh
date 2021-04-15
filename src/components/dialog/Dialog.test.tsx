import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dialog, useDialog } from '.';

function ExampleDialog(
  props: Omit<React.ComponentProps<typeof Dialog>, 'aria-label' | 'aria-labelledby' | 'onClose'>
) {
  const { isOpen, onClose, onOpen } = useDialog(props.isOpen);

  return (
    <>
      <button onClick={onOpen}>Open dialog</button>
      <Dialog {...props} aria-label="Example dialog" isOpen={isOpen} onClose={onClose} />
    </>
  );
}

describe('Dismissable dialog', () => {
  it('may be opened and closed', async () => {
    render(<ExampleDialog>Dialog contents</ExampleDialog>);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Open dialog' }));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Close' }));

    await waitForElementToBeRemoved(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('may have a title', () => {
    render(
      <ExampleDialog isOpen={true} title="Example title">
        Dialog contents
      </ExampleDialog>
    );

    const dialog = screen.getByRole('dialog');

    expect(within(dialog).getByRole('heading', { name: 'Example title' })).toBeInTheDocument();
  });

  it('may omit the title', () => {
    render(<ExampleDialog isOpen={true}>Dialog contents</ExampleDialog>);

    const dialog = screen.getByRole('dialog');

    expect(within(dialog).queryByRole('heading')).not.toBeInTheDocument();
  });

  it('can be dismissed by clicking on the overlay', async () => {
    render(<ExampleDialog isOpen={true}>Dialog contents</ExampleDialog>);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    userEvent.click(screen.getByRole('dialog').parentNode as Element);

    await waitForElementToBeRemoved(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('Non-dismissable dialog', () => {
  it('has no close button', () => {
    render(
      <ExampleDialog isDismissable={false} isOpen={true}>
        Dialog contents
      </ExampleDialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    expect(within(dialog).queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

  it('cannot be dismissed by clicking on the overlay', async () => {
    render(
      <ExampleDialog isDismissable={false} isOpen={true}>
        Dialog contents
      </ExampleDialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    userEvent.click(screen.getByRole('dialog').parentNode as Element);

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });
});
