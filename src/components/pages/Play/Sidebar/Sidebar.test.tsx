import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Sidebar from '.';

describe('Sidebar', () => {
  it('renders an empty sidebar', () => {
    render(<Sidebar items={[]} />);

    // Renders the wrapper.
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Renders no buttons or links.
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders a sidebar with a single top-level item', () => {
    render(<Sidebar items={[{ key: 'hello', items: [] }]} />);

    expect(screen.queryByRole('button', { name: 'hello' })).not.toBeInTheDocument();
  });

  it('renders a sidebar with a single two-level item', () => {
    render(<Sidebar items={[{ key: 'hello', items: [{ key: 'world' }] }]} />);

    const section = screen.getByRole('button', { name: 'hello' });
    const item = screen.getByRole('link', { name: 'world' });

    expect(section).toBeInTheDocument();
    expect(section).not.toHaveAttribute('aria-current');

    expect(item).toBeInTheDocument();
    expect(item).toHaveAttribute('aria-current', 'page');
  });

  it('renders a sidebar with a single three-level item', () => {
    render(
      <Sidebar items={[{ key: 'one', items: [{ key: 'two', items: [{ key: 'three' }] }] }]} />
    );

    const section = screen.getByRole('button', { name: 'one' });
    const outerItem = screen.getByRole('link', { name: 'two' });
    const innerItem = screen.getByRole('link', { name: 'three' });

    expect(section).toBeInTheDocument();
    expect(section).not.toHaveAttribute('aria-current');

    expect(outerItem).toBeInTheDocument();
    expect(outerItem).toHaveAttribute('aria-current', 'page');

    expect(innerItem).toBeInTheDocument();

    // The third-level item is not active. When the user does not specify the current active path,
    // the component marks as active the first non-section item.
    expect(innerItem).not.toHaveAttribute('aria-current');
  });

  it('renders a sidebar with two sections, each with an item', () => {
    render(
      <Sidebar
        items={[
          { key: 'hello', items: [{ key: 'world' }] },
          { key: 'good', items: [{ key: 'bye' }] },
        ]}
      />
    );

    // Renders the wrapper.
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    const firstSection = screen.getByRole('button', { name: 'hello' });

    // Renders the first section.
    expect(firstSection).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'world' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'world' })).toHaveAttribute('aria-current', 'page');

    // Renders the second section.
    expect(screen.getByRole('button', { name: 'good' })).toBeInTheDocument();

    // The second item is not in the document because it is in a hidden accordion panel.
    expect(screen.queryByRole('link', { name: 'bye' })).not.toBeInTheDocument();
  });

  it('allows interacting with buttons and links', () => {
    render(
      <Sidebar
        items={[
          { key: 'hello', items: [{ key: 'world' }] },
          { key: 'good', items: [{ key: 'bye' }] },
        ]}
      />
    );

    // The second item is not in the document because it is in a hidden accordion panel.
    expect(screen.queryByRole('link', { name: 'bye' })).not.toBeInTheDocument();

    // Clicking on the second section hides the first section items and shows the second.
    userEvent.click(screen.getByRole('button', { name: 'good' }));

    expect(screen.queryByRole('link', { name: 'world' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'bye' })).toBeInTheDocument();

    // Clicking on "bye" makes it active.
    expect(screen.getByRole('link', { name: 'bye' })).not.toHaveAttribute('aria-current');
    userEvent.click(screen.getByRole('link', { name: 'bye' }));
    expect(screen.getByRole('link', { name: 'bye' })).toHaveAttribute('aria-current', 'page');
  });

  it('accepts a custom default path', () => {
    render(
      <Sidebar
        items={[
          { key: 'hello', items: [{ key: 'world' }] },
          { key: 'good', items: [{ key: 'bye' }] },
        ]}
        defaultActivePath={['good', 'bye']}
      />
    );

    const item = screen.getByRole('link', { name: 'bye' });

    expect(item).toBeInTheDocument();
    expect(item).toHaveAttribute('aria-current', 'page');
  });

  it('accepts onChange when in uncontrolled mode', () => {
    const onChange = jest.fn();

    render(
      <Sidebar
        items={[
          { key: 'hello', items: [{ key: 'world' }] },
          { key: 'good', items: [{ key: 'bye' }] },
        ]}
        onChange={onChange}
      />
    );

    // Clicking on "bye" does not change the state of the component
    userEvent.click(screen.getByRole('button', { name: 'good' }));
    userEvent.click(screen.getByRole('link', { name: 'bye' }));

    // The onChange function has been called with the new desired path.
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual(['good', 'bye']);
  });

  it('can be used in controlled mode', () => {
    const onChange = jest.fn();

    render(
      <Sidebar
        items={[
          { key: 'hello', items: [{ key: 'world' }] },
          { key: 'good', items: [{ key: 'bye' }] },
        ]}
        onChange={onChange}
        activePath={['good', 'bye']}
      />
    );

    expect(screen.getByRole('link', { name: 'bye' })).toBeInTheDocument();

    // Clicking on "bye" does not change the state of the component
    userEvent.click(screen.getByRole('button', { name: 'hello' }));
    userEvent.click(screen.getByRole('link', { name: 'world' }));

    expect(screen.getByRole('link', { name: 'world' })).not.toHaveAttribute('aria-current');

    // The onChange function has been called with the new desired path.
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual(['hello', 'world']);
  });

  it('renders a sidebar item with a bar', () => {
    render(
      <Sidebar
        items={[
          {
            key: 'hello',
            items: [
              { key: 'world', bar: { title: 'Percentage of total', value: '50%', width: 50 } },
            ],
          },
          { key: 'good', items: [{ key: 'bye' }] },
        ]}
      />
    );

    const bar = screen.getByTitle('Percentage of total');

    expect(bar).toBeInTheDocument();
    expect(bar).toHaveTextContent('50%');
    expect(bar).toHaveStyle({ '--bar-width': '50%' });
  });

  it('renders a sidebar item with a bar and sub-items', () => {
    render(
      <Sidebar
        items={[
          {
            key: 'hello',
            items: [
              {
                key: 'world',
                bar: { title: 'Percentage of total', value: '50%', width: 50 },
                items: [{ key: 'today' }],
              },
            ],
          },
          { key: 'good', items: [{ key: 'bye' }] },
        ]}
      />
    );

    const bar = screen.getByTitle('Percentage of total');

    expect(bar).toBeInTheDocument();
    expect(bar).toHaveTextContent('50%');
    expect(bar).toHaveStyle({ '--bar-width': '50%' });
  });

  it('prevents a bar from being more than 100% wide', () => {
    render(
      <Sidebar
        items={[
          {
            key: 'hello',
            items: [{ key: 'world', bar: { title: 'Total', value: '50%', width: 500 } }],
          },
        ]}
      />
    );

    const bar = screen.getByTitle('Total');

    expect(bar).toBeInTheDocument();
    expect(bar).toHaveTextContent('50%');
    expect(bar).toHaveStyle({ '--bar-width': '100%' });
  });

  it('prevents a bar from being less than 0% wide', () => {
    render(
      <Sidebar
        items={[
          {
            key: 'hello',
            items: [{ key: 'world', bar: { title: 'Total', value: '50%', width: -5 } }],
          },
        ]}
      />
    );

    const bar = screen.getByTitle('Total');

    expect(bar).toBeInTheDocument();
    expect(bar).toHaveTextContent('50%');
    expect(bar).toHaveStyle({ '--bar-width': '0%' });
  });
});
