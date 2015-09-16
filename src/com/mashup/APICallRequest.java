package com.mashup;

import java.util.List;
import java.util.Map;

public class APICallRequest {
	String url;
	String type;
	String json;
	Map<String, List<String>> httpHeaders;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public Map<String, List<String>> getHttpHeaders() {
		return httpHeaders;
	}

	public void setHttpHeaders(Map<String, List<String>> httpHeaders) {
		this.httpHeaders = httpHeaders;
	}

}
