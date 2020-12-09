package com.sobetec.nlp.chart;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

@Primary
@Repository
public class ChartNewsRepository implements ChartNewsRepositoryImpl {

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

	@Override
	public List<News> getChartNewsByCondition(ChartCondition chartCondition) throws Exception {
		if (chartCondition.getGubun().equals("custom")) {
			String startDate = chartCondition.getStartDate();
			String endDate = chartCondition.getEndDate();
			String sd[] = startDate.split("/");
			String ed[] = endDate.split("/");
			startDate = sd[2] + "-" + sd[0] + "-" + sd[1];
			endDate = ed[2] + "-" + ed[0] + "-" + ed[1];
			chartCondition.setStartDate(startDate);
			chartCondition.setEndDate(endDate);
		}
		return sqlSession.selectList("mapper.chartMapper.selectChartNewsByCondition", chartCondition);
	}

	@Override
	public List<Stocks> getChartStocksByCondition(ChartCondition chartCondition) throws Exception {
		if (chartCondition.getGubun().equals("custom")) {
			String startDate = chartCondition.getStartDate();
			String endDate = chartCondition.getEndDate();
			String sd[] = startDate.split("/");
			String ed[] = endDate.split("/");
			startDate = sd[2] + "-" + sd[0] + "-" + sd[1];
			endDate = ed[2] + "-" + ed[0] + "-" + ed[1];
			chartCondition.setStartDate(startDate);
			chartCondition.setEndDate(endDate);
		}
		return sqlSession.selectList("mapper.chartMapper.selectChartStocksByCompany", chartCondition);
	}
}