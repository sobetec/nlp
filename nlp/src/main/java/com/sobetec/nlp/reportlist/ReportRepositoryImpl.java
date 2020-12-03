package com.sobetec.nlp.reportlist;

import java.util.List;

public interface ReportRepositoryImpl {

	List<Report> getReportList(Report req) throws Exception;

	List<Report> getReportListByCondition(ReportCondition reportCondition) throws Exception;


}