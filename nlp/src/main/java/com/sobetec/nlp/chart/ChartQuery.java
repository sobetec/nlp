package com.sobetec.nlp.chart;

import java.util.List;

public class ChartQuery {

	private List<News> allNews;
	private List<SentimentDate> sentimentDates;
	private float averageScore;
	private List<NewsKeyword> keywords;
	private List<Stocks> stockData;
	private List<LineData> creditData;
	private List<LineData> salesData;
	private List<LineData> gradeData;
	private List<LineData> grade2Data;

	public ChartQuery(List<News> allNews, List<SentimentDate> sentimentDates, float averageScore) {
		super();
		this.allNews = allNews;
		this.sentimentDates = sentimentDates;
		this.averageScore = averageScore;
	}

	public ChartQuery(List<News> allNews, List<SentimentDate> sentimentDates, float averageScore,
			List<NewsKeyword> keywords) {
		super();
		this.allNews = allNews;
		this.sentimentDates = sentimentDates;
		this.averageScore = averageScore;
		this.keywords = keywords;
	}

	public ChartQuery(List<News> allNews, List<SentimentDate> sentimentDates, float averageScore,
			List<NewsKeyword> keywords, List<Stocks> stockData) {
		super();
		this.allNews = allNews;
		this.sentimentDates = sentimentDates;
		this.averageScore = averageScore;
		this.keywords = keywords;
		this.stockData = stockData;
	}

	public ChartQuery(List<News> allNews, List<SentimentDate> sentimentDates, float averageScore,
			List<NewsKeyword> keywords, List<Stocks> stockData, List<LineData> creditData) {
		super();
		this.allNews = allNews;
		this.sentimentDates = sentimentDates;
		this.averageScore = averageScore;
		this.keywords = keywords;
		this.stockData = stockData;
		this.creditData = creditData;
	}

	public ChartQuery(List<News> allNews, List<SentimentDate> sentimentDates, float averageScore,
			List<NewsKeyword> keywords, List<Stocks> stockData, List<LineData> creditData, List<LineData> salesData) {
		super();
		this.allNews = allNews;
		this.sentimentDates = sentimentDates;
		this.averageScore = averageScore;
		this.keywords = keywords;
		this.stockData = stockData;
		this.creditData = creditData;
		this.salesData = salesData;
	}

	public ChartQuery(List<News> allNews, List<SentimentDate> sentimentDates, float averageScore,
			List<NewsKeyword> keywords, List<Stocks> stockData, List<LineData> creditData, List<LineData> salesData,
			List<LineData> gradeData) {
		super();
		this.allNews = allNews;
		this.sentimentDates = sentimentDates;
		this.averageScore = averageScore;
		this.keywords = keywords;
		this.stockData = stockData;
		this.creditData = creditData;
		this.salesData = salesData;
		this.gradeData = gradeData;
	}

	public ChartQuery(List<News> allNews, List<SentimentDate> sentimentDates, float averageScore,
			List<NewsKeyword> keywords, List<Stocks> stockData, List<LineData> creditData, List<LineData> salesData,
			List<LineData> gradeData, List<LineData> grade2Data) {
		super();
		this.allNews = allNews;
		this.sentimentDates = sentimentDates;
		this.averageScore = averageScore;
		this.keywords = keywords;
		this.stockData = stockData;
		this.creditData = creditData;
		this.salesData = salesData;
		this.gradeData = gradeData;
		this.grade2Data = grade2Data;
	}

	public List<News> getAllNews() {
		return allNews;
	}

	public void setAllNews(List<News> allNews) {
		this.allNews = allNews;
	}

	public List<SentimentDate> getSentimentDates() {
		return sentimentDates;
	}

	public void setSentimentDates(List<SentimentDate> sentimentDates) {
		this.sentimentDates = sentimentDates;
	}

	public float getAverageScore() {
		return averageScore;
	}

	public void setAverageScore(float averageScore) {
		this.averageScore = averageScore;
	}

	public List<NewsKeyword> getKeywords() {
		return keywords;
	}

	public void setKeywords(List<NewsKeyword> keywords) {
		this.keywords = keywords;
	}

	public List<Stocks> getStockData() {
		return stockData;
	}

	public void setStockData(List<Stocks> stockData) {
		this.stockData = stockData;
	}

	public List<LineData> getCreditData() {
		return creditData;
	}

	public void setCreditData(List<LineData> creditData) {
		this.creditData = creditData;
	}

	public List<LineData> getSalesData() {
		return salesData;
	}

	public void setSalesData(List<LineData> salesData) {
		this.salesData = salesData;
	}

	public List<LineData> getGradeData() {
		return gradeData;
	}

	public void setGradeData(List<LineData> gradeData) {
		this.gradeData = gradeData;
	}

	public List<LineData> getGrade2Data() {
		return grade2Data;
	}

	public void setGrade2Data(List<LineData> grade2Data) {
		this.grade2Data = grade2Data;
	}

	@Override
	public String toString() {
		return "ChartQuery [" + (allNews != null ? "allNews=" + allNews + ", " : "")
				+ (sentimentDates != null ? "sentimentDates=" + sentimentDates + ", " : "") + "averageScore="
				+ averageScore + ", " + (keywords != null ? "keywords=" + keywords + ", " : "")
				+ (stockData != null ? "stockData=" + stockData : "") + "]";
	}
}
