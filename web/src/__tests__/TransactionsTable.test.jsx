import { describe, test, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import TransactionsTable from '../TransactionsTable';

describe('<TransactionsTable />', () => {
  test('Component mounts properly', () => {
    
    //Verify that the whole component renders
    const wrapper = render(<TransactionsTable />);
    expect(wrapper).toBeTruthy();

    // Get by h1
    const h1 = wrapper.container.querySelector('h1');
    expect(h1?.textContent).toBe('Blockchain Transactions');
  });

  test('renders TransactionsTable component with initial state', () => {
    render(<TransactionsTable />);

    // Verify that the table is rendered
    const table = screen.getByRole('table');
    expect(table).toBeTruthy();

    // Verify that the initial headings are rendered
    const headings = screen.getAllByRole('columnheader');
    expect(headings).toHaveLength(3); // Adjust the length based on the actual number of headings
  });

  test('renders the component with inputs and labels', () => {
    render(<TransactionsTable />);

    // Verify the existence of the labels
    expect(screen.getByLabelText('From Address:')).toBeTruthy();
    expect(screen.getByLabelText('To Address:')).toBeTruthy();
    expect(screen.getByLabelText('Above Value:')).toBeTruthy();
    expect(screen.getByLabelText('Below Value:')).toBeTruthy();
    expect(screen.getByLabelText('Limit:')).toBeTruthy();
    expect(screen.getByLabelText('Offset:')).toBeTruthy();

    // Verify the existence of the input elements
    expect(screen.getByRole('textbox', { name: 'From Address:' })).toBeTruthy();
    expect(screen.getByRole('textbox', { name: 'To Address:' })).toBeTruthy();
    expect(screen.getByRole('textbox', { name: 'Above Value:' })).toBeTruthy();
    expect(screen.getByRole('textbox', { name: 'Below Value:' })).toBeTruthy();
    expect(screen.getByRole('spinbutton', { name: 'Limit:' })).toBeTruthy();
    expect(screen.getByRole('spinbutton', { name: 'Offset:' })).toBeTruthy();
  });
});

