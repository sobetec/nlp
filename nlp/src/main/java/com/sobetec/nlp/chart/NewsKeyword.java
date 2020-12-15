package com.sobetec.nlp.chart;

public class NewsKeyword {
	private String keyword;
	private int subsetDocFreq;
	private int subsetTermCount;
	private int totalDocFreq;
	private float tf_idf;

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public int getSubsetDocFreq() {
		return subsetDocFreq;
	}

	public void setSubsetDocFreq(int subsetDocFreq) {
		this.subsetDocFreq = subsetDocFreq;
	}

	public int getSubsetTermCount() {
		return subsetTermCount;
	}

	public void setSubsetTermCount(int subsetTermCount) {
		this.subsetTermCount = subsetTermCount;
	}

	public int getTotalDocFreq() {
		return totalDocFreq;
	}

	public void setTotalDocFreq(int totalDocFreq) {
		this.totalDocFreq = totalDocFreq;
	}

	public float getTf_idf() {
		return tf_idf;
	}

	public void setTf_idf(float tf_idf) {
		this.tf_idf = tf_idf;
	}

	public NewsKeyword(String keyword, int subsetDocFreq, int subsetTermCount) {
		super();
		this.keyword = keyword;
		this.subsetDocFreq = subsetDocFreq;
		this.subsetTermCount = subsetTermCount;
	}

	public NewsKeyword(String keyword, int totalDocFreq) {
		super();
		this.keyword = keyword;
		this.totalDocFreq = totalDocFreq;
	}

	@Override
	public String toString() {
		return "NewsKeyword [" + (keyword != null ? "keyword=" + keyword + ", " : "") + "subsetDocFreq=" + subsetDocFreq
				+ ", subsetTermCount=" + subsetTermCount + ", totalDocFreq=" + totalDocFreq + ", tf_idf=" + tf_idf
				+ "]";
	}

}
