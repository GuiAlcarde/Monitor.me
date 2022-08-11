package com.monitorme.oshi;

import com.monitorme.banco.User;
import com.monitorme.telegram.MonitorMe;
import java.util.ArrayList;
import java.util.List;
import org.telegram.telegrambots.meta.TelegramBotsApi;

public class Alerta {

    private String categoriaAlerta, statusAlerta, msgAlerta;
    private Integer cont = 0;
    private List<Double> contadorDeEventos = new ArrayList<>();

    TelegramBotsApi telegram = new TelegramBotsApi();  //objeto telegram
    MonitorMe mensagem = new MonitorMe();
    Memoria mem = new Memoria();

    //Metodos
    public void enviarAlerta(String categoriaAlerta, String statusAlerta, String msgAlerta) {
        if (categoriaAlerta == "gpu") {
            mensagem.enviarMensagem(Long.valueOf(User.idTelegram), (statusAlerta+": "+ msgAlerta));
        }else if(categoriaAlerta == "memoria"){
            mensagem.enviarMensagem(Long.valueOf(User.idTelegram), (statusAlerta+": "+ msgAlerta));
        }else if(categoriaAlerta == "cpu"){
            mensagem.enviarMensagem(Long.valueOf(User.idTelegram), (statusAlerta+": "+ msgAlerta));
        }
    }
    public void limparEventos(){
        this.contadorDeEventos.clear();
    }
    
    public void adicionarEvento(Double valor){
        this.cont += 1;
        contadorDeEventos.add(valor);
    }
    
    public Double mediaEvento(){
        Double total = 0.0;
        for(Double p : contadorDeEventos){
            total += p;
            System.out.println("Tdentro" + total);
        }
        System.out.println("T" + total);
        return total / contadorDeEventos.size();
    }

    public List<Double> getContadorDeEventos() {
        return contadorDeEventos;
    }

    public void setContadorDeEventos(List<Double> contadorDeEventos) {
        this.contadorDeEventos = contadorDeEventos;
    }
    
    @Override
    public String toString() {
        return "Alerta{" + "categoriaAlerta=" + categoriaAlerta + ", statusAlerta=" + statusAlerta + ", msgAlerta=" + msgAlerta + '}';
    }
}
