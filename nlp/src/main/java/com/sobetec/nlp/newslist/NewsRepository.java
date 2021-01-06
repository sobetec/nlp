package com.sobetec.nlp.newslist;

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
	
	@Override
	public List<Industry> getIndustryList() throws Exception {
		return sqlSession.selectList("mapper.newsMapper.selectIndustryList");
	}
	
	@Override
	public List<Industry> getSubsidiaryList() throws Exception {
		return sqlSession.selectList("mapper.newsMapper.selectSubsidiaryList");
	}
	
	@Override
	public List<News> getNewsListByIndustry(NewsCondition newsCondition) throws Exception {
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
		return sqlSession.selectList("mapper.newsMapper.selectNewsListByIndustry", newsCondition);
	}
	
	@Override
	public List<News> getNewsListByIndustrySystem(NewsCondition newsCondition) throws Exception {
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
		return sqlSession.selectList("mapper.newsMapper.selectNewsListByIndustrySystem", newsCondition);
	}
	
	@Override
	public List<News> getNewsListBySubsidiary(NewsCondition newsCondition) throws Exception {
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
		return sqlSession.selectList("mapper.newsMapper.selectNewsListBySubsidiary", newsCondition);
	}

	@Override
	public List<Company> getCompanyListByCompany(String companyName) throws Exception {
		return sqlSession.selectList("mapper.newsMapper.selectCompanyListByCompany", companyName);
	}

	@Override
	public List<News> getNewsListByCompanyName(NewsCondition newsCondition) throws Exception {
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
		
		return sqlSession.selectList("mapper.newsMapper.selectNewsListByCompanyName",newsCondition);
	}
	
	@Override
	public int getRowCount(NewsCondition newsCondition) throws Exception {
		int rowCount = 0;
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
		
		if(newsCondition.getGubunJaName().equals("company")) {
			rowCount = sqlSession.selectOne("mapper.newsMapper.selectRowCountByCompanyName",newsCondition);
		}else {
			rowCount = sqlSession.selectOne("mapper.newsMapper.selectRowCount",newsCondition);
		}
		
		
//		int rows = rowCount.getRowCount();
		System.out.println("로우카운트="+ rowCount);
		return rowCount;
	}
	
	@Override
	public String getSystemNameByCompany(String companyName) throws Exception {
		String result = sqlSession.selectOne("mapper.newsMapper.selectSystemNameByCompany", companyName);
		System.out.println("getSystemNameByCompany 가져왔니? "+result);
		return result;
	}
	
}