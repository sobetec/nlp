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
			totalScore = totalScore + currTaScore;
			if (allDates.containsKey(currNews.getNewsDate())) {
				allDates.put(currNews.getNewsDate(),
						allDates.get(currNews.getNewsDate()) + "," + String.valueOf(currTaScore));
			} else {
				allDates.put(currNews.getNewsDate(), String.valueOf(currTaScore));
			}
		}

		// logger.debug("first sweep done");
		for (int i = 0; i < allDocFreqs.size(); i++) {
			NewsKeyword currKeyword = allDocFreqs.get(i);
			if (newsKeywordMap.containsKey(currKeyword.getKeyword())) {
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
			newsKeywords.add(newsKeywordMap.get(morph));
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
			float min = Float.parseFloat(scores[0]);
			float lower = Float.parseFloat(scores[(int) Math.ceil(nTotalScores * 0.25) - 1]);
			float median = Float.parseFloat(scores[(int) Math.ceil(nTotalScores * 0.5) - 1]);
			float upper = Float.parseFloat(scores[(int) Math.ceil(nTotalScores * 0.75) - 1]);
			float max = Float.parseFloat(scores[nTotalScores - 1]);
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

}
