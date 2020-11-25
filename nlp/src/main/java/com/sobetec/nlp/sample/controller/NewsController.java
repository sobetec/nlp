package com.sobetec.nlp.sample.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sobetec.nlp.sample.model.News;
import com.sobetec.nlp.sample.model.NewsCondition;
import com.sobetec.nlp.sample.repository.NewsRepositoryImpl;
import com.sobetec.nlp.sample.service.NewsService;

/**
 * 데이터 관리
 * @author YUJH
 * 
 */
@RestController
public class NewsController {

	protected Log logger = LogFactory.getLog(NewsController.class);
	
	@Autowired
	private NewsRepositoryImpl repository;
	@Resource(name="newsService")
	private NewsService service;

	/**
	 * 목록조회 Sample 
	 * @param SampleVO
	 * @return List
	 * @throws Exception
	 */
//	@PostMapping(path ="/getNewsList")
//	public List<News> getSampleList(News vo) throws Exception {
//		logger.debug("########## start Controller getNewsList");
//		List<News> resultList = new ArrayList<News>();
//
//		resultList = service.getNewsList(vo);
//
//	    return resultList;
//	}

	
	@GetMapping(path ="/getNewsListByCompany/{cmpyNameOnly}") 
	public List<News> getNewsListByCompany(@PathVariable String cmpyNameOnly) throws Exception {
		 
	return service.getNewsList(cmpyNameOnly);
	}
	
	@PostMapping(path ="/getNewsListByCondition") 
	public List<News> getNewsListByCondition(NewsCondition newsCondition) throws Exception {
		System.out.println(newsCondition);
	return service.getNewsList(newsCondition);
	}
	
}
