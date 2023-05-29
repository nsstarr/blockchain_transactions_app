/* eslint-disable */
describe('Transactions Table', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/'); 
  });

  it('should display the table', () => {
    cy.get('table').should('exist'); 
  });

  it('should display the correct number of rows', () => {
    cy.get('tbody tr').should('have.length', 100); 
  });

  it('should display transaction details in each row', () => {
    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('td:nth-child(1)').should('exist'); 
        cy.get('td:nth-child(2)').should('exist'); 
        cy.get('td:nth-child(3)').should('exist'); 
      });
    });
  });

  it('should allow filtering transactions by address', () => {
    const fromAddress = '0xb4e9ebefb3d41eb2cbbdef6407f816e682392b37'; 
    const toAddress = '0x693c188e40f760ecf00d2946ef45260b84fbc43e'; 

    cy.get('#fromAddress').type(fromAddress); 
    cy.get('#toAddress').type(toAddress); 
    cy.get('form').submit();

    // Assert that the filtered transactions are displayed
    cy.get('tbody tr').should('have.length', 3); 
  });
});