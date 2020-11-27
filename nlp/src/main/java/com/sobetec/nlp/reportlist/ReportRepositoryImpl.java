package com.sobetec.nlp.reportlist;

import java.util.List;

import com.sobetec.nlp.reportlist.Report;
import com.sobetec.nlp.reportlist.ReportCondition;

public interface ReportRepositoryImpl {

	List<Report> getReportList(Report req) throws Exception;

	List<Report> getReportListByCondition(ReportCondition reportCondition) throws Exception;


}