package com.sobetec.nlp.reportlist;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

@Primary
@Repository
public class ReportRepository implements ReportRepositoryImpl {

	protected Log log = LogFactory.getLog(ReportController.class);

	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<Report> getReportList(Report vo) throws Exception {
		log.debug("########## start Repository getGetReportList ");

		String mapId = "reportMapper.selectReportList";
		List<Report> sqlResultList = sqlSession.selectList(mapId, vo);

//		log.debug("size:"+sqlResultList);

		return sqlResultList;
	}

	
	@Override
	public List<Report> getReportListByCondition(ReportCondition reportCondition) throws Exception {
		return sqlSession.selectList("mapper.reportMapper.selectReportListByCondition", reportCondition);
	}
	
	
	@Override
	public List<Report> getReportListByCustom(ReportCondition reportCondition) throws Exception {		

		String startDate = reportCondition.getStartDate();
		String endDate = reportCondition.getEndDate();
		String sd[] = startDate.split("/");
		String ed[] = endDate.split("/");

		startDate = sd[2] + "-" + sd[0] + "-" + sd[1];
		endDate = ed[2] + "-" + ed[0] + "-" + ed[1];
		
		reportCondition.setStartDate(startDate);
		reportCondition.setEndDate(endDate);
				
		return sqlSession.selectList("mapper.reportMapper.selectReportListByCustom", reportCondition);
	}
}