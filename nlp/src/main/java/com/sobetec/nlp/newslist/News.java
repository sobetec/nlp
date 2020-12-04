package com.sobetec.nlp.newslist;

public class News {
	
	private String cmpyKey;
	private String imptDate;
	private String newsDate;
	private String year;
	private String mont;
	private String day;
	private String qutr;
	private String instCode;
	private String susiCode;
	private String cmpyCode;
	private String cmpyName;
	private String cmpyNameOnly;
	private String taScre;
	private String taScreWord;
	private String newsTtl;
	private String rawData;
	private String extData;
	private String extMorp;
	
	public News() {
		
	}

	
	
	// 뉴스 목록 조회용
	public News(String cmpyKey, String newsDate, String cmpyName, String taScre, String taScreWord, String newsTtl,
			String rawData) {
		super();
		this.cmpyKey = cmpyKey;
		this.newsDate = newsDate;
		this.cmpyName = cmpyName;
		this.taScre = taScre;
		this.taScreWord = taScreWord;
		this.newsTtl = newsTtl;
		this.rawData = rawData;
	}

	public String getCmpyKey() {
		return cmpyKey;
	}

	public void setCmpyKey(String cmpyKey) {
		this.cmpyKey = cmpyKey;
	}

	public String getImptDate() {
		return imptDate;
	}

	public void setImptDate(String imptDate) {
		this.imptDate = imptDate;
	}

	public String getNewsDate() {
		return newsDate;
	}

	public void setNewsDate(String newsDate) {
		this.newsDate = newsDate;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getMont() {
		return mont;
	}

	public void setMont(String mont) {
		this.mont = mont;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	public String getQutr() {
		return qutr;
	}

	public void setQutr(String qutr) {
		this.qutr = qutr;
	}

	public String getInstCode() {
		return instCode;
	}

	public void setInstCode(String instCode) {
		this.instCode = instCode;
	}

	public String getSusiCode() {
		return susiCode;
	}

	public void setSusiCode(String susiCode) {
		this.susiCode = susiCode;
	}

	public String getCmpyCode() {
		return cmpyCode;
	}

	public void setCmpyCode(String cmpyCode) {
		this.cmpyCode = cmpyCode;
	}

	public String getCmpyName() {
		return cmpyName;
	}

	public void setCmpyName(String cmpyName) {
		this.cmpyName = cmpyName;
	}

	public String getCmpyNameOnly() {
		return cmpyNameOnly;
	}

	public void setCmpyNameOnly(String cmpyNameOnly) {
		this.cmpyNameOnly = cmpyNameOnly;
	}

	public String getTaScre() {
		return taScre;
	}

	public void setTaScre(String taScre) {
		this.taScre = taScre;
	}

	public String getTaScreWord() {
		return taScreWord;
	}

	public void setTaScreWord(String taScreWord) {
		this.taScreWord = taScreWord;
	}

	public String getNewsTtl() {
		return newsTtl;
	}

	public void setNewsTtl(String newsTtl) {
		this.newsTtl = newsTtl;
	}

	public String getRawData() {
		return rawData;
	}

	public void setRawData(String rawData) {
		this.rawData = rawData;
	}

	public String getExtData() {
		return extData;
	}

	public void setExtData(String extData) {
		this.extData = extData;
	}

	public String getExtMorp() {
		return extMorp;
	}

	public void setExtMorp(String extMorp) {
		this.extMorp = extMorp;
	}

	@Override
	public String toString() {
		return "News [cmpyKey=" + cmpyKey + ", imptDate=" + imptDate + ", newsDate=" + newsDate + ", year=" + year
				+ ", mont=" + mont + ", day=" + day + ", qutr=" + qutr + ", instCode=" + instCode + ", susiCode="
				+ susiCode + ", cmpyCode=" + cmpyCode + ", cmpyName=" + cmpyName + ", cmpyNameOnly=" + cmpyNameOnly
				+ ", taScre=" + taScre + ", taScreWord=" + taScreWord + ", newsTtl=" + newsTtl + ", rawData=" + rawData
				+ ", extData=" + extData + ", extMorp=" + extMorp + "]";
	}
	
	
	
	

	
}
