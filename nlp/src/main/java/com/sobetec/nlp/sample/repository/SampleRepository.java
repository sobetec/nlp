package com.sobetec.nlp.sample.repository;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import com.sobetec.nlp.sample.controller.SampleController;
import com.sobetec.nlp.sample.model.SampleVO;


@Primary
@Repository
public class SampleRepository implements SampleRepositoryImpl  {
	
	protected Log log = LogFactory.getLog(SampleController.class);

	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<SampleVO> getSampleList(SampleVO vo) throws Exception {
		log.debug("########## start Repository getGetSampleList ");
		
		String mapId = "sampleMapper.selectSampleList";
		List<SampleVO> sqlResultList = sqlSession.selectList(mapId, vo);
		
		log.debug("size:"+sqlResultList);
		
		return sqlResultList;
	}
	
	@Override
	public int insertSample(SampleVO vo) throws Exception {
		log.debug("########## start Repository insertGetSample ");
		
		String mapId = "sampleMapper.insertSample";
		int sqlResult = sqlSession.insert(mapId, vo);
		
		log.debug("size:"+sqlResult);
		
		return sqlResult;
	}
    
	@Override
    public SampleVO getSelectSampleDtl(SampleVO vo) throws Exception {
		log.debug("########## start Repository getSelectDtl ");
		
		String mapId = "sampleMapper.selectSampleDtl";
		SampleVO sqlResult = sqlSession.selectOne(mapId, vo);
		
		log.debug("size:"+sqlResult);
		
		return sqlResult;
    }
	
	@Override
	public int updateSample(SampleVO vo) throws Exception {
		log.debug("########## start Repository updateSample ");
		
		String mapId = "sampleMapper.updateSample";
		int sqlResult = sqlSession.update(mapId, vo);
		
		log.debug("size:"+sqlResult);
		
		return sqlResult;
	}
	
	@Override
	public int deleteSample(SampleVO vo) throws Exception {
		log.debug("########## start Repository deleteSample ");
		
		String mapId = "sampleMapper.deleteSample";
		int sqlResult = sqlSession.delete(mapId, vo);
		
		log.debug("size:"+sqlResult);
		
		return sqlResult;
	}
	
	@Override
	public int deleteMultiSample(List<SampleVO> list) throws Exception {
		log.debug("########## start Repository deleteMultiSample ");
		
		String mapId = "sampleMapper.insertSample";
		int sqlResult = 0;
		
		if ( list != null ) {
			for ( int i=0; i<list.size(); i++ ) {
				SampleVO vo = (SampleVO)list.get(i); 
				sqlResult = sqlSession.delete(mapId, vo);
				
			}
		}
		log.debug("size:"+sqlResult);
		
		return sqlResult;
	}
	
}