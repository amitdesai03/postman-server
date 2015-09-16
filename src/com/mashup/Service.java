package com.mashup;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

@Path("/apicall")
public class Service {
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	public APICallResponse call(APICallRequest request) {
		APICallResponse apiCallResponse = new APICallResponse();
		try {

			Client client = Client.create();
			WebResource webResource = client.resource(request.url);
			WebResource.Builder builder = webResource.header(
					"customRequestedBy", "mashup");
			if (request.httpHeaders != null) {
				for (String key : request.httpHeaders.keySet()) {
					builder = builder.header(key, request.httpHeaders.get(key));
				}
			}

			ClientResponse response = null;
			if (request.type.equalsIgnoreCase("get")) {
				response = builder.get(ClientResponse.class);
			} else if (request.type.equalsIgnoreCase("post")) {
				response = builder.post(ClientResponse.class, request.json);
			}

			if (response.getStatus() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ response.getStatus());
			}

			apiCallResponse.json = response.getEntity(String.class);
			apiCallResponse.httpHeaders = response.getHeaders();
			System.out.println("Output from Server .... \n");
			System.out.println(apiCallResponse.json);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return apiCallResponse;
	}

}