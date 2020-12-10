package com.sobetec.nlp.newslist;

public class Company {
	
	private String cmpy;
	private String subsName;
	private String instName;
	
	public String getCmpy() {
		return cmpy;
	}
	public void setCmpy(String cmpy) {
		this.cmpy = cmpy;
	}
	public String getSubsName() {
		return subsName;
	}
	public void setSubsName(String subsName) {
		this.subsName = subsName;
	}
	public String getInstName() {
		return instName;
	}
	public void setInstName(String instName) {
		this.instName = instName;
	}
	
	@Override
	public String toString() {
		return "Company [cmpy=" + cmpy + ", subsName=" + subsName + ", instName=" + instName + "]";
	}
		
}
