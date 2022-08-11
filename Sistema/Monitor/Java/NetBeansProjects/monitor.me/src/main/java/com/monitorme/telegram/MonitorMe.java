package com.monitorme.telegram;

import com.monitorme.oshi.Logger;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

public class MonitorMe extends TelegramLongPollingBot {

    SendMessage message = new SendMessage();  //Objeto para envio de mensagem 
    Logger logger = new Logger();

    //Metodo herdado, validação do token do bot
    @Override
    public String getBotToken() {
        return "1127314189:AAHcH7b9CmwknOeiCJLXN3kayd_-77LLFj4";
    }

    //Metodo herdado, faz as atualizações e chama o metodo de envio de mensagem 
    @Override
    public void onUpdateReceived(Update update) {
        Long chatId = update.getMessage().getChatId();
        String mensagem = update.getMessage().getText();
        System.out.println(mensagem);
        if (mensagem.equals("Oi")) {
            enviarMensagem(chatId, String.format(">> %d", chatId));  //Condição logica para enviar mensagem através da interação do usuario"Oi"
        }
    }

    //Metodo herdado, faz a validação do user do bot 
    @Override
    public String getBotUsername() {
        return "@AdmMonitorMe_bot";
    }

    //Metodo que faz a validação do ID e envia mensagem 
    public void enviarMensagem(Long chatId, String mensagem) {
        message.setChatId(chatId);
        message.setText(mensagem);
        try {
            execute(message);
            logger.inserirLog("INFO", "Mensagem enviada com sucesso no Telegram. ");
        } catch (TelegramApiException e) {
            logger.inserirLog("ERRO", "Erro ao enviar mensagem no Telegram. " + e.getMessage());
        }
    }
}
