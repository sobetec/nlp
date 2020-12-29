package com.sobetec.nlp.newslist;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




@Service
public class NewsService {

	protected Log logger = LogFactory.getLog(NewsController.class);

	@Autowired
	private NewsRepositoryImpl repository;
    
	/**
	 * 
	 * @param file
	 * @return
	 */

    
    public List<News> getNewsList(String cmpyNameOnly) throws Exception {
    	logger.debug("########## start Service getNewsList");
    	List<News> listNews = new ArrayList<News>();
    	listNews = repository.getNewsListByCompany(cmpyNameOnly);
    	
    	for(int i = 0; i < listNews.size(); i++) {
    		
    		if (listNews.get(i).getTaScre() != null) {

        		Double tempScore = Double.parseDouble(listNews.get(i).getTaScre());
        		
        		if (tempScore > 60) {
        			listNews.get(i).setTaScreWord("긍정");
        		}
        		else if (tempScore < 40) {
        			listNews.get(i).setTaScreWord("부정");
        		}
        		else {	
        			listNews.get(i).setTaScreWord("중립");
        		}
    		} else {
    		
    		listNews.get(i).setTaScreWord("없음");
    		}
    	}
    	
        return listNews; 
    }
    
    
    
    public List<News> getNewsList(NewsCondition newsCondition) throws Exception {
    	logger.debug("########## start Service getNewsListCondition");
    	List<News> listNews = new ArrayList<News>();
    	listNews = repository.getNewsListByCondition(newsCondition);
    	
    	for(int i = 0; i < listNews.size(); i++) {
    		
    		if (listNews.get(i).getTaScre() != null) {

        		Double tempScore = Double.parseDouble(listNews.get(i).getTaScre());
        		
        		if (tempScore > 60) {
        			listNews.get(i).setTaScreWord("긍정");
        		}
        		else if (tempScore < 40) {
        			listNews.get(i).setTaScreWord("부정");
        		}
        		else {	
        			listNews.get(i).setTaScreWord("중립");
        		}
    		} else {
    		
    		listNews.get(i).setTaScreWord("없음");
    		}
    	}
    	
        return listNews; 
    }
    
    public List<News> getNewsListByIndustryAndSubsidiary(NewsCondition newsCondition) throws Exception {
    	
    	List<News> listNews = new ArrayList<News>();
    	if (newsCondition.getGubunJaName().equals("industry") && (newsCondition.getSelectedName().contains("_system"))) {
    		String name = newsCondition.getSelectedName();
    		System.out.println("겟뉴스쿼리 셀렉트네임 셋팅 : "+name.substring(0,name.length()-7));
    		newsCondition.setSelectedName(name.substring(0,name.length()-7));
    		listNews = repository.getNewsListByIndustrySystem(newsCondition);
    		
    	}else if(newsCondition.getGubunJaName().equals("subsidiary")){
    		
    		listNews = repository.getNewsListBySubsidiary(newsCondition);
    		
    	}else {
    		
    		listNews = repository.getNewsListByIndustry(newsCondition);
    	}
    	
    	for(int i = 0; i < listNews.size(); i++) {
    		
    		if (listNews.get(i).getTaScre() != null) {

        		Double tempScore = Double.parseDouble(listNews.get(i).getTaScre());
        		
        		if (tempScore > 60) {
        			listNews.get(i).setTaScreWord("긍정");
        		}
        		else if (tempScore < 40) {
        			listNews.get(i).setTaScreWord("부정");
        		}
        		else {	
        			listNews.get(i).setTaScreWord("중립");
        		}
    		} else {
    		
    		listNews.get(i).setTaScreWord("없음");
    		}
    	}
        	
        return listNews; 
    }
    
    public List<Company> getCompanyListByCompany(String companyName) throws Exception {
    	
    	List<Company> listCompany = new ArrayList<Company>();
    	listCompany = repository.getCompanyListByCompany(companyName);
        return listCompany; 
    }
    
    public List<News> getNewsListByCompanyName(NewsCondition newsCondition) throws Exception {
    	
    	logger.debug("########## start Service getNewsListByCompanyName");
    	List<News> listNews = new ArrayList<News>();
    	listNews = repository.getNewsListByCompanyName(newsCondition);
    	
    	for(int i = 0; i < listNews.size(); i++) {
    		
    		if (listNews.get(i).getTaScre() != null) {

        		Double tempScore = Double.parseDouble(listNews.get(i).getTaScre());
        		
        		if (tempScore > 60) {
        			listNews.get(i).setTaScreWord("긍정");
        		}
        		else if (tempScore < 40) {
        			listNews.get(i).setTaScreWord("부정");
        		}
        		else {	
        			listNews.get(i).setTaScreWord("중립");
        		}
    		} else {
    		
    		listNews.get(i).setTaScreWord("없음");
    		}
    	}
    	
        return listNews; 
    }

}
