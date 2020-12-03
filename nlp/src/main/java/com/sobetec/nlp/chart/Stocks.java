package com.sobetec.nlp.chart;

public class Stocks {
	private String company;
	private String date;
	private int price;

	public Stocks(String cmpy, String date, int closingPrice) {
		super();
		this.company = cmpy;
		this.date = date;
		this.price = closingPrice;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int closingPrice) {
		this.price = closingPrice;
	}

	@Override
	public String toString() {
		return "Stocks [" + (date != null ? "date=" + date + ", " : "") + "closingPrice=" + price + "]";
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String cmpy) {
		this.company = cmpy;
	}

}
