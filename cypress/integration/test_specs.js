describe('The Home Page', function() {
    it('successfully loads', function() {
      cy.visit('/') // change URL to match your dev URL
    })
  })

describe('Check shop link', function() {
    it('clicking "shop" navigates to a new url', function() {
        cy.visit('/')

        cy.contains('SHOP').click()

        // Should be on a new URL which includes '/commands/actions'
        cy.url().should('include', '/shop')
    })
})

