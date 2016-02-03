*************************************
procon.tema
*************************************

.. contents:: Conteúdo
   :depth: 2

Introdução
----------

TODO

Temas
-----------------

Capa
^^^^


Estado deste pacote
-------------------


Este produto possui testes automatizados e, a cada alteração de código
esses testes são executados pelo serviço Travis.

O estado atual dos testes pode ser visto pela imagem abaixo:

.. image:: https://travis-ci.org/prodamspsites/procon.tema.svg
    :target: https://travis-ci.org/prodamspsites/procon.tema

O estado atual da cobertyra de testes pode ser acompanhado pela imagem abaixo:

.. image:: https://coveralls.io/repos/prodamspsites/procon.tema/badge.svg
    :target: https://coveralls.io/r/prodamspsites/procon.tema 


Instalação
----------

Para habilitar a instalação deste produto em um ambiente que utilize o
buildout:

1. Editar o arquivo buildout.cfg (ou outro arquivo de configuração) e
   adicionar o pacote ``procon.tema`` à lista de eggs da instalação::

        [buildout]
        ...
        eggs =
            procon.tema

2. Após alterar o arquivo de configuração é necessário executar
   ''bin/buildout'', que atualizará sua instalação.

3. Reinicie o Plone

4. Acesse o painel de controle e na opção **Temas** você verá os temas
providos por este pacote listados.
