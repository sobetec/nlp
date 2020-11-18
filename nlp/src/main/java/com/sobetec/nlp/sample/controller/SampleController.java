package com.sobetec.nlp.sample.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sobetec.nlp.sample.model.SampleVO;
import com.sobetec.nlp.sample.service.SampleService;

/**
 * 데이터 관리
 * @author YUJH
 * 
 */
@RestController
public class SampleController {

	protected Log logger = LogFactory.getLog(SampleController.class);

	@Resource(name="sampleService")
	private SampleService service;

	/**
	 * 목록조회 Sample 
	 * @param SampleVO
	 * @return List
	 * @throws Exception
	 */
	@PostMapping(path ="/getSampleList")
	public List<SampleVO> getSampleList(SampleVO vo) throws Exception {
		logger.debug("########## start Controller getSampleList");
		List<SampleVO> resultList = new ArrayList<SampleVO>();

		resultList = service.getSampleList(vo);

	    return resultList;
	}
	
	/**
	 * 목록조회 Sample 
	 * @param SampleVO
	 * @return List
	 * @throws Exception
	 */
	@PostMapping(path ="/insertSample")
	public int insertSample(SampleVO vo) throws Exception {
		logger.debug("########## start Controller insertSample");
		int result = 0;
		
		result = service.insertSample(vo);
		
		return result;
	}
	
	/**
	 * 목록조회 Sample 
	 * @param SampleVO
	 * @return List
	 * @throws Exception
	 */
	@PostMapping(path ="/updateSample")
	public int updateSample(SampleVO vo) throws Exception {
		logger.debug("########## start Controller updateSample");
		int result = 0;
		
		result = service.updateSample(vo);
		
		return result;
	}
	
	/**
	 * 목록조회 Sample 
	 * @param SampleVO
	 * @return List
	 * @throws Exception
	 */
	@PostMapping(path ="/selectSampleDtl")
	public SampleVO getSelectSampleDtl(SampleVO vo) throws Exception {
		SampleVO resultVO = service.getSelectSampleDtl(vo);
		return resultVO;
	}
	
	/**
	 * 목록조회 Sample 
	 * @param SampleVO
	 * @return List
	 * @throws Exception
	 */
	@PostMapping(path ="/deleteSample")
	public int deleteSample(SampleVO vo) throws Exception {
		logger.debug("########## start Controller deleteSample");
		int result = 0;
		result = service.deleteSample(vo);
		
		return result;
	}
	
	/**
	 * 목록조회 Sample 
	 * @param SampleVO
	 * @return List
	 * @throws Exception
	 */
	@PostMapping(path ="/deleteMultiSample")
	public int deleteMultiSample(List<SampleVO> list) throws Exception {
		logger.debug("########## start Controller deleteMultiSample");
		int result = 0;
		result = service.deleteMultiSample(list);
		
		return result;
	}

	
	@PostMapping(value="/jsonViewTest")
	public String jsonViewTest(SampleVO vo, HttpServletRequest request) throws Exception {
	    
		ModelAndView mv = new ModelAndView();
	    List<SampleVO> resultList = new ArrayList<SampleVO>();
	        
		resultList = service.getSampleList(vo);
		String result = new ObjectMapper().writeValueAsString(resultList);

		logger.debug("########## resultList : [" + result + "]");

	    
	    return result;
	}

	
}
