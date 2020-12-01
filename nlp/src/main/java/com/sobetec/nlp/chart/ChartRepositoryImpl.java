package com.sobetec.nlp.chart;

import java.util.List;

import com.sobetec.nlp.chart.News;

public interface ChartRepositoryImpl {

	List<News> getChartNewsByCompany(String cmpyNameOnly) throws Exception;

}