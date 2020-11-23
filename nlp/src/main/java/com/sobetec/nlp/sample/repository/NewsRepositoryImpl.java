package com.sobetec.nlp.sample.repository;

import java.util.List;

import com.sobetec.nlp.sample.model.News;

public interface NewsRepositoryImpl {

	List<News> getNewsList(News req) throws Exception;
	
	List<News> getNewsListByCompany(String cmpyNameOnly) throws Exception;


}