package com.sobetec;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import com.sobetec.nlp.reportlist.ReportFileProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@Configuration
@EnableEncryptableProperties
@SpringBootApplication
@EnableConfigurationProperties({ReportFileProperties.class})
public class NlpApplication {
	
	
	public static void main(String[] args) {
		SpringApplication.run(NlpApplication.class, args);
		
	
		
	}
	
	@Bean("encryptorBean")
    public StandardPBEStringEncryptor stringEncryptor() {
    	StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
    	
    	
    	
    	
    	File file = new File("/home/alex/nlp_encrypt_test/temp.txt");
    	    	
    	String passss = null;
    	if(file.exists()) {
			try (BufferedReader br = new BufferedReader(new FileReader(file))) {
	    		String line = null;
	    	    while ((line = br.readLine()) != null) {
	    	       // System.out.println("im encr yptorBean " + line);
	    	        passss = line;
	    	    }
	    	} catch (IOException e) {
	    	    e.printStackTrace();
	    	    
	    	}
    	}
    	
    	//file.delete();
    	
    	
    	
    	//System.out.println("im encryptorBean " + passss);
        //encryptor.setPassword(passss);
    	encryptor.setPassword("sobehub");
        encryptor.setAlgorithm("PBEWithMD5AndDES");
        return encryptor;
    }
	
	@Bean
	public WebMvcConfigurer webMvcConfigurer() {
	    return new WebMvcConfigurer() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/**")
                .allowedMethods("GET", "POST");
	        }
	    };
	}
	
	

}
