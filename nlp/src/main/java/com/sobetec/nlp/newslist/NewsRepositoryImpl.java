package com.sobetec.nlp.newslist;

import java.util.List;

public interface NewsRepositoryImpl {

//	List<News> getNewsList(News req) throws Exception;

	List<News> getNewsListByCompany(String cmpyNameOnly) throws Exception;
	
	List<News> getNewsListByCondition(NewsCondition newsCondition) throws Exception;

	List<News> getChartNewsByCompany(String cmpyNameOnly) throws Exception;

	List<Industry> getIndustryList() throws Exception;

}