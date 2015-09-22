package com.application;

import java.net.UnknownHostException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class MongoHelper {
	private static String CONNECTION_STR;
	private static final String DB_NAME = "openshift_5s19ckk4_oimfn8hr";
	public static MongoClient mongoClient;
	public static final MongoHelper mh = new MongoHelper();
	
	static {
		try {
			CONNECTION_STR = System.getProperty("MONGO_CONNECTION_URL");
			mongoClient = new MongoClient(new MongoClientURI(CONNECTION_STR));
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}

	public String findAll(String collectionType, String key, String value,
			String indexOn, String email) {
		DB db = mongoClient.getDB(DB_NAME);
		DBCollection collection = db.getCollection(collectionType);
		DBCursor cursor = null;
		BasicDBObject searchQuery = new BasicDBObject().append("_email", email);
		if (key == null || key.trim().equals("")) {
			cursor = collection.find(searchQuery);
		} else {
			searchQuery = searchQuery.append(key, value);
			cursor = collection.find(searchQuery);
		}
		if (indexOn != null) {
			cursor.sort(new BasicDBObject(indexOn, -1));
		}
		String result = "[";
		while (cursor.hasNext()) {
			result += cursor.next() + ",";
		}
		if (result.length() > 1) {
			result = result.substring(0, result.length() - 1);
		}
		result += "]";
		return result;
	}

	public void insert(String collectionType, String data, String email) {

		DB db = mongoClient.getDB(DB_NAME);
		DBCollection collection = db.getCollection(collectionType);

		Object o = com.mongodb.util.JSON.parse(data);
		BasicDBObject dbObj = (BasicDBObject) o;
		if (!data.contains("_id")) {

			dbObj.append("_id", dbObj.get("id"));

		}
		if(!data.contains("_email")){
			dbObj.append("_email", email);
		}
		collection.save(dbObj);
	}
	
	public void delete(String collectionType, String id, String email) {

		DB db = mongoClient.getDB(DB_NAME);
		DBCollection collection = db.getCollection(collectionType);

		BasicDBObject searchQuery = new BasicDBObject();
		if (id != null) {
			searchQuery.put("_id", id);
		}
		searchQuery.put("_email", email);
		collection.remove(searchQuery);
	}

	public static MongoHelper getInstance() {
		return mh;
	}

	public String findOne(String collectionType, String key, String email) {
		DB db = mongoClient.getDB(DB_NAME);
		DBCollection collection = db.getCollection(collectionType);
		BasicDBObject searchQuery = new BasicDBObject().append("_id", key).append("_email", email);
		DBCursor cursor = collection.find(searchQuery);
		String result = "";
		if (cursor.hasNext()) {
			result += cursor.next();
		}
		return result;
	}
}
