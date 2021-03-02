package com.sobetec.encryript;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;



public class Jasypt {
	public static void main(String[] args) {
        StandardPBEStringEncryptor jasypt = new StandardPBEStringEncryptor();
        jasypt.setPassword("sobehub");      //암호화 키(password)
        jasypt.setAlgorithm("PBEWithMD5AndDES");
 
 
        String encryptedText = jasypt.encrypt("jdbc:log4jdbc:postgresql://10.6.14.80:5432/nlp");    //암호화
        String plainText = jasypt.decrypt(encryptedText);  //복호화
 
        System.out.println("encryptedText:  " + encryptedText); //암호화된 값
        System.out.println("plainText:  " + plainText);         //복호화된 값
    }




}
