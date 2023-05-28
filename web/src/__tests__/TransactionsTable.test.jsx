import { describe, test, expect, fireEvent } from 'vitest';
import { render, screen } from '@testing-library/react';
import TransactionsTable from '../TransactionsTable';

describe('<TransactionsTable />', () => {
  test('App mounts properly', () => {
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

    // Verify that there are no transactions rendered initially
    const transactions = screen.queryAllByRole('row');
    expect(transactions).toHaveLength(1);
  });
// test('updates form input values and submits filters', () => {
//   render(<TransactionsTable />);

//   // Update form inputs
//   const fromAddressInput = screen.getByLabelText('From Address:');
//   const toAddressInput = screen.getByLabelText('To Address:');
//   const aboveValueInput = screen.getByLabelText('Above Value:');
//   const belowValueInput = screen.getByLabelText('Below Value:');
//   const limitInput = screen.getByLabelText('Limit:');
//   const offsetInput = screen.getByLabelText('Offset:')

//   // Simulate user input
//   fireEvent.change(fromAddressInput, { target: { value: 'example-from-address' } });
//   fireEvent.change(toAddressInput, { target: { value: 'example-to-address' } });
//   fireEvent.change(aboveValueInput, { target: { value: '100' } });
//   fireEvent.change(belowValueInput, { target: { value: '500' } });
//   fireEvent.change(limitInput, { target: { value: '10' } });
//   fireEvent.change(offsetInput, { target: { value: '0' } });

//   // Verify that the form inputs have updated values
//   expect(fromAddressInput.value).toBe('example-from-address');
//   expect(toAddressInput.value).toBe('example-to-address');
//   expect(aboveValueInput.value).toBe('100');
//   expect(belowValueInput.value).toBe('500');
//   expect(limitInput.value).toBe('10');
//   expect(offsetInput.value).toBe('0');

//   // Simulate form submission
//   const applyFiltersButton = screen.getByText('Apply Filters');
//   fireEvent.click(applyFiltersButton);
// });
  
});
