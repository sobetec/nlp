package com.sobetec.nlp.chart;

import java.util.List;

public interface ChartNewsRepositoryImpl {

	List<News> getChartNewsByCompany(String cmpyNameOnly) throws Exception;

}