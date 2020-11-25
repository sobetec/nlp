package com.sobetec.nlp.sample.model;

public class SentimentDate {
	private String date;
	private float sentiment;

	public SentimentDate(String date, float sentiment) {
		super();
		this.date = date;
		this.sentiment = sentiment;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public float getSentiment() {
		return sentiment;
	}

	public void setSentiment(float sentiment) {
		this.sentiment = sentiment;
	}

	@Override
	public String toString() {
		return "sentimentDates [" + (date != null ? "date=" + date + ", " : "") + "sentiment=" + sentiment + "]";
	}

}
