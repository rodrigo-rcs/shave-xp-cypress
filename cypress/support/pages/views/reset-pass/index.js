

class ResetPassPage {

    go(token) {
        cy.visit('/reset-password?token=' + token)

        cy.get('form h1')
            .should('have.text', 'Resetar senha')
    }

    submit(newpass,confirmPass) {
        cy.get('input[placeholder="Nova senha"]')
            .type(newpass)
        cy.get('input[placeholder="Confirmação da senha"]')
            .type(confirmPass)  
            
        cy.contains('button', 'Alterar senha')
            .click()
    }

    noticeShouldBe(expectedText) {
        cy.get('.notice p', { timeout: 10000 })
            .should('be.visible')
            .should('have.text', expectedText)
    }

}

export default new ResetPassPage()