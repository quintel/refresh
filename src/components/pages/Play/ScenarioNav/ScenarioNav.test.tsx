import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ScenarioNav from '.';

describe('ScenarioNav', () => {
  it('renders a nav for an unsaved scenario', () => {
    render(<ScenarioNav areaName="Netherlands" endYear={2050} isAdmin={false} />);

    // Shows information about the scenario.
    expect(screen.getByText('Netherlands')).toBeInTheDocument();
    expect(screen.getByText('2050')).toBeInTheDocument();

    // Open the actions menu.
    userEvent.click(screen.getByRole('button', { name: 'Actions' }));

    const actions = screen.getByRole('menu');

    expect(within(actions).getByRole('menuitem', { name: 'Save scenario' })).toBeInTheDocument();

    expect(
      within(actions).queryByRole('menuitem', { name: 'Save scenario as' })
    ).not.toBeInTheDocument();
  });

  it('renders a nav for a saved scenario', () => {
    render(
      <ScenarioNav
        areaName="Netherlands"
        endYear={2050}
        isAdmin={false}
        savedScenario={{ id: 10, title: 'My scenario' }}
      />
    );

    // Shows information about the scenario.
    expect(screen.getByText('Netherlands')).toBeInTheDocument();
    expect(screen.getByText('2050')).toBeInTheDocument();

    // Open the actions menu.
    userEvent.click(screen.getByRole('button', { name: 'Actions' }));

    const actions = screen.getByRole('menu');

    expect(
      within(actions).queryByRole('menuitem', { name: 'Save scenario' })
    ).not.toBeInTheDocument();

    expect(within(actions).getByRole('menuitem', { name: 'Save scenario as' })).toBeInTheDocument();
  });
});

describe('ScenarioNav as a non-admin', () => {
  it('does not render a link to ETEngine', () => {
    render(<ScenarioNav areaName="Netherlands" endYear={2050} isAdmin={false} />);

    // Open the actions menu.
    userEvent.click(screen.getByRole('button', { name: 'Actions' }));

    expect(
      within(screen.getByRole('menu')).queryByRole('menuitem', { name: 'Open in ETEngine' })
    ).not.toBeInTheDocument();
  });
});

describe('ScenarioNav as an admin', () => {
  it('renders link to ETEngine', () => {
    render(<ScenarioNav areaName="Netherlands" endYear={2050} isAdmin={true} />);

    // Open the actions menu.
    userEvent.click(screen.getByRole('button', { name: 'Actions' }));

    expect(
      within(screen.getByRole('menu')).queryByRole('menuitem', { name: 'Open in ETEngine' })
    ).toBeInTheDocument();
  });
});
