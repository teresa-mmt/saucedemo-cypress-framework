describe('Load more products', () => {

    it('should show 3 products after clicking load more', () => {

        cy.visit('/products')

        cy.get('.product').then(($products) => {
            const count = $products.length

            expect(count).to.equal(2)
        })

        cy.get('#loadMore').click()

        cy.get('.product').should('have.length', 3)

    })

})