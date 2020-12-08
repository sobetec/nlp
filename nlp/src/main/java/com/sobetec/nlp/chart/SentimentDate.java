package com.sobetec.nlp.chart;

public class SentimentDate {
	private String date;
	private float mean;
	private float min;
	private float lower;
	private float median;
	private float upper;
	private float max;

	public float getMean() {
		return mean;
	}

	public void setMean(float mean) {
		this.mean = mean;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public float getMin() {
		return min;
	}

	public void setMin(float min) {
		this.min = min;
	}

	public float getLower() {
		return lower;
	}

	public void setLower(float lower) {
		this.lower = lower;
	}

	public float getMedian() {
		return median;
	}

	public void setMedian(float median) {
		this.median = median;
	}

	public float getUpper() {
		return upper;
	}

	public void setUpper(float upper) {
		this.upper = upper;
	}

	public float getMax() {
		return max;
	}

	public void setMax(float max) {
		this.max = max;
	}

	public SentimentDate(String date, float mean, float min, float lower, float median, float upper, float max) {
		super();
		this.date = date;
		this.mean = mean;
		this.min = min;
		this.lower = lower;
		this.median = median;
		this.upper = upper;
		this.max = max;
	}

	public SentimentDate(String date, float min, float lower, float median, float upper, float max) {
		super();
		this.date = date;
		this.min = min;
		this.lower = lower;
		this.median = median;
		this.upper = upper;
		this.max = max;
	}

	@Override
	public String toString() {
		return "SentimentDate [" + (date != null ? "date=" + date + ", " : "") + "mean=" + mean + ", min=" + min
				+ ", lower=" + lower + ", median=" + median + ", upper=" + upper + ", max=" + max + "]";
	}

}
