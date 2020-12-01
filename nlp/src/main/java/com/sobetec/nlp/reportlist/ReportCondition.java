package com.sobetec.nlp.reportlist;

public class ReportCondition {
	
	private int reportYear;
	private String gubun;
	private int gubunItem;
	private String startDate;
	private String endDate;
	private String searchWord;
	
	public int getReportYear() {
		return reportYear;
	}
	public void setReportYear(int reportYear) {
		this.reportYear = reportYear;
	}
	public String getGubun() {
		return gubun;
	}
	public void setGubun(String gubun) {
		this.gubun = gubun;
	}
	public int getGubunItem() {
		return gubunItem;
	}
	public void setGubunItem(int gubunItem) {
		this.gubunItem = gubunItem;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getSearchWord() {
		return searchWord;
	}
	public void setSearchWord(String searchWord) {
		this.searchWord = searchWord;
	}
	
	@Override
	public String toString() {
		return "ReportCondition [reportYear=" + reportYear + ", gubun=" + gubun + ", gubunItem=" + gubunItem
				+ ", startDate=" + startDate + ", endDate=" + endDate + ", searchWord=" + searchWord + "]";
	}
	
	


	
}
