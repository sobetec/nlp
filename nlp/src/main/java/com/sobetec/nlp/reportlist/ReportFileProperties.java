package com.sobetec.nlp.reportlist;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "report")
public class ReportFileProperties {

	private String filePathpdf;
	private String filePathhwp;
	
	public String getFilePathpdf() {
		return filePathpdf;
	}
	public void setFilePathpdf(String filePathpdf) {
		this.filePathpdf = filePathpdf;
	}
	public String getFilePathhwp() {
		return filePathhwp;
	}
	public void setFilePathhwp(String filePathhwp) {
		this.filePathhwp = filePathhwp;
	}
	
	
}
