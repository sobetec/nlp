package com.sobetec.nlp.sample.repository;

import java.util.List;

import com.sobetec.nlp.sample.model.SampleVO;

public interface SampleRepositoryImpl {

	List<SampleVO> getSampleList(SampleVO req) throws Exception;

	int insertSample(SampleVO vo) throws Exception;
	
	SampleVO getSelectSampleDtl(SampleVO vo) throws Exception;
	
	int updateSample(SampleVO vo) throws Exception;

	int deleteSample(SampleVO vo) throws Exception;

	int deleteMultiSample(List<SampleVO> list) throws Exception;

}