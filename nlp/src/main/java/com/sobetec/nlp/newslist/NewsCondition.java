package com.sobetec.nlp.newslist;

public class NewsCondition {
	
	private int newsYear;
	private String gubun;
	private int gubunItem;
	private String startDate;
	private String endDate;
	private String searchWord;
	private int pageNum;
	private int rowCount;
	private int pageCount;
	private String gubunJaName;
	private String selectedName;
	
	
	
	

	

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
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getRowCount() {
		return rowCount;
	}
	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
	}
	public int getPageCount() {
		return pageCount;
	}
	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}
	public String getGubunJaName() {
		return gubunJaName;
	}
	public void setGubunJaName(String gubunJaName) {
		this.gubunJaName = gubunJaName;
	}
	public String getSelectedName() {
		return selectedName;
	}
	public void setSelectedName(String selectedName) {
		this.selectedName = selectedName;
	}
	
	@Override
	public String toString() {
		return "NewsCondition [newsYear=" + newsYear + ", gubun=" + gubun + ", gubunItem=" + gubunItem + ", startDate="
				+ startDate + ", endDate=" + endDate + ", searchWord=" + searchWord + ", pageNum=" + pageNum
				+ ", rowCount=" + rowCount + ", pageCount=" + pageCount + ", gubunJaName=" + gubunJaName
				+ ", selectedName=" + selectedName + "]";
	}


	
	
	
	
	
}
