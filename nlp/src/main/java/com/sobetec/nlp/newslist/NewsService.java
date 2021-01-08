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
	
	static Double a = 56.90020302862004;
	static Double b = 30.06551590366119;
	static Double c = 5.919497539989776;
	static Double d = 47.54017840669978;
	static Double z = 4.139;
	
	
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
        		
        		if (tempScore > 45) {
        			listNews.get(i).setTaScreWord("긍정");
        		}
        		else if (tempScore < 20) {
        			listNews.get(i).setTaScreWord("부정");
        		}
        		else {	
        			listNews.get(i).setTaScreWord("중립");
        		}
        		Double y = (a *( tempScore - b ) / (c + Math.abs(tempScore-b) )) +d;
        		Double reverseUp;
        		if (y > 50) {
        			reverseUp = (((y-50)*(z-50))+(50*(50+z))) / (100 + z - y);
        		}else if(y < 50){
        			reverseUp = ((50+z)/(y+z))*y;
        		}else {
        			reverseUp = 50.0;
        		}
    			
        		
        		listNews.get(i).setTaScre(reverseUp.toString());
        		
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
        		
        		if (tempScore > 45) {
        			listNews.get(i).setTaScreWord("긍정");
        		}
        		else if (tempScore < 20) {
        			listNews.get(i).setTaScreWord("부정");
        		}
        		else {	
        			listNews.get(i).setTaScreWord("중립");
        		}
        		Double y = (a *( tempScore - b ) / (c + Math.abs(tempScore-b) )) +d;
        		Double reverseUp;
        		
        		if (y > 50) {
        			reverseUp = (((y-50)*(z-50))+(50*(50+z))) / (100 + z - y);
        		}else if(y < 50){
        			reverseUp = ((50+z)/(y+z))*y;
        		}else {
        			reverseUp = 50.0;
        		}
        		listNews.get(i).setTaScre(reverseUp.toString());
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
        		
        		if (tempScore > 45) {
        			listNews.get(i).setTaScreWord("긍정");
        		}
        		else if (tempScore < 20) {
        			listNews.get(i).setTaScreWord("부정");
        		}
        		else {	
        			listNews.get(i).setTaScreWord("중립");
        		}
        		Double result = (a *( tempScore - b ) / (c + Math.abs(tempScore-b) )) +d;
        		result = Math.round(result*100.0) / 100.0;
        		Double y = (a *( tempScore - b ) / (c + Math.abs(tempScore-b) )) +d;
        		Double reverseUp;
        		if (y > 50) {
        			reverseUp = (((y-50)*(z-50))+(50*(50+z))) / (100 + z - y);
        		}else if(y < 50){
        			reverseUp = ((50+z)/(y+z))*y;
        		}else {
        			reverseUp = 50.0;
        		}
        		listNews.get(i).setTaScre(reverseUp.toString());
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
        		
        		if (tempScore > 45) {
        			listNews.get(i).setTaScreWord("긍정");
        		}
        		else if (tempScore < 20) {
        			listNews.get(i).setTaScreWord("부정");
        		}
        		else {	
        			listNews.get(i).setTaScreWord("중립");
        		}
        		Double result = (a *( tempScore - b ) / (c + Math.abs(tempScore-b) )) +d;
        		result = Math.round(result*100.0) / 100.0;
        		Double y = (a *( tempScore - b ) / (c + Math.abs(tempScore-b) )) +d;
        		Double reverseUp;
        		if (y > 50) {
        			reverseUp = (((y-50)*(z-50))+(50*(50+z))) / (100 + z - y);
        		}else if(y < 50){
        			reverseUp = ((50+z)/(y+z))*y;
        		}else {
        			reverseUp = 50.0;
        		}
        		listNews.get(i).setTaScre(reverseUp.toString());
    		} else {
    		
    		listNews.get(i).setTaScreWord("없음");
    		}
    	}
    	
        return listNews; 
    }

}
