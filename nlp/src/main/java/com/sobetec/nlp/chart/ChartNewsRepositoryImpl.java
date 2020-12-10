package com.sobetec.nlp.chart;

import java.util.List;

public interface ChartNewsRepositoryImpl {

	List<News> getChartNewsByCompany(String cmpyNameOnly) throws Exception;

	List<Stocks> getChartStocksByCompany(String cmpyNameOnly) throws Exception;

	List<NewsKeyword> getDocFreqCounts() throws Exception;

	List<Integer> getAllNewCount() throws Exception;
	
	List<News> getChartNewsByCondition(ChartCondition chartCondition) throws Exception;
	
	List<Stocks> getChartStocksByCondition(ChartCondition chartCondition) throws Exception;
		
}