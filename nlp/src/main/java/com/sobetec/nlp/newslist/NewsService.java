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
    
    public List<News> getNewsListByIndustry(String instCode) throws Exception {
    	
    	List<News> listNews = new ArrayList<News>();
    	listNews = repository.getNewsListByIndustry(instCode);
    	
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
    
    public List<String> getCompanyListByCompany(String companyName) throws Exception {
    	
    	List<String> listCompany = new ArrayList<String>();
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
