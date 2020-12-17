package com.sobetec.nlp.reportlist;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;

public interface ReportRepositoryImpl {

	List<Report> getReportList(Report req) throws Exception;

	List<Report> getReportListByCondition(ReportCondition reportCondition) throws Exception;
	
	List<Report> getReportListByCustom(ReportCondition reportCondition) throws Exception;
	
}