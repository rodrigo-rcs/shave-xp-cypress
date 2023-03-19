import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'


describe('login', () => {

    context('quando eu submeto o formulário', () => {


        it('Deve logar com sucesso', () => {

            const user = {
                name: 'Rodrigo',
                email: 'rodrigo.rcs@gmail.com',
                password: '123456'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldLoggedIn(user.name)

        })

        it('não deve logar com senha incorreta', () => {

            const user = {
                name: 'Rodrigo',
                email: 'rodrigo.rcs@gmail.com',
                password: 'abc456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.noticeShouldBe(message)

        })


        it('não deve logar com email não cadastrado', () => {

            const user = {
                name: 'Rodrigo',
                email: 'rodrigo.52147@gmail.com',
                password: 'abc456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.noticeShouldBe(message)

        })


        it('campos obrigatórios', () => {

            loginPage.submit()

            const message = 'E-mail é obrigatório'
            const messagesenha = 'Senha é obrigatória'

            loginPage.requiredFields(message, messagesenha)

        })

    })

    context('senha muito curta', () => {
        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p) => {
            it(`não deve logar com a senha: ${p}`, () => {
                loginPage.submit('rodrigo.rcs@gmail.com', p)
                const message = 'Pelo menos 6 caracteres'
                loginPage.alertShouldBe(message)
            })
        })

    })

    context('email no formato incorreto', () => {

        const emails = [
            'rodrigo&gmail.com',
            'rodrigo.com.br',
            '@gmail.com',
            '@',
            'rodrigo@',
            '121323',
            '@#@!#!@',
            'xpto123'
        ]

        emails.forEach((e) => {
            it(`não deve logar com a senha: ${e}`, () => {
                loginPage.submit(e, '123456')
                const message = 'Informe um email válido'
                loginPage.alertShouldBe(message)
            })
        })

    })


})