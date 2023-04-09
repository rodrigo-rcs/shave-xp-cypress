import loginPage from '../support/pages/views/login'
import shaversPage from '../support/pages/views/shavers'

import data from '../fixtures/users-login.json'


describe('login', () => {



    context('quando eu submeto o formulário', () => {


        it('Deve logar com sucesso', () => {

/*            cy.fixture('users').then(function(data){
                loginPage.submit(data.email, data.password)
                shaversPage.header.userShouldLoggedIn(data.name)
            })
*/
            //dado que eu tenho um usuário 
            const user = data.success

            cy.createUser(user)

            //quando faço login com esse usuário 
            loginPage.submit(user.email, user.password)

            //então sou autenticado 
            shaversPage.header.userShouldLoggedIn(user.name)

        })

        it('não deve logar com senha incorreta', () => {

            const user = data.invpass

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.shared.noticeErrorShouldBe(message)

        })


        it('não deve logar com email não cadastrado', () => {

            const user = data.email404

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.shared.noticeErrorShouldBe(message)

        })


        it('campos obrigatórios', () => {

            loginPage.submit()

            const message = 'E-mail é obrigatório'
            const messagesenha = 'Senha é obrigatória'

            loginPage.requiredFields(message, messagesenha)

        })

    })

    context('senha muito curta', () => {
            
        data.shortpass.forEach((p) => {
            it(`não deve logar com a senha: ${p}`, () => {
                loginPage.submit('rodrigo.rcs@gmail.com', p)
                const message = 'Pelo menos 6 caracteres'
                loginPage.shared.alertShouldBe(message)
            })
        })

    })

    context('email no formato incorreto', () => {

         data.invemails.forEach((e) => {
            it(`não deve logar com a senha: ${e}`, () => {
                loginPage.submit(e, '123456')
                const message = 'Informe um email válido'
                loginPage.shared.alertShouldBe(message)
            })
        })

    })


})