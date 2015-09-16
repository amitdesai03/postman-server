package com.mashup;

import java.util.List;
import java.util.Map;

public class APICallResponse {
	Map<String, List<String>> httpHeaders;
	String json;

	public Map<String, List<String>> getHttpHeaders() {
		return httpHeaders;
	}

	public void setHttpHeaders(Map<String, List<String>> httpHeaders) {
		this.httpHeaders = httpHeaders;
	}

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

}
