#language: pt

#quando adiciono a anotação acima posso mudar as palavras chaves para português
#Feature: Login

#Scenario: Login do cliente

Funcionalidade: Login

Cenario: Login do cliente

    Dado que tenho o seguinte usuário:
        |name      |Rodrigo                |   
        |email     |rodrigo.rcs@gmail.com  |                
        |password  |123456                 |  
        |is_shaver |false                  |
    E que acesso o totem
    Quando submeto essas credenciais
    Então sou autenticado com sucesso


Cenario: Senha incorreta

    Dado que tenho o seguinte usuário:
        |name      |Rodrigo                |   
        |email     |rodrigo.rcs@gmail.com  |                
        |password  |abc123                 |  
        |is_shaver |false                  |
    E que esse usuário tenha a senha incorreta
    E que acesso o totem
    Quando submeto essas credenciais
    Então devo ver a mensagem de alerta "Ocorreu um erro ao fazer login, verifique suas credenciais."