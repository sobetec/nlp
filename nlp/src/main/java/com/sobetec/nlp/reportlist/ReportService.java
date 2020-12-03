package com.sobetec.nlp.reportlist;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




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
    	
    	if(reportCondition.getGubun().equals("custom")) {
    		listReport = repository.getReportListByCustom(reportCondition);
    	}
    	else {
    		listReport = repository.getReportListByCondition(reportCondition);
    	}    	
    	
    	for(int i = 0; i < listReport.size(); i++) {
    		
    		if (listReport.get(i).getTaScre() != null) {

        		Double tempScore = Double.parseDouble(listReport.get(i).getTaScre());
        		
        		if (tempScore > 60) {
        			listReport.get(i).setTaScreWord("긍정");
        		}
        		else if (tempScore < 40) {
        			listReport.get(i).setTaScreWord("부정");
        		}
        		else {	
        			listReport.get(i).setTaScreWord("중립");
        		}
    		} else {
    		
    			listReport.get(i).setTaScreWord("없음");
    		}
    		
    		String[] tempArray = listReport.get(i).getPropNoun().split(",");
    		List asList = Arrays.asList(tempArray);
        	Set<String> mySet = new HashSet<String>(asList);

        	String tempNoun = "";
        	int j = 1;
        	for(String s: mySet){
        		//System.out.println(s + " " + Collections.frequency(asList,s));
        		if(j == 1) {
        			tempNoun = tempNoun + s;
        			}
        		else {
        			tempNoun = tempNoun + "," + s;
        		}
        		j++;
        	}
        	listReport.get(i).setPropNoun(tempNoun);
        }    	
    	
        return listReport; 
    }
    
}
