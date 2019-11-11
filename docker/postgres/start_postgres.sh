#!/bin/bash

#Testa se container proxy está em execução
#Carrega caso não esteja em execução

echo -e "\nCriando rede db_network";
docker network inspect db_network &>/dev/null || docker network create --driver bridge db_network;

if [[ "$(docker inspect -f "{{.State.Running}}" postgres_11_postgres_1 2>/dev/null)" = "true" ]];
then
				echo -e "\nContainer Postgres já está em execução";
else
				echo -e "\nIniciando o container Postgres";
				docker-compose up --build -d --no-recreate
				test "$(docker inspect -f "{{.State.Running}}" postgres_11_postgres_1 2> /dev/null)" = true && echo -e "\nInicialização concluída" || echo -e "\nNão foi possível inciar o container Postgres"
fi
