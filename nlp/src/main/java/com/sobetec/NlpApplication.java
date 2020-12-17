package com.sobetec;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.sobetec.nlp.reportlist.ReportFileProperties;

import org.springframework.boot.context.properties.EnableConfigurationProperties;


@SpringBootApplication
@EnableConfigurationProperties({ReportFileProperties.class})
public class NlpApplication {

	public static void main(String[] args) {
		SpringApplication.run(NlpApplication.class, args);
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
