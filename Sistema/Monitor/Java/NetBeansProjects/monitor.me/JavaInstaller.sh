#!/bin/bash

PURPLE='0;35'
NC='/033[0m' 
VERSAO=8
	
echo  "$(tput setaf 6)[Monitor Me]:$(tput setaf 7)  Verificando aqui se você possui o Java instalado...;"

java -version
if [ $? -eq 0 ]
	then
		echo "$(tput setaf 6)[Monitor Me]:$(tput setaf 7)  Verificando aqui se você possui o Java instalado..."
	else
		echo "$(tput setaf 6)[Monitor Me]:$(tput setaf 7)  putz! percebi que não há nenhuma versao do Java em sua maquina "
		echo "$(tput setaf 6)[Monitor Me]:$(tput setaf 7)  Confirme para mim se realmente deseja instalar o Java (S/N)?"
	read inst
	if [ \"$inst\" == \"s\" ]
		then
			echo "$(tput setaf 6)[Monitor Me]:$(tput setaf 7)  Ok! Parece que quer installar o Java :)"
			echo "$(tput setaf 6)[Monitor Me]:$(tput setaf 7)  Adicionando o repositório!"
			sleep 2
			add-apt-repository ppa:webupd8team/java -y
			clear
			echo "$(tput setaf 6)[Monitor Me]:$(tput setaf 7)  Atualizando! Quase lá."
			sleep 2
			apt-get update -y
			clear
			
			if [ $VERSAO -eq 8 ]
				then
					echo "$(tput setaf 6)[Monitor Me]:$(tput setaf 7) Preparando para instalar a versão 8 do Java. Confirme a instalação quando solicitado :)"
					apt install default-jre ; apt install openjdk-8-jre-headless; -y
					clear
					echo "$(tput setaf 6)[Monitor Me]:$(tput setaf 7) parece que o Java foi instalado com sucesso!"
					echo "$(tput setaf 6)[Monitor Me]:$(tput setaf 7) espero que aproveito de seu uso com ele :)"
				fi
		else 	
		echo "$(tput setaf 6)[Monitor Me]:$(tput setaf 7)  Você optou por não instalar o Java por enquanto, até a próxima então!"
	fi
fi
