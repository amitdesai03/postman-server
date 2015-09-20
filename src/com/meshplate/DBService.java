package com.meshplate;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

@Path("/db")
public class DBService {

	private MongoHelper mh = MongoHelper.getInstance();

	@POST
	@Path("{collectionType}/{operation}")
	public Response post(String requestBody,
			@PathParam("collectionType") String collectionType,
			@PathParam("operation") String operation,
			@QueryParam("key") String key, @QueryParam("value") String value,
			@QueryParam("indexOn") String indexOn) {
		System.out.println("=====REQUEST=======");
		System.out.println(collectionType);
		System.out.println(operation);
		System.out.println(key);
		System.out.println(value);
		System.out.println(indexOn);
		System.out.println(requestBody);
		
		Response response = null;
		if (operation.equals("INDEX")) {
			if (key != null && !collectionType.trim().equalsIgnoreCase("collection_requests")) {
				key = null;
				value = null;
			}
			response = Response.ok(
					mh.findAll(collectionType, key, value, indexOn)).build();
		} else if (operation.equals("PUT")) {
			mh.insert(collectionType, requestBody);
			response = Response.ok().build();
		} else if (operation.equals("GET")) {
			String result = mh.findOne(collectionType, key);
			if (result != "") {
				response = Response.ok(result).build();
			} else {
				response = Response.ok().build();
			}
		} else if (operation.equals("DELETE")) {
			mh.delete(collectionType, key);
			response = Response.ok().build();
		} else if (operation.equals("CLEAR")) {
			mh.delete(collectionType, key);
			response = Response.ok().build();
		}

		System.out.println("=====RESPONSE=======");
		System.out.println(response.getEntity());
		System.out.println();
		return response;
	}

}
