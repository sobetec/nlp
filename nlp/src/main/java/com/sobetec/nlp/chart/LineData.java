package com.sobetec.nlp.chart;

public class LineData {
	private String name;
	private String date;
	private String value;

	public LineData(String name, String date, String value) {
		super();
		this.name = name;
		this.date = date;
		this.value = value;
	}

	public LineData() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
