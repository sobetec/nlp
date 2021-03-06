package com.sobetec.nlp.newslist;

import java.util.List;

public interface NewsRepositoryImpl {

//	List<News> getNewsList(News req) throws Exception;

	List<News> getNewsListByCompany(String cmpyNameOnly) throws Exception;
	
	List<News> getNewsListByCondition(NewsCondition newsCondition) throws Exception;

	List<News> getChartNewsByCompany(String cmpyNameOnly) throws Exception;

	List<News> getNewsListByIndustry(NewsCondition newsCondition) throws Exception;
	
	List<Company> getCompanyListByCompany(String companyName) throws Exception;
	
	List<News> getNewsListByCompanyName(NewsCondition newsCondition) throws Exception;

	int getRowCount(NewsCondition newsCondition) throws Exception;

	List<Industry> getSubsidiaryList() throws Exception;
	
	List<Industry> getIndustryList() throws Exception;

	List<News> getNewsListBySubsidiary(NewsCondition newsCondition) throws Exception;

	List<News> getNewsListByIndustrySystem(NewsCondition newsCondition) throws Exception;

	String getSystemNameByCompany(String companyName) throws Exception;

	List<News> getNewsListByNewsDate(int newsCount) throws Exception;
	
	
	
}