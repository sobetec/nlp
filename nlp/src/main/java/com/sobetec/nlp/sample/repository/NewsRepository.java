package com.sobetec.nlp.sample.repository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;


import com.sobetec.nlp.sample.controller.NewsController;
import com.sobetec.nlp.sample.model.News;
import com.sobetec.nlp.sample.model.NewsCondition;


@Primary
@Repository
public class NewsRepository implements NewsRepositoryImpl  {
	
	protected Log log = LogFactory.getLog(NewsController.class);

	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<News> getNewsList(News vo) throws Exception {
		log.debug("########## start Repository getGetNewsList ");
		
		String mapId = "newsMapper.selectNewsList";
		List<News> sqlResultList = sqlSession.selectList(mapId, vo);
		
//		log.debug("size:"+sqlResultList);
		
		return sqlResultList;
	}
	
//	@Override
//	public List<News> getNewsListByCompany(News vo) throws Exception {
//		log.debug("########## start Repository getGetNewsList ");
//		
//		String mapId = "newsMapper.selectNewsList";
//		List<News> sqlResultList = sqlSession.selectList(mapId, vo);
//		
////		log.debug("size:"+sqlResultList);
//		
//		return sqlResultList;
//	}
	@Override
	public List<News> getNewsListByCompany(String cmpyNameOnly) throws Exception {
//		String likelike = '%'+cmpyNameOnly+'%';
		return sqlSession.selectList("mapper.newsMapper.selectNewsListByCompany",cmpyNameOnly);
	}
	
	@Override
	public List<News> getNewsListByCondition(NewsCondition newsCondition) throws Exception {
		System.out.println(newsCondition);
		
		if (newsCondition.getGubun().equals("custom")) {
			String startDate = newsCondition.getStartDate();
			String endDate = newsCondition.getEndDate();
			String sd[] = startDate.split("/");
			String ed[] = endDate.split("/");

			startDate = sd[2] + "-" + sd[0] + "-" + sd[1];
			endDate = ed[2] + "-" + ed[0] + "-" + ed[1];
			
			newsCondition.setStartDate(startDate);
			newsCondition.setEndDate(endDate);
			
			System.out.println(newsCondition.getStartDate());
			System.out.println(newsCondition.getEndDate());
		}
		
		return sqlSession.selectList("mapper.newsMapper.selectNewsListByCondition",newsCondition);
	}
}