package com.sobetec.nlp.sample.model;

public class NewsCondition {
	
	private int newsYear;
	private String gubun;
	private int gubunItem;
	private String startDate;
	private String endDate;
	private String searchWord;
	
	public int getNewsYear() {
		return newsYear;
	}
	public void setNewsYear(int newsYear) {
		this.newsYear = newsYear;
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
		return "NewsCondition [newsYear=" + newsYear + ", gubun=" + gubun + ", gubunItem=" + gubunItem + ", startDate="
				+ startDate + ", endDate=" + endDate + ", searchWord=" + searchWord + "]";
	}
	

	
	

	


	
}
