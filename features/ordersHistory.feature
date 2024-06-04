Feature: Histórico de Pedidos

    Como um cliente,
    Eu quero ver o histórico dos meus pedidos,
    Para que eu possa acompanhar minhas compras anteriores


Scenario: Exibir todos os pedidos no histórico
    Given O usuário do tipo "Cliente" de id “123” está logado no sistema
    And Há exatamente 3 pedidos associados ao cliente de id “123”
    And Há um pedido de id “1” associado ao usuário de Id “123” com data de criação “10/05/2024”, nome “bota marrom” e status “CONCLUDED”
    And Há um pedido de id “2” associado ao usuário de Id “123” com data de criação “10/08/2024”, nome “tênis cinza” e status “CANCELED”
    And Há um pedido de id “3” associado ao usuário de Id “123” com data de criação “10/11/2024”, nome “sapato vermelho” e status “PROCESSING”
    When o usuário acessa a página de histórico de pedidos
    Then A tela exibe uma lista com apenas os pedidos de id “3”, com data de criação “10/11/2024”, nome “sapato vermelho” e status “PROCESSING”; de id “2” com data de criação “10/08/2024”, nome “tênis cinza” e status “CANCELED”; de id “1” com data de criação “10/05/2024”, nome “bota marrom” e status “CONCLUDED”

Scenario: Exibir detalhes do pedido 
    Given O usuário do tipo "Cliente" de id “123” está logado no sistema
    And o usuário está na página "histórico de pedidos"
    And há um pedido associado ao cliente de id “123” com id “1”, data de criação “10/05/2024” e preço total “530,00” possuindo um item de nome “tênis de corrida” com quantidade “3” e preço resultante “330,00” e um um item de nome “tênis azul” com quantidade “2” e preço resultante “200,00”
    When o usuário clica no pedido de id “1”
    Then A tela exibe a descrição do pedido com id “1”, id do cliente “123”, data de criação “10/05/2024”, preço total “530,00” e uma lista de itens do pedido com o item de nome “tênis de corrida” com quantidade “3” e preço resultante “330,00” e um um item de nome “tênis azul” com quantidade “2” e preço resultante “200,00”

Scenario: Histórico de pedidos vazio
    Given O usuário do tipo "Cliente" de id “123” está logado no sistema
	And há exatamente 0 pedidos associados ao id de usuário “123”
	When o usuário acessa a página de histórico de pedidos
    Then deve ser exibida a mensagem “não há pedidos no histórico.”

Scenario: Buscar histórico de pedidos através de texto livre por nome do produto
    Given O usuário do tipo "Cliente" de id “123” está logado no sistema
    And o usuário está na página "histórico de pedidos"
    And há um pedido associado ao cliente de id “123” com id “1”, data de criação “10/05/2024” e status “CONCLUDED” possuindo um item de nome “tênis de corrida” e um um item de nome “tênis azul”
    And há um pedido associado ao cliente de id “123” com id “2”, data de criação “10/08/2024” e status “CONCLUDED” possuindo um item de nome “tênis de corrida” e um um item de nome “tênis vermelho”
    And há um pedido associado ao cliente de id “123” com id “3”, data de criação “10/10/2024” e status “CONCLUDED” possuindo um item de nome “tênis azul”
    When o usuário filtra por produto "tênis azul"
    Then A tela exibe uma lista com apenas os pedidos de id “3”, data de criação “10/10/2024” e status “CONCLUDED” e de id “1”, data de criação “10/05/2024” e status “CONCLUDED”

Scenario: Nenhuma ocorrência ao buscar histórico de pedidos através de texto livre por nome do produto
    Given O usuário do tipo "Cliente" de id “123” está logado no sistema
    And o usuário está na página "histórico de pedidos"
    And há apenas um pedido associado ao usuário de id “123”
    And há um pedido associado ao cliente de id “123” com id “1”, data de criação “10/08/2024” e status “CONCLUDED” possuindo um único item de nome “tênis de corrida”
    When o usuário filtra por produto "tênis azul"
    Then deve ser exibida uma mensagem indicando “não há pedidos para o produto "tênis azul"”

Scenario: Buscar histórico de pedidos por nome do produto com substring
    Given O usuário do tipo "Cliente" de id “123” está logado no sistema
    And o usuário está na página "histórico de pedidos"
    And há um pedido associado ao cliente de id “123” com id “1”, data de criação “10/05/2024” e status “CONCLUDED” possuindo um item de nome “tênis de corrida” e um um item de nome “tênis azul”
    And há um pedido associado ao cliente de id “123” com id “2”, data de criação “10/08/2024” e status “CONCLUDED” possuindo um item de nome “bota de couro” e um um item de nome “sapato marrom”
    And há um pedido associado ao cliente de id “123” com id “3”, data de criação “10/10/2024” e status “CONCLUDED” possuindo apenas um item de nome “tênis azul”
    When o usuário filtra por produto "tênis"
    Then A tela exibe uma lista com apenas os pedidos de id “3”, data de criação “10/10/2024” e status “CONCLUDED” e de id “1”, data de criação “10/05/2024” e status “CONCLUDED”
