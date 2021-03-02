package com.sobetec.nlp.newslist;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


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


	@PostMapping(path = "/getNewsListByCondition")
	public List<News> getNewsListByCondition(NewsCondition newsCondition) throws Exception {
		System.out.println(newsCondition);
		return newsService.getNewsList(newsCondition);
	}
	
	@GetMapping(path = "/getIndustryAndSubsidiaryList/{gubunJa}")
	public List<Industry> getIndustryAndSubsidiaryList(@PathVariable String gubunJa) throws Exception {
		System.out.println("구분자 =" + gubunJa  );
		List<Industry> resultList = new ArrayList<Industry>();
		if (gubunJa.equals("industry")) {
			resultList = repository.getIndustryList();
		}else {
			resultList = repository.getSubsidiaryList();
		};
		
		return resultList;
	}
	
	// 임시~~
	@GetMapping(path = "/getIndustryAndSubsidiaryListTest/{gubunJa}")
	public List<Industry> getIndustryAndSubsidiaryListTest(@PathVariable String gubunJa) throws Exception {
		System.out.println("구분자 =" + gubunJa  );
		List<Industry> resultList = new ArrayList<Industry>();
		if (gubunJa.equals("industry")) {
			resultList = repository.getIndustryList();
		}else {
			resultList = repository.getSubsidiaryList();
		};
		
		return resultList;
	}
	
	@PostMapping(path = "/getNewsListByIndustryAndSubsidiary")
	public List<News> getNewsListByIndustry(NewsCondition newsCondition) throws Exception {
		System.out.println("구분자 네임= " + newsCondition.getGubunJaName());
		System.out.println("찍은네임= " + newsCondition.getSelectedName());
		return newsService.getNewsListByIndustryAndSubsidiary(newsCondition);	
	}
	
	@GetMapping(path = "/getCompanyListByCompany/{companyName}")
	public List<Company> getCompanyListByCompany(@PathVariable String companyName) throws Exception {
		return newsService.getCompanyListByCompany(companyName);
	}
	
	@PostMapping(path = "/getNewsListByCompanyName")
	public List<News> getNewsListByCompanyName(NewsCondition newsCondition) throws Exception {
		System.out.println(newsCondition);
		return newsService.getNewsListByCompanyName(newsCondition);
	}
	
	@PostMapping(path = "/getRowCount")
	public int getRowCount(NewsCondition newsCondition) throws Exception {
		System.out.println(newsCondition);
		return repository.getRowCount(newsCondition);
	}
	
	@GetMapping(path = "/getSystemNameByCompany/{companyName}")
	public String getSystemNameByCompany(@PathVariable String companyName) throws Exception {
		String result = repository.getSystemNameByCompany(companyName);
		System.out.println("가져왔니 getSystemNameByCompany 컨트롤러  "+result);
		return result;
	}

	@GetMapping(path = "/getNewsListByNewsDate/{newsCount}")
	public List<News> getNewsListByNewsDate(@PathVariable int newsCount) throws Exception {
		return repository.getNewsListByNewsDate(newsCount);
	}
	
}
