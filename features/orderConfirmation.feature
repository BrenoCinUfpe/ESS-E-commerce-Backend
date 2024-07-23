Feature: Confirmação de Pedido

  Scenario: Envio de email de confirmação após criação de um pedido
    Given que um novo pedido é criado com o email "test@example.com"
    When o pedido é processado
    Then um email deve ser enviado para "test@example.com" com o assunto "Confirmação de Pedido"

  Scenario: Falha no envio de email após criação de um pedido
    Given que um novo pedido é criado com o email "test@example.com"
    And o envio de email falha
    When o pedido é processado
    Then uma exceção deve ser lançada com a mensagem "Falha ao enviar o email"

  Scenario: cancelamento de pedido negado
    Given cliente "test@example.com" e ID "1"
    When cancelamento solicitado
    Then uma exceção deve ser lançada com a mensagem "Falha ao cancelar"

  Scenario: cancelamento de pedido 
    Given cliente "test@example.com" e ID "1"
    When cancelamento solicitado
    Then a mensagem "Cancelamento realizado com sucesso"
  