//package com.sobetec.encryript;
//
//
//import java.io.BufferedReader;
//import java.io.File;
//import java.io.FileReader;
//import java.io.IOException;
//
//import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
//
//
//@Configuration
//@EnableEncryptableProperties
//public class PropertyEncyptConfiguration {
//
//    @Bean("encryptorBean")
//    public StandardPBEStringEncryptor stringEncryptor() {
//    	StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
//    	String line = null;
//    	File file = new File("/home/alex/nlp_encrypt_test/temp.txt");
//    	try (BufferedReader br = new BufferedReader(new FileReader(file))) {
//    	    
//    	    while ((line = br.readLine()) != null) {
//    	        System.out.println("im encryptorBean " + line);
//    	    }
//    	} catch (IOException e) {
//    	    e.printStackTrace();
//    	} 
//        encryptor.setPassword("sobehub");
//        encryptor.setAlgorithm("PBEWithMD5AndDES");
//        return encryptor;
//    }
//}
