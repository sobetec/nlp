package com.sobetec.nlp.sample.repository;

import java.util.List;

import com.sobetec.nlp.sample.model.News;
import com.sobetec.nlp.sample.model.NewsCondition;

public interface NewsRepositoryImpl {

	List<News> getNewsList(News req) throws Exception;
	
	List<News> getNewsListByCompany(String cmpyNameOnly) throws Exception;
	
	List<News> getNewsListByCondition(NewsCondition newsCondition) throws Exception;


}