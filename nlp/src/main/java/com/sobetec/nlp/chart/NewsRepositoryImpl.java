package com.sobetec.nlp.chart;

import java.util.List;

public interface NewsRepositoryImpl {

	List<News> getChartNewsByCompany(String cmpyNameOnly) throws Exception;

}