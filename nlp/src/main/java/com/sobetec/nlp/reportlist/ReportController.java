package com.sobetec.nlp.reportlist;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 데이터 관리
 * 
 * @author YUJH
 * 
 */
@RestController
public class ReportController {

	protected Log logger = LogFactory.getLog(ReportController.class);
	private static final String EXTERNAL_FILE_PATH = "C:/Users/sdb/Documents/doc_down_test/";
	private final Path filePathpdf;
	private final Path filePathhwp;
	
	@Resource(name = "reportService")
	private ReportService reportService;
	
	
	@Autowired
	public ReportController(ReportFileProperties filePathpdf, ReportFileProperties filePathhwp) {
		this.filePathpdf = Paths.get(filePathpdf.getFilePathpdf()).toAbsolutePath().normalize();
		this.filePathhwp = Paths.get(filePathhwp.getFilePathhwp()).toAbsolutePath().normalize();
	}

	/**
	 * 목록조회 Sample
	 * 
	 * @param SampleVO
	 * @return List
	 * @throws Exception
	 */
//	@PostMapping(path ="/getNewsList")
//	public List<News> getSampleList(News vo) throws Exception {
//		logger.debug("########## start Controller getNewsList");
//		List<News> resultList = new ArrayList<News>();
//
//		resultList = service.getNewsList(vo);
//
//	    return resultList;
//	}


	@PostMapping(path = "/getReportListByCondition")
	public List<Report> getReportListByCondition(ReportCondition reportCondition) throws Exception {
		System.out.println(reportCondition);
		
		return reportService.getReportList(reportCondition);
	}
	
	@RequestMapping("/file/{fileName:.+}")
	public void downloadReport(HttpServletRequest request, HttpServletResponse response, @PathVariable("fileName") String fileName) throws IOException {
		
		/*
		File file = new File(EXTERNAL_FILE_PATH + fileName);
		System.out.println(fileName);
		*/
		
		System.out.println(filePathpdf);
		System.out.println(filePathhwp);
		File file;
		
		if (fileName.substring(fileName.length()-3, fileName.length()).equals("hwp")) {
			file = new File(filePathpdf + "/" + fileName);
		}
		else{
			file = new File(filePathhwp + "/" + fileName);
		}
		
		
		if (file.exists()) {

			//get the mimetype
			String mimeType = URLConnection.guessContentTypeFromName(file.getName());
			if (mimeType == null) {
				mimeType = "application/octet-stream";
			}

			response.setContentType(mimeType);
			response.setHeader("Content-Disposition", String.format("attachment; filename*=UTF-8" + file.getName() + "\""));
			response.setHeader("Content-Transfer-Encoding", "binary");
			response.setContentLength((int) file.length());

			InputStream inputStream = new BufferedInputStream(new FileInputStream(file));

			FileCopyUtils.copy(inputStream, response.getOutputStream());

		}
	}

}
