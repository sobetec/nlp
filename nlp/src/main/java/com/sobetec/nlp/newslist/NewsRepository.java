package com.sobetec.nlp.newslist;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

@Primary
@Repository
public class NewsRepository implements NewsRepositoryImpl {

	protected Log log = LogFactory.getLog(NewsController.class);

	@Autowired
	private SqlSession sqlSession;

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
		return sqlSession.selectList("mapper.newsMapper.selectNewsListByCompanyCompact", cmpyNameOnly);
	}

	@Override
	public List<News> getChartNewsByCompany(String cmpyNameOnly) throws Exception {
//		String likelike = '%'+cmpyNameOnly+'%';
		return sqlSession.selectList("mapper.newsMapper.selectChartNewsByCompany", cmpyNameOnly);
	}
	
	@Override
	public List<News> getNewsListByCondition(NewsCondition newsCondition) throws Exception {
		if (newsCondition.getGubun().equals("custom")) {
			String startDate = newsCondition.getStartDate();
			String endDate = newsCondition.getEndDate();
			String sd[] = startDate.split("/");
			String ed[] = endDate.split("/");
			startDate = sd[2] + "-" + sd[0] + "-" + sd[1];
			endDate = ed[2] + "-" + ed[0] + "-" + ed[1];
			newsCondition.setStartDate(startDate);
			newsCondition.setEndDate(endDate);
		}
		
		return sqlSession.selectList("mapper.newsMapper.selectNewsListByCondition",newsCondition);
	}
}