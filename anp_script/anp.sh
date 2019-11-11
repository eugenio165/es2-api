#!/bin/bash
#
# PARA USAR
#./anp.sh IP_POSTGRE CODIGO_SEMANA
#
#É POSSIVEL FAZER UM POST RESQUEST NO ENDPOINT preco.anp.gov.br/include/Relatorio_Excel_Resumo_Por_Municipio_Posto.asp, quantas vezes quiser com a mesma ASPSESSIONID.
#NO CORPO DO REQUEST AS INFORMAÇÕES REALMENTE NECESSARIAS PARA GERAR A TABELA SÃO:CODIGO DA SEMANA, CODIGO CIDADE, COD COMBUSTIVEl
#
#
#1052=19-23/agosto/2019
#1064

DB_USER='admin'
DB_PWD='rodamais'
DB_SERVER="$1"
DB_NAME='rodamais'


codigo_semana="$2"
#codigo_semana=1064
rm -f -r teste 
rm -f -r tratado
mkdir teste
mkdir tratado
rm POSTOS
rm COMBUSTIVEIS
rm temp
rm COMBUSTIVEIS_TEMP
rm TEMP_DATA
rm POSTOS2
rm TEMP_AUX
rm QUERY_COMBUSTIVEIS2

send_to_database(){
	psql "postgresql://$DB_USER:$DB_PWD@$DB_SERVER/$DB_NAME" -f QUERY_POSTOS
	psql "postgresql://$DB_USER:$DB_PWD@$DB_SERVER/$DB_NAME" -f QUERY_COMBUSTIVEIS
}

txt_to_query(){
		sed -i -e "s/:/\'\,\'/g" -e "s/^/ \(\'/" -e  "s/$/\'\)\,/" POSTOS #CONVERTE PARA QUERY
		sed -i -e "s/:/\'\,\'/g" -e "s/^/ \(\'/" -e "s/$/\'\)\,/" -e '$ s/\,$/\;/' COMBUSTIVEIS #CONVERTE PARA QUERY
		sed -i -e "s/'''/'/g" -e "s/a''/a'/" POSTOS #GAMBIARRA NECESSARIA PARA CORRIGIR ALGUMAS COLUNAS QUE ESTAVAM FORA DO PADRÃO
		grep --text " ('[0-9]" POSTOS >> POSTOS2 ; rm POSTOS; mv POSTOS2 POSTOS
		echo 'INSERT INTO combustiveis (id, "postoId", nome, preco, data)' > QUERY_COMBUSTIVEIS
		echo 'INSERT INTO postos (id,nome,endereco,bairro,bandeira,cidade)' > QUERY_POSTOS
		echo 'VALUES' >> QUERY_COMBUSTIVEIS
		echo 'VALUES' >> QUERY_POSTOS
		cat POSTOS >> QUERY_POSTOS
		sed -i "s/('/\(default,'/" COMBUSTIVEIS
		grep -iv  "''" COMBUSTIVEIS | grep  "default\,'[0-9]" >> QUERY_COMBUSTIVEIS #ELIMINA UM ERRO
		sed -i '$s/,$/;/' QUERY_COMBUSTIVEIS
		sed -i '$s/,$/;/' QUERY_POSTOS
		iconv -f ISO-8859-1 -t UTF-8 QUERY_POSTOS > QUERY_POSTOS2 ; rm QUERY_POSTOS;mv QUERY_POSTOS2 QUERY_POSTOS ;
		iconv -f ISO-8859-1 -t UTF-8 QUERY_COMBUSTIVEIS > QUERY_COMBUSTIVEIS2 ; rm QUERY_COMBUSTIVEIS;mv QUERY_COMBUSTIVEIS2 QUERY_COMBUSTIVEIS;
}

download () { #FUNÇÃO RESPONSAVEL PELO DOWNLOAD, E TRATAMENTO INICIAL DOS DADOS
for numero_combustivel in {487,643,476,532,812} #LOOP QUE VARIA O NUMERO/NOME DO COMBUSTIVEL
	do 	

	cat codCidade-sorted | while read x	#LOOP QUE VARIA COD MUNICIPIP E DESC MUNICIPIO, ESTAO NO ARQUIVO EXTERNO, USANDO * COMO DELIMITADOR ENTRE COD E CIDADE.
		do nome_cidade=$(echo $x | awk -F '[:]' '{print$2}')
		   numero_cidade=$(echo $x | awk -F '[:]' '{print$1}')
		   echo "$nome_cidade"
		   #echo "$numero_cidade"
		curl 'http://preco.anp.gov.br/include/Relatorio_Excel_Ultimas_Coletas_Posto.asp' -H 'Connection: keep-alive' -H 'Cache-Control: max-age=0' -H 'Origin: https://preco.anp.gov.br' -H 'Upgrade-Insecure-Requests: 1' -H 'Content-Type: application/x-www-form-urlencoded' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' -H 'Sec-Fetch-Mode: navigate' -H 'Sec-Fetch-User: ?1' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3' -H 'Sec-Fetch-Site: same-origin' -H 'Referer: https://preco.anp.gov.br/include/Resumo_Ultimas_Coletas_Posto.asp' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.9' -H 'Cookie: ASPSESSIONIDSUDSBSDQ=CDDDLHIAGMBKBPLAJEOLDMOP; _ga=GA1.3.1048056474.1568250677; _gid=GA1.3.1423256710.1568250677; _gat_gtag_UA_141823641_1=1' --data 'btnSalvar=Exportar&COD_SEMANA='"$codigo_semana"'&COD_COMBUSTIVEL='"$numero_combustivel"'&COD_MUNICIPIO='"$numero_cidade"'&DESC_MUNICIPIO='"$nome_cidade"'&BAIRRO=0' --compressed --insecure |  grep --text ' <td  class=lincol valign=center >' | sed "s/:/./g" | sed "s|</td></tr><td class='color_line1' class=lincol valign=center >|\n|g" |sed "s|</td></tr><td  class=lincol valign=center >|\n|g"| sed -e 's/<[^>]*>/:/g' |  sed "s/ \://g"  | sed "s/::/:/g"| grep --text -iv error | awk -F '[:]' '{print $1":"$2":"$3":"$4":"$5":"$9}' | tee teste/$numero_combustivel-$numero_cidade-$codigo_semana;
		done
	done
}

gerar_id(){
	rm id_endereco
	awk -F '[:]' '{print$2}' teste/* | sort -u | tee temp #PERCORRE TODOS OS DADOS BAIXADOS, EXTRAI SOMENTE A SEGUNDA COLUNA, ORNDENA E DELETA OS REPETIDOS
	aux=1;cat temp | while read line;do echo "$aux":"$line" >> id_endereco;aux=$((aux + 1));done # ATRIBUI UM ID PARA CADA COLUNA
	echo "IDs gerados e salvos no arquivo id_endereço"  	
}


	append_id(){ # FAZ O TRATAMENTO FINAL DOS DADOS, CRIANDO AS DUAS TABELAS
	ls teste -1a | while read arquivo
		do
		aux_num_combustivel=$(echo "$arquivo" | cut -d '-' -f 1 )	
		aux_num_cidade=$(echo "$arquivo" | cut -d '-' -f 2)
		nome_cidade=$(grep --text ^"$aux_num_cidade": codCidade-sorted | awk -F ':' '{print $2 }') # faz a pesquisa no arquivo cod_cidade linhas que comecem com o valor e :, e retorna a segunda coluna
		nome_combustivel=$(printf '%s\n' "$aux_num_combustivel"| sed -e "s/487/GASOLINA/" -e "s/643/ETANOL/" -e "s/476/GNV/" -e "s/532/DIESEL/" -e "s/812/DIESEL S10/")
			
			cat teste/$arquivo | while read line
				do	
					endereco=$(printf '%s\n' "$line" | awk -F ':' '{print $2}' | sed -e 's/^[ ]*//' -e 's/[[:blank:]]*$//' )
					
					#printf '%s\n' "$endereco"
					
					id_posto=$(grep -F --text "$endereco" id_endereco| grep --text "$endereco"$ |  awk -F ':' '{print $1}') # O SEGUNDO GREP É NECESSARIO, POIS O PRIMEIRO RETORNA MAIS DE UM RESULTADO EM ALGUNS DOS CASOS (QUANDO TODO O ENDEREÇO DE UM POSTO É SUBSTRING DE ENDEREÇO D OUTRO POSTO)


			#		printf '%s\n' "$nome_combustivel"
					echo "$id_posto":"$line":"$nome_cidade":"$nome_combustivel" | tee  -a tratado/all
				done

		done
		cat tratado/all | awk -F ':' '{print$1":"$2":"$3":"$4":"$5":"$8}' >> POSTOS
		cat tratado/all | awk -F ':' '{print$1":"$9":"$6":"$7}' >> COMBUSTIVEIS
		cat COMBUSTIVEIS | cut -d ':' -f 4 | awk -F '/' '{print $3"-"$2"-"$1}' | tee TEMP_DATA #TRATA COLUNA TABELA E SALVA EM UM ARQUIVO TEMPORARIO


		cut -d ':' -f 1,2,3 COMBUSTIVEIS >> COMBUSTIVEIS_TEMP
		paste -d ':' COMBUSTIVEIS_TEMP TEMP_DATA > COMBUSTIVEIS #SOBRESCREVE A TABELA COMBUSTIVEISV
		sort -u POSTOS >> TEMP_AUX ; rm POSTOS ; mv TEMP_AUX POSTOS # REMOVER POSTOS REPETIDOS
		sed -i -e "s/\,/\./" COMBUSTIVEIS # SUB ,->. 
		sed -i "s/'//g" POSTOS
	}

download && gerar_id && append_id && txt_to_query && send_to_database
