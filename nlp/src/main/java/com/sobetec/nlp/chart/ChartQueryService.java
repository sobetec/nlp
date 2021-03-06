package com.sobetec.nlp.chart;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChartQueryService {

	@Autowired
	private ChartNewsRepositoryImpl repository;

	/**
	 * 
	 * @param file
	 * @return
	 */

	@SuppressWarnings("null")
	public ChartQuery getChartQuery(String cmpyNameOnly) throws Exception {
		System.out.println("########## start Service getChartQuery");
//		float a = 56.90020302862004f;
//		float b = 30.06551590366119f;
//		float c = 5.919497539989776f;
//		float d = 47.54017840669978f;
//		float z = 4.139f;
		float a = 54.562081705365124f;
		float b = 41.87451578313866f;
		float c = 4.451449361711643f;
		float d = 49.31922614866885f;
		float z = 4.139f;
		List<News> allNews = new ArrayList<News>();
		List<Stocks> allStocks = new ArrayList<Stocks>();
		List<NewsKeyword> allDocFreqs = new ArrayList<NewsKeyword>();

		// logger.debug("call DB for news");
		allNews = repository.getChartNewsByCompany(cmpyNameOnly);
		// logger.debug("Done getting news");
		// logger.debug("call DB for stock");
		allStocks = repository.getChartStocksByCompany(cmpyNameOnly);
		// logger.debug("Done getting stock");
		// logger.debug("call DB for keywordFreqs");
		allDocFreqs = repository.getDocFreqCounts();
		// logger.debug("Done getting KeywordFreqs");

		// logger.debug("begin running algos");
		HashMap<String, String> allDates = new HashMap<String, String>();
		List<List<String>> documents = new ArrayList<List<String>>();
		int subsetTermSize = 0;
		float totalScore = 0;
		HashMap<String, NewsKeyword> newsKeywordMap = new HashMap<String, NewsKeyword>();

		// logger.debug("first sweep of all news retrieved");
		for (int i = 0; i < allNews.size(); i++) {
			News currNews = allNews.get(i);
			String[] morphs = currNews.getExtMorp().split(",");
			subsetTermSize = subsetTermSize + morphs.length;
			List<String> tokens = new ArrayList<String>();
			documents.add(Arrays.asList(morphs));
			for (String morph : morphs) {
				if (newsKeywordMap.containsKey(morph)) {
					newsKeywordMap.get(morph).setSubsetTermCount(newsKeywordMap.get(morph).getSubsetTermCount() + 1);

				} else {
					NewsKeyword tempKeyword = new NewsKeyword(morph, 0, 1);
					newsKeywordMap.put(morph, tempKeyword);
				}
				if (!tokens.contains(morph)) {
					tokens.add(morph);
				}
			}
			for (String morph : tokens) {
				newsKeywordMap.get(morph).setSubsetDocFreq(newsKeywordMap.get(morph).getSubsetDocFreq() + 1);
			}
			float currTaScore = 50;
			try {
				currTaScore = Float.parseFloat(currNews.getTaScre());
			} catch (Exception e) {
			}
			float y = (a * (currTaScore - b) / (c + Math.abs(currTaScore - b))) + d;
			float reverseUp;
			if (y > 50) {
				reverseUp = (((y - 50) * (z - 50)) + (50 * (50 + z))) / (100 + z - y);
			} else if (y < 50) {
				reverseUp = ((50 + z) / (y + z)) * y;
			} else {
				reverseUp = 50;
			}
			totalScore = totalScore + (float) reverseUp;
			if (allDates.containsKey(currNews.getNewsDate())) {
				allDates.put(currNews.getNewsDate(),
						allDates.get(currNews.getNewsDate()) + "," + String.valueOf(reverseUp));
			} else {
				allDates.put(currNews.getNewsDate(), String.valueOf(reverseUp));
			}
		}

		// logger.debug("first sweep done");
		for (int i = 0; i < allDocFreqs.size(); i++) {
			NewsKeyword currKeyword = allDocFreqs.get(i);
			if (newsKeywordMap.containsKey(currKeyword.getKeyword())) {
				// System.out.println(currKeyword.getTotalDocFreq());
				newsKeywordMap.get(currKeyword.getKeyword()).setTotalDocFreq(currKeyword.getTotalDocFreq());
			}
		}

		// logger.debug("iterate over morphemes");
		// get tf-idfs
		int fullCorpusSize = 789102;
		int corpusSize = fullCorpusSize - documents.size() + 1;
		Iterator<String> morphs = newsKeywordMap.keySet().iterator();

		List<NewsKeyword> newsKeywords = new ArrayList<NewsKeyword>();

		int testMax = 0;
		while (morphs.hasNext()) {
			String morph = morphs.next();
			// //logger.debug(morph);
			// //logger.debug(newsKeywordMap.get(morph).getSubsetTermCount());
			if (newsKeywordMap.get(morph).getSubsetDocFreq() > testMax) {
				testMax = newsKeywordMap.get(morph).getSubsetDocFreq();
			}
			float termFreq = newsKeywordMap.get(morph).getSubsetTermCount() / (float) subsetTermSize;
			// //logger.debug(termFreq);
			float invDocFreq = (float) (Math.log((float) corpusSize / (newsKeywordMap.get(morph).getTotalDocFreq()
					- newsKeywordMap.get(morph).getSubsetDocFreq() + 1)));
			// //logger.debug(invDocFreq);
			// //logger.debug(termFreq * invDocFreq);
			newsKeywordMap.get(morph).setTf_idf(termFreq * invDocFreq);
			if (newsKeywordMap.get(morph).getTotalDocFreq() != 0) {
				newsKeywords.add(newsKeywordMap.get(morph));
			}
		}
		// logger.debug(testMax);

		Collections.sort(newsKeywords, (o1, o2) -> Float.compare(o2.getTf_idf(), o1.getTf_idf()));
		// logger.debug("morpheme iteration done");

		//
		//
		//
		//
		// logger.debug("iterate over sentiment dates");
		// Make array of SentimentDates from HashMap
		List<SentimentDate> sentimentDates = new ArrayList<SentimentDate>();
		Iterator<String> keys = allDates.keySet().iterator();
		while (keys.hasNext()) {
			String date = keys.next();
			String[] scores = allDates.get(date).split(",");
			int nTotalScores = scores.length;
			Arrays.sort(scores, new Comparator<String>() {
				@Override
				public int compare(final String lhs, String rhs) {
					return Float.parseFloat(lhs) > Float.parseFloat(rhs) ? 1 : -1;
				}
			});
			float taScore = 0;
			for (int i = 0; i < nTotalScores; i++) {
				taScore = taScore + Float.parseFloat(scores[i]);
			}
			// float min = Float.parseFloat(scores[0]);
			float min = Float.parseFloat(scores[(int) Math.ceil(nTotalScores * 0.25) - 1]);
			float lower = Float.parseFloat(scores[(int) Math.ceil(nTotalScores * 0.30) - 1]);
			float median = Float.parseFloat(scores[(int) Math.ceil(nTotalScores * 0.5) - 1]);
			float upper = Float.parseFloat(scores[(int) Math.ceil(nTotalScores * 0.70) - 1]);
			float max = Float.parseFloat(scores[(int) Math.ceil(nTotalScores * 0.75) - 1]);
			// float max = Float.parseFloat(scores[nTotalScores - 1]);
			// mean = mean / nTotalScores;
			SentimentDate tempSentDate = new SentimentDate(date, taScore / nTotalScores, min, lower, median, upper,
					max);
			sentimentDates.add(tempSentDate);
		}
		float averageScore = totalScore / allNews.size();

		// logger.debug("sentiment dates done");
		// logger.debug("done running all algos");

		ChartQuery chartQuery = new ChartQuery(allNews, sentimentDates, averageScore, newsKeywords, allStocks);

		return chartQuery;
	}

	public ChartQuery getChartQueryByCondition(ChartCondition chartCondition) throws Exception {
//		float a = 56.90020302862004f;
//		float b = 30.06551590366119f;
//		float c = 5.919497539989776f;
//		float d = 47.54017840669978f;
//		float z = 4.139f;
		float a = 54.562081705365124f;
		float b = 41.87451578313866f;
		float c = 4.451449361711643f;
		float d = 49.31922614866885f;
		float z = 4.139f;
		System.out.println("########## start Service getChartQueryCondition");
		List<News> allNews = new ArrayList<News>();
		List<Stocks> allStocks = new ArrayList<Stocks>();
		List<LineData> allCredits = new ArrayList<LineData>();
		List<LineData> allSales = new ArrayList<LineData>();
		List<LineData> allGrades = new ArrayList<LineData>();
		List<LineData> allGrades2 = new ArrayList<LineData>();
		List<NewsKeyword> allDocFreqs = new ArrayList<NewsKeyword>();

		if (chartCondition.getGubunJaName().equals("industry")) {
			if (chartCondition.getSelectedName().contains("_system")) {
				String name = chartCondition.getSelectedName();
				System.out.println("차트쿼리 셀랙트네임 전달 : " + name.substring(0, name.length() - 7));
				chartCondition.setSelectedName(name.substring(0, name.length() - 7));
				System.out.println(chartCondition);
				allNews = repository.getChartSystemNewsByCondition(chartCondition);
				allStocks = repository.getChartSystemStocksByCondition(chartCondition);
				allCredits = repository.getChartCreditsByCondition(chartCondition);
				allSales = repository.getChartSalesByCondition(chartCondition);
				allGrades = repository.getChartGradesByCondition(chartCondition);
			} else {
				allNews = repository.getChartIndustryNewsByCondition(chartCondition);
				allStocks = repository.getChartIndustryStocksByCondition(chartCondition);
				allCredits = repository.getChartCreditsByCondition(chartCondition);
				allSales = repository.getChartSalesByCondition(chartCondition);
				allGrades = repository.getChartGradesByCondition(chartCondition);
			}

		} else if (chartCondition.getGubunJaName().equals("subsidiary")) {
			allNews = repository.getChartSubsidiaryNewsByCondition(chartCondition);
			allStocks = repository.getChartSubsidiaryStocksByCondition(chartCondition);
			allCredits = repository.getChartCreditsByCondition(chartCondition);
			allSales = repository.getChartSalesByCondition(chartCondition);
			allGrades = repository.getChartGradesByCondition(chartCondition);
		} else if (chartCondition.getGubunJaName().equals("company")) {
			allNews = repository.getChartCompanyNewsByCondition(chartCondition);
			allStocks = repository.getChartCompanyStocksByCondition(chartCondition);
			allCredits = repository.getChartCreditsByCondition(chartCondition);
			allSales = repository.getChartSalesByCondition(chartCondition);
			allGrades = repository.getChartGradesByCondition(chartCondition);
			allGrades2 = repository.getChartGrades2ByCondition(chartCondition);
		} else if (chartCondition.getGubunJaName().equals("keyword")) {
			allNews = repository.getChartNewsByCondition(chartCondition);
			allStocks = repository.getChartStocksByCondition(chartCondition);
		}
		System.out.println("Done making queries");
		allDocFreqs = repository.getDocFreqCounts();

		HashMap<String, String> allDates = new HashMap<String, String>();
		List<List<String>> documents = new ArrayList<List<String>>();
		int subsetTermSize = 0;
		float totalScore = 0;
		HashMap<String, NewsKeyword> newsKeywordMap = new HashMap<String, NewsKeyword>();
		// logger.debug("first sweep of all news retrieved");
		for (int i = 0; i < allNews.size(); i++) {
			News currNews = allNews.get(i);
			String[] morphs = currNews.getExtMorp().split(",");
			subsetTermSize = subsetTermSize + morphs.length;
			List<String> tokens = new ArrayList<String>();
			documents.add(Arrays.asList(morphs));
			for (String morph : morphs) {
				if (newsKeywordMap.containsKey(morph)) {
					newsKeywordMap.get(morph).setSubsetTermCount(newsKeywordMap.get(morph).getSubsetTermCount() + 1);

				} else {
					NewsKeyword tempKeyword = new NewsKeyword(morph, 0, 1);
					newsKeywordMap.put(morph, tempKeyword);
				}
				if (!tokens.contains(morph)) {
					tokens.add(morph);
				}
			}
			for (String morph : tokens) {
				newsKeywordMap.get(morph).setSubsetDocFreq(newsKeywordMap.get(morph).getSubsetDocFreq() + 1);
			}
			float currTaScore = 50;
			try {
				currTaScore = Float.parseFloat(currNews.getTaScre());
			} catch (Exception e) {
			}
			totalScore = totalScore + currTaScore;

			float y = (a * (currTaScore - b) / (c + Math.abs(currTaScore - b))) + d;
			float reverseUp;
			if (y > 50) {
				reverseUp = (((y - 50) * (z - 50)) + (50 * (50 + z))) / (100 + z - y);
			} else if (y < 50) {
				reverseUp = ((50 + z) / (y + z)) * y;
			} else {
				reverseUp = 50;
			}
			// float reverseUp = currTaScore;
			// totalScore = totalScore + reverseUp;
			if (allDates.containsKey(currNews.getNewsDate())) {
				allDates.put(currNews.getNewsDate(),
						allDates.get(currNews.getNewsDate()) + "," + String.valueOf(reverseUp));
			} else {
				allDates.put(currNews.getNewsDate(), String.valueOf(reverseUp));
			}
		}
		for (int i = 0; i < allDocFreqs.size(); i++) {
			NewsKeyword currKeyword = allDocFreqs.get(i);
			if (newsKeywordMap.containsKey(currKeyword.getKeyword())) {
				newsKeywordMap.get(currKeyword.getKeyword()).setTotalDocFreq(currKeyword.getTotalDocFreq());
			}
		}

		System.out.println("Iterate over morphemes");
		int fullCorpusSize = 789102;
		int corpusSize = fullCorpusSize - documents.size() + 1;
		Iterator<String> morphs = newsKeywordMap.keySet().iterator();

		List<NewsKeyword> newsKeywords = new ArrayList<NewsKeyword>();

		int testMax = 0;
		while (morphs.hasNext()) {
			String morph = morphs.next();
			if (newsKeywordMap.get(morph).getSubsetDocFreq() > testMax) {
				testMax = newsKeywordMap.get(morph).getSubsetDocFreq();
			}
			float termFreq = newsKeywordMap.get(morph).getSubsetTermCount() / (float) subsetTermSize;
			// //logger.debug(termFreq);
			float invDocFreq = (float) (Math.log((float) corpusSize / (newsKeywordMap.get(morph).getTotalDocFreq()
					- newsKeywordMap.get(morph).getSubsetDocFreq() + 1)));
			newsKeywordMap.get(morph).setTf_idf(termFreq * invDocFreq);
			if (newsKeywordMap.get(morph).getTotalDocFreq() != 0) {
				newsKeywords.add(newsKeywordMap.get(morph));
			}
		}

		Collections.sort(newsKeywords, (o1, o2) -> Float.compare(o2.getTf_idf(), o1.getTf_idf()));
		System.out.println("Prepare rest of data");
		List<SentimentDate> sentimentDates = new ArrayList<SentimentDate>();
		Iterator<String> keys = allDates.keySet().iterator();
		int nDates = 0;

		int minDiff = 2;
		while (keys.hasNext()) {
			String date = keys.next();
			String[] scores = allDates.get(date).split(",");
			int nTotalScores = scores.length;
			Arrays.sort(scores, new Comparator<String>() {
				@Override
				public int compare(final String lhs, String rhs) {
					return Float.parseFloat(lhs) > Float.parseFloat(rhs) ? 1 : -1;
				}
			});
			float taScore = 0;
//			System.out.println(date + "\t" + nTotalScores);
			for (int i = 0; i < nTotalScores; i++) {
				taScore = taScore + Float.parseFloat(scores[i]);
//				System.out.println(scores[i]);
			}

//			System.out.println("--------------------------------");
			// float min = Float.parseFloat(scores[0]);
			int minPercentile = (int) Math.floor(nTotalScores * 0.0);// - 1;
//			int minPercentile = 0;
			int lowerPercentile = (int) Math.floor(nTotalScores * 0.25) - 1;
			int medianPercentile = (int) Math.floor(nTotalScores * 0.5) - 1;
			int upperPercentile = (int) Math.floor(nTotalScores * 0.75) - 1;
			int maxPercentile = (int) Math.floor(nTotalScores * 1) - 1;
//			int maxPercentile = nTotalScores - 1;

			float average = 0;
			for (int i = 0; i < scores.length; i++) {
				average += Float.parseFloat(scores[i]);
			}
			average = average / nTotalScores;

			float min, lower, median, upper, max;
			if (nTotalScores == 4) {
				min = Float.parseFloat(scores[0]);
				lower = Float.parseFloat(scores[1]);
				median = (Float.parseFloat(scores[1]) + Float.parseFloat(scores[2])) / 2;
				upper = Float.parseFloat(scores[2]);
				max = Float.parseFloat(scores[3]);
			} else if (nTotalScores == 3) {
				min = Float.parseFloat(scores[0]);
				lower = (Float.parseFloat(scores[1]) + Float.parseFloat(scores[0])) / 2;
				median = Float.parseFloat(scores[1]);
				upper = (Float.parseFloat(scores[1]) + Float.parseFloat(scores[2])) / 2;
				max = Float.parseFloat(scores[2]);
			} else if (nTotalScores == 2) {
				min = Float.parseFloat(scores[0]);
				max = Float.parseFloat(scores[1]);
				median = (Float.parseFloat(scores[1]) + Float.parseFloat(scores[0])) / 2;
				lower = (min + median) / 2;
				upper = (max + median) / 2;
			} else if (nTotalScores == 1) {
				median = Float.parseFloat(scores[0]);
				min = median - 2 * minDiff;
				max = median + 2 * minDiff;
				lower = median - minDiff;
				upper = median + minDiff;
			} else {
				min = Float.parseFloat(scores[minPercentile]);
				lower = Float.parseFloat(scores[lowerPercentile]);
				median = Float.parseFloat(scores[medianPercentile]);
				upper = Float.parseFloat(scores[upperPercentile]);
				max = Float.parseFloat(scores[maxPercentile]);

			}

			SentimentDate tempSentDate = new SentimentDate(date, taScore / nTotalScores, min, lower, median, upper, max,
					nTotalScores);
			sentimentDates.add(tempSentDate);
			nDates += 1;
		}
		float averageScore = totalScore / allNews.size();
		System.out.println("Done with all backend");

		ChartQuery chartQuery = new ChartQuery(allNews, sentimentDates, averageScore, newsKeywords, allStocks,
				allCredits, allSales, allGrades, allGrades2);

		return chartQuery;
	}

}
