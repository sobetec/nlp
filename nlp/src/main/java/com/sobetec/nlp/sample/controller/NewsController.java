package com.sobetec.nlp.sample.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.sobetec.nlp.sample.model.ChartQuery;
import com.sobetec.nlp.sample.model.News;
import com.sobetec.nlp.sample.repository.NewsRepositoryImpl;
import com.sobetec.nlp.sample.service.ChartQueryService;
import com.sobetec.nlp.sample.service.NewsService;

/**
 * 데이터 관리
 * 
 * @author YUJH
 * 
 */
@RestController
public class NewsController {

	protected Log logger = LogFactory.getLog(NewsController.class);

	@Autowired
	private NewsRepositoryImpl repository;
	@Resource(name = "newsService")
	private NewsService newsService;
	@Resource(name = "chartQueryService")
	private ChartQueryService chartQueryService;

	/**
	 * 목록조회 Sample
	 * 
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

	@GetMapping(path = "/getNewsListByCompany/{cmpyNameOnly}")
	public List<News> getNewsListByCompany(@PathVariable String cmpyNameOnly) throws Exception {

		return newsService.getNewsList(cmpyNameOnly);
	}

	@GetMapping(path = "/getChartQueryByCompany/{cmpyNameOnly}")
	public ChartQuery getChartQueryByCompany(@PathVariable String cmpyNameOnly) throws Exception {
		System.out.println("Test:" + cmpyNameOnly);

		return chartQueryService.getChartQuery(cmpyNameOnly);
	}
}
