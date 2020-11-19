package com.sobetec.nlp.sample.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sobetec.nlp.sample.controller.NewsController;
import com.sobetec.nlp.sample.model.News;
import com.sobetec.nlp.sample.repository.NewsRepositoryImpl;




@Service
public class NewsService {

	protected Log logger = LogFactory.getLog(NewsController.class);

	@Autowired
	private NewsRepositoryImpl INewsRepository;
    
	/**
	 * 
	 * @param file
	 * @return
	 */
    public List<News> getNewsList(News vo) throws Exception {
    	logger.debug("########## start Service getNewsList");
    	List<News> listNews = new ArrayList<News>();
    	listNews = INewsRepository.getNewsList(vo);
    	for(int i = 0; i < listNews.size(); i++) {
    		Double tempScore = Double.parseDouble(listNews.get(i).getTaScre());
    		
    		if (tempScore > 60) {
    			listNews.get(i).setTaScre("긍정");
    		}
    		else if (tempScore < 40) {
    			listNews.get(i).setTaScre("부정");
    		}
    		else {	
    			listNews.get(i).setTaScre("중립");
    		}
    	}
    	
        return listNews; 
    }
    
}
