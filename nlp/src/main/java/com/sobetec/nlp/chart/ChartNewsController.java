package com.sobetec.nlp.chart;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * 데이터 관리
 * 
 * @author YUJH
 * 
 */
@RestController
public class ChartNewsController {

	protected Log logger = LogFactory.getLog(ChartNewsController.class);

	@Autowired
	private ChartNewsRepositoryImpl repository;
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

	@GetMapping(path = "/getChartQueryByCompany/{cmpyNameOnly}")
	public ChartQuery getChartQueryByCompany(@PathVariable String cmpyNameOnly) throws Exception {
		System.out.println("Test:" + cmpyNameOnly);

		return chartQueryService.getChartQuery(cmpyNameOnly);
	}

}
