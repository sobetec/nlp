package com.sobetec.nlp.newslist;

public class NewsCount {
	
	private int rowCount;

	
	public NewsCount() {
		
	}


	
	public NewsCount(int rowCount) {
		super();
		this.rowCount = rowCount;
	}



	public int getRowCount() {
		return rowCount;
	}


	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
	}


	@Override
	public String toString() {
		return "NewsCount [rowCount=" + rowCount + "]";
	}

	
	

	
}
