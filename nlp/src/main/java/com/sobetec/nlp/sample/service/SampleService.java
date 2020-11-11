package com.sobetec.nlp.sample.service;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sobetec.nlp.sample.controller.SampleController;
import com.sobetec.nlp.sample.model.SampleVO;
import com.sobetec.nlp.sample.repository.SampleRepositoryImpl;




@Service
public class SampleService {

	protected Log logger = LogFactory.getLog(SampleController.class);

	@Autowired
	private SampleRepositoryImpl ISampleRepository;
    
	/**
	 * 
	 * @param file
	 * @return
	 */
    public List<SampleVO> getSampleList(SampleVO vo) throws Exception {
    	logger.debug("########## start Service getSampleList");

        return ISampleRepository.getSampleList(vo); 
    }
    
    /**
     * 
     * @param file
     * @return
     */
    public int insertSample(SampleVO vo) throws Exception {
    	return ISampleRepository.insertSample(vo); 
    }
    
	/**
	 * 
	 * @param file
	 * @return
	 */
    public SampleVO getSelectSampleDtl(SampleVO vo) throws Exception {
    	logger.debug("########## start Service getSelectDtl");

        return ISampleRepository.getSelectSampleDtl(vo); 
    }
    
    /**
     * 
     * @param file
     * @return
     */
    public int updateSample(SampleVO vo) throws Exception {
    	return ISampleRepository.updateSample(vo); 
    }
	
	/**
	 * 단건 삭제 
	 * @param SampleVO
	 * @return List
	 * @throws Exception
	 */
	public int deleteSample(SampleVO vo) throws Exception {
		return ISampleRepository.deleteSample(vo);
	}
	
	/**
	 * 목록조회 Sample 
	 * @param SampleVO
	 * @return List
	 * @throws Exception
	 */
	public int deleteMultiSample(List<SampleVO> list) throws Exception {
		return ISampleRepository.deleteMultiSample(list);
	}
    
    
}
