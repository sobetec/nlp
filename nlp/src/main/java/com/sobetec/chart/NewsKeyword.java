package com.sobetec.nlp.sample.model;

public class NewsKeyword {
	private String keyword;
	private float frequency;
	private float tf_idf;

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public float getFrequency() {
		return frequency;
	}

	public void setFrequency(float frequency) {
		this.frequency = frequency;
	}

	public float getTf_idf() {
		return tf_idf;
	}

	public void setTf_idf(float tf_idf) {
		this.tf_idf = tf_idf;
	}

	public NewsKeyword(String keyword, float frequency, float tf_idf) {
		super();
		this.keyword = keyword;
		this.frequency = frequency;
		this.tf_idf = tf_idf;
	}

	@Override
	public String toString() {
		return "NewsKeyword [" + (keyword != null ? "keyword=" + keyword + ", " : "") + "frequency=" + frequency
				+ ", tf_idf=" + tf_idf + "]";
	}

}
