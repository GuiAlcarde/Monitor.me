/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.monitorme.oshi;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author Pichau
 */
public class Logger {

    private String caminho;
    private String extensao;
//    private String[] tipos = {"info", "error"};
    private Date date;
    private final DateFormat dataFormatada = new SimpleDateFormat("dd/MM/yyyy");
    private final DateFormat horaFormatada = new SimpleDateFormat("HH:mm:ss");

    public Logger() {
        String os = System.getProperty("os.name").toLowerCase();

        this.caminho = os.contains("win") ? "C:/MonitorMeLog/" : "/var/log/";
        this.extensao = "Log.txt";
    }

    public void criarDiretorio() {
        try {
            if (!Files.exists(Paths.get(caminho))) {
                Files.createDirectory(Paths.get(caminho));
            }
        } catch (Exception e) {
            String msgErroDir = String.format("Erro apresentado ao criar diretório em %s.", caminho);
            System.out.println(msgErroDir);
        }
    }

    public void criarLog() {
        try {
            if (!Files.exists(Paths.get(caminho + extensao))) {
                Files.createFile(Paths.get(caminho + extensao));
                Files.write(Paths.get(caminho + extensao),
                        ("Data             Hora            Tipo      Descrição\r\n").getBytes(),
                        StandardOpenOption.APPEND);
            }

        } catch (Exception e) {
            String msgCriarLog = String.format("Erro apresentado ao criar arquivo Log em %s.", caminho + extensao);
            System.out.println(msgCriarLog);
        }
    }

    public void inserirLog(String tipoLog, String descricao) {
        try {
            date = new Date();
            String data = dataFormatada.format(date);
            String hora = horaFormatada.format(date);
            System.lineSeparator();
            String infoLog = String.format("%s       %s        %s      %s\r\n", data, hora, tipoLog, descricao);

            Files.write(Paths.get(caminho + extensao),
                    (infoLog).getBytes(), StandardOpenOption.APPEND);

        } catch (Exception e) {
            String msgInserirLog = String.format("Erro apresentado ao inserir informações no log em %s.", caminho + extensao);
            System.out.println(msgInserirLog);
        }
    }

}
