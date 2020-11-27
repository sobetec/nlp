package com.sobetec.nlp.chart;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sobetec.nlp.chart.ChartNewsController;
import com.sobetec.nlp.chart.ChartQuery;
import com.sobetec.nlp.chart.News;
import com.sobetec.nlp.chart.NewsKeyword;
import com.sobetec.nlp.chart.SentimentDate;
import com.sobetec.nlp.chart.ChartRepositoryImpl;

@Service
public class ChartQueryService {

	protected Log logger = LogFactory.getLog(ChartNewsController.class);

	@Autowired
	private ChartRepositoryImpl repository;

	/**
	 * 
	 * @param file
	 * @return
	 */

	@SuppressWarnings("null")
	public ChartQuery getChartQuery(String cmpyNameOnly) throws Exception {
		System.out.println("########## start Service getChartQuery");
		List<News> allNews = new ArrayList<News>();
		logger.debug("call DB for news");
		allNews = repository.getChartNewsByCompany(cmpyNameOnly);
		logger.debug("Done getting news");
		logger.debug("begin running algos");
		HashMap<String, String> allDates = new HashMap<String, String>();
		List<List<String>> documents = new ArrayList<List<String>>();
		float totalScore = 0;
		HashMap<String, Integer> frequencies = new HashMap<String, Integer>();

		logger.debug("first sweep of all news retrieved");
		for (int i = 0; i < allNews.size(); i++) {
			News currNews = allNews.get(i);
			String[] morphs = currNews.getExtMorp().split(",");
			documents.add(Arrays.asList(morphs));
			for (String morph : morphs) {
				if (frequencies.containsKey(morph)) {
					frequencies.put(morph, frequencies.get(morph) + 1);
				} else {
					frequencies.put(morph, 1);
				}
			}
			float currTaScore = Float.parseFloat(currNews.getTaScre());
			totalScore = totalScore + currTaScore;
			if (allDates.containsKey(currNews.getNewsDate())) {
				allDates.put(currNews.getNewsDate(),
						allDates.get(currNews.getNewsDate()) + "," + String.valueOf(currTaScore));
			} else {
				allDates.put(currNews.getNewsDate(), String.valueOf(currTaScore));
			}
		}

		logger.debug("first sweep done");

		logger.debug("iterate over morphemes");
		// get tf-idfs
		List<NewsKeyword> newsKeywords = new ArrayList<NewsKeyword>();
		int corpusSize = documents.size();
		Iterator<String> morphs = frequencies.keySet().iterator();
		while (morphs.hasNext()) {
			String morph = morphs.next();
//			int docFreq = 0;
//			logger.debug("iterate over all docs");
//			for (int i = 0; i < corpusSize; i++) {
//				if (documents.get(i).contains(morph)) {
//					docFreq++;
//				}
//			}
//			logger.debug("done iterating over docs");
			NewsKeyword tempKeyword = new NewsKeyword(morph, (float) frequencies.get(morph) / corpusSize, 0);
			newsKeywords.add(tempKeyword);
		}
		Collections.sort(newsKeywords, (o1, o2) -> Float.compare(o2.getFrequency(), o1.getFrequency()));
		logger.debug("morpheme iteration done");

		logger.debug("iterate over sentiment dates");
		// Make array of SentimentDates from HashMap
		List<SentimentDate> sentimentDates = new ArrayList<SentimentDate>();
		Iterator<String> keys = allDates.keySet().iterator();
		while (keys.hasNext()) {
			String date = keys.next();
			String[] scores = allDates.get(date).split(",");
			float taScore = 0;
			int nTotalScores = 0;
			for (String a : scores) {
				nTotalScores++;
				taScore = taScore + Float.parseFloat(a);
			}
			SentimentDate tempSentDate = new SentimentDate(date, taScore / nTotalScores);
			sentimentDates.add(tempSentDate);
		}
		float averageScore = totalScore / allNews.size();

		logger.debug("sentiment dates done");
		logger.debug("done running all algos");

		ChartQuery chartQuery = new ChartQuery(allNews, sentimentDates, averageScore, newsKeywords);

		return chartQuery;
	}

}
