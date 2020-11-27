package com.sobetec.nlp.reportlist;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sobetec.nlp.reportlist.ReportController;
import com.sobetec.nlp.reportlist.Report;
import com.sobetec.nlp.reportlist.ReportCondition;
import com.sobetec.nlp.reportlist.ReportRepositoryImpl;




@Service
public class ReportService {

	protected Log logger = LogFactory.getLog(ReportController.class);

	@Autowired
	private ReportRepositoryImpl repository;
    
	/**
	 * 
	 * @param file
	 * @return
	 */
    
    public List<Report> getReportList(ReportCondition reportCondition) throws Exception {
    	logger.debug("########## start Service getReportListCondition");
    	List<Report> listReport = new ArrayList<Report>();
    	listReport = repository.getReportListByCondition(reportCondition);
    	
    	for(int i = 0; i < listReport.size(); i++) {
    		
    		if (listReport.get(i).getTaScre() != null) {

        		Double tempScore = Double.parseDouble(listReport.get(i).getTaScre());
        		
        		if (tempScore > 60) {
        			listReport.get(i).setTaScre("긍정");
        		}
        		else if (tempScore < 40) {
        			listReport.get(i).setTaScre("부정");
        		}
        		else {	
        			listReport.get(i).setTaScre("중립");
        		}
    		} else {
    		
    			listReport.get(i).setTaScre("없음");
    		}
    	}
    	
        return listReport; 
    }
    
}
