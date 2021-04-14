import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from '.';

describe('Header as a guest user', () => {
  it('renders buttons specific to guests', () => {
    render(<Header locale="en" />);

    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });

  it('renders a drop-down for the locale when English is selected', () => {
    render(<Header locale="en" />);

    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Nederlands' })).not.toBeInTheDocument();
  });

  it('renders a drop-down for the locale when Dutch is selected', () => {
    render(<Header locale="nl" />);

    expect(screen.getByRole('button', { name: 'Nederlands' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'English' })).not.toBeInTheDocument();
  });

  it('does not render links for signed-in users', () => {
    render(<Header locale="en" />);

    expect(screen.queryByRole('button', { name: 'My scenarios' })).not.toBeInTheDocument();
  });
});

describe('Header as a registered user', () => {
  const renderHeader = () => {
    render(<Header locale="en" user={{ isAdmin: false, name: 'Bob Belcher ' }} />);
  };

  it("doesn't render buttons for guests", () => {
    renderHeader();

    expect(screen.queryByRole('button', { name: 'Log in' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Sign up' })).not.toBeInTheDocument();
  });

  it('renders links to the user scenarios', () => {
    renderHeader();

    expect(screen.getByRole('button', { name: 'My scenarios' })).toBeInTheDocument();
  });

  it('renders a drop-down with the user options', () => {
    renderHeader();

    expect(screen.getByRole('button', { name: 'Bob Belcher' })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Bob Belcher' }));

    const userMenu = screen.getByRole('menu');

    expect(within(userMenu).getByRole('menuitem', { name: 'My account' })).toBeInTheDocument();
    expect(within(userMenu).getByRole('menuitem', { name: 'Sign out' })).toBeInTheDocument();
    expect(within(userMenu).queryByRole('menuitem', { name: 'Admin' })).not.toBeInTheDocument();
  });
});

describe('Header as an admin', () => {
  const renderHeader = () => {
    render(<Header locale="en" user={{ isAdmin: true, name: 'Bob Belcher ' }} />);
  };

  it('renders a drop-down with the user options, including admin options', () => {
    renderHeader();

    expect(screen.getByRole('button', { name: 'Bob Belcher' })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Bob Belcher' }));

    const userMenu = screen.getByRole('menu');

    expect(within(userMenu).getByRole('menuitem', { name: 'My account' })).toBeInTheDocument();
    expect(within(userMenu).getByRole('menuitem', { name: 'Sign out' })).toBeInTheDocument();
    expect(within(userMenu).getByRole('menuitem', { name: 'Admin' })).toBeInTheDocument();
  });
});
