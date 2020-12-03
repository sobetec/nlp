package com.sobetec.nlp.chart;

import java.util.List;

public class ChartQuery {

	private List<News> allNews;
	private List<SentimentDate> sentimentDates;
	private float averageScore;
	private List<NewsKeyword> keywords;
	private List<Stocks> stockData;

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

	@Override
	public String toString() {
		return "ChartQuery [" + (allNews != null ? "allNews=" + allNews + ", " : "")
				+ (sentimentDates != null ? "sentimentDates=" + sentimentDates + ", " : "") + "averageScore="
				+ averageScore + ", " + (keywords != null ? "keywords=" + keywords + ", " : "")
				+ (stockData != null ? "stockData=" + stockData : "") + "]";
	}
}
