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
		return sqlSession.selectList("mapper.chartMapper.selectChartStocksByCondition", chartCondition);
	}
	
	@Override
	public List<News> getChartIndustryNewsByCondition(ChartCondition chartCondition) throws Exception {
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
		return sqlSession.selectList("mapper.chartMapper.selectChartIndustryNewsByCondition", chartCondition);
	}
	
	@Override
	public List<News> getChartSystemNewsByCondition(ChartCondition chartCondition) throws Exception {
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
		return sqlSession.selectList("mapper.chartMapper.selectChartSystemNewsByCondition", chartCondition);
	}
	
	@Override
	public List<Stocks> getChartSystemStocksByCondition(ChartCondition chartCondition) throws Exception {
		
		return sqlSession.selectList("mapper.chartMapper.selectChartSystemStocksByCondition", chartCondition);
	}
	
	
	@Override
	public List<Stocks> getChartIndustryStocksByCondition(ChartCondition chartCondition) throws Exception {
		//List<Stocks> a = sqlSession.selectList("mapper.chartMapper.selectChartIndustryStocksByCondition", chartCondition);
		return sqlSession.selectList("mapper.chartMapper.selectChartIndustryStocksByCondition", chartCondition);
	}

	@Override
	public List<News> getChartCompanyNewsByCondition(ChartCondition chartCondition) throws Exception {
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
		return sqlSession.selectList("mapper.chartMapper.selectChartCompanyNewsByCondition", chartCondition);
	}

	@Override
	public List<Stocks> getChartCompanyStocksByCondition(ChartCondition chartCondition) throws Exception {
		return sqlSession.selectList("mapper.chartMapper.selectChartCompanyStocksByCondition", chartCondition);
	}

	@Override
	public List<News> getChartSubsidiaryNewsByCondition(ChartCondition chartCondition) throws Exception {
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
		return sqlSession.selectList("mapper.chartMapper.selectChartSubsidiaryNewsByCondition", chartCondition);
	}

	@Override
	public List<Stocks> getChartSubsidiaryStocksByCondition(ChartCondition chartCondition) throws Exception {
		return sqlSession.selectList("mapper.chartMapper.selectChartSubsidiaryStocksByCondition", chartCondition);
	}
	
	

}