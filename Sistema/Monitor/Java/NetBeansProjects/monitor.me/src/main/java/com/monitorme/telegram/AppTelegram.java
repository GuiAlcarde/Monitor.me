package com.monitorme.telegram;

import org.telegram.telegrambots.ApiContextInitializer;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

public class AppTelegram {

    public static void main(String[] args) {

        ApiContextInitializer.init();
        TelegramBotsApi telegram = new TelegramBotsApi();  //objeto telegram
        MonitorMe mensagem = new MonitorMe();              //objeto da Classe Monitorme

        //Condição logica para rodar os metodos da classe Monitorme
        try {
            telegram.registerBot(new MonitorMe());
        //              mensagem.enviarMensagem(Long.valueOf(1170936455), "Teste monitorMe");
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }
}
