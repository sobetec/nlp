package com.sobetec.nlp.chart;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

@Primary
@Repository
public class ChartNewsRepository implements ChartNewsRepositoryImpl {

	protected Log log = LogFactory.getLog(ChartNewsController.class);

	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<News> getChartNewsByCompany(String cmpyNameOnly) throws Exception {
//		String likelike = '%'+cmpyNameOnly+'%';
		return sqlSession.selectList("mapper.chartMapper.selectChartNewsByCompany", cmpyNameOnly);
	}

	@Override
	public List<Stocks> getChartStocksByCompany(String cmpyNameOnly) throws Exception {
		return sqlSession.selectList("mapper.chartMapper.selectChartStocksByCompany", cmpyNameOnly);
	}

	@Override
	public List<NewsKeyword> getDocFreqCounts() throws Exception {
		return sqlSession.selectList("mapper.chartMapper.getDocFreqCounts");
	}
	
	@Override
	public List<Integer> getAllNewCount() throws Exception {
		return sqlSession.selectList("mapper.chartMapper.getAllNewsCount");
	}
}