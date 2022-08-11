package com.monitorme.banco;

import com.monitorme.tela.TelaLogin;
import java.util.List;
import javax.swing.JOptionPane;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.jdbc.core.JdbcTemplate;

public class User {

    public static int idTelegram;
    public static int idUser;
    public static Integer UsuarioLogado = null;

    public static Integer getUsuarioLogado() {
        return UsuarioLogado;
    }
    public static int getTelegram(){
        return idTelegram;
    }

    public User(String email, String telegram) {

        try {
            TelaLogin login = new TelaLogin();
            ConexaoBanco dadosConexao = new ConexaoBanco();
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dadosConexao.getDataSource());
            List lista = jdbcTemplate.queryForList("select email,idTelegram from tbl_Users"
                    + " where email='" + email + "'and idTelegram='" + telegram + "'or email='" + email + "'and idTelegram='" + telegram + "'");
            List ID = jdbcTemplate.queryForList("select idTelegram,id from tbl_Users"
                    + " where email='" + email + "'and idTelegram='" + telegram + "'or email='" + email + "'and idTelegram='" + telegram + "'");
            if (lista.isEmpty() == false) {
                JSONObject result = new JSONObject();
                
//                JSONArray jarr = new JSONArray(ID);

                UsuarioLogado = 0;
                result.put("Telegram", ID.get(0));
                
                JSONObject xt = new JSONObject(result.toString());
                JSONObject id = xt.getJSONObject("Telegram");
                this.idTelegram = id.getInt("idTelegram");
                this.idUser = id.getInt("id");

                System.out.println("seu Telegram é: " + idTelegram);
                System.out.println("seu id é: " + idUser);
            } else {
                JOptionPane.showMessageDialog(null, "Usuário ou ID inválidos!", "Login inválido", JOptionPane.ERROR_MESSAGE);
            }
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }

    }
    
}
