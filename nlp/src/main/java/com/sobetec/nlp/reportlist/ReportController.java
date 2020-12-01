package com.sobetec.nlp.reportlist;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sobetec.nlp.reportlist.Report;
import com.sobetec.nlp.reportlist.ReportCondition;
import com.sobetec.nlp.reportlist.ReportRepositoryImpl;
import com.sobetec.nlp.reportlist.ReportService;

/**
 * 데이터 관리
 * 
 * @author YUJH
 * 
 */
@RestController
public class ReportController {

	protected Log logger = LogFactory.getLog(ReportController.class);

	@Autowired
	private ReportRepositoryImpl repository;
	@Resource(name = "reportService")
	private ReportService reportService;

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


	@PostMapping(path = "/getReportListByCondition")
	public List<Report> getReportListByCondition(ReportCondition reportCondition) throws Exception {
		System.out.println(reportCondition);
		return reportService.getReportList(reportCondition);
	}

}
