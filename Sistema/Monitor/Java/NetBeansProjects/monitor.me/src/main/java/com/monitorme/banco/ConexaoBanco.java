
package com.monitorme.banco;
import org.apache.commons.dbcp2.BasicDataSource;


public class ConexaoBanco {
     private BasicDataSource dataSource;

    public ConexaoBanco() {
        this.dataSource = new BasicDataSource();
        
        dataSource​.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        
        dataSource​.setUrl("jdbc:sqlserver://svrmonitorme.database.windows.net:1433;database=bdMonitoMe;user=localamin;password=#Gfgrupo7b;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;");  
        
        dataSource​.setUsername("localamin");
        
        dataSource​.setPassword("#Gfgrupo7b");
    
    
    }

    public BasicDataSource getDataSource() {
        return dataSource;
    }
    
    
     
    
}
