package com.auth0;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.application.MongoHelper;

public class AuthenticateServlet extends HttpServlet {

    private final NonceGenerator nonceGenerator = new NonceGenerator();

    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
    	try {
    		MongoHelper mh = MongoHelper.getInstance();
        	String json = mh.findOne("oauth", "clientCredentials", null);
    		JSONObject jsonObj = new JSONObject(json);
			servletConfig.getServletContext().setInitParameter("auth0.client_id", jsonObj.getString("clientId"));
			servletConfig.getServletContext().setInitParameter("auth0.client_secret", jsonObj.getString("clientSecret"));
	    	servletConfig.getServletContext().setInitParameter("auth0.domain", jsonObj.getString("domain"));
	 	} catch (JSONException e) {
			e.printStackTrace();
	 	}
    	super.init();
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        NonceStorage nonceStorage = new RequestNonceStorage(request);
        if (!"/favicon.ico".equals(request.getServletPath())) {
            String nonce = nonceGenerator.generateNonce();
            nonceStorage.setState(nonce);
            request.setAttribute("state", nonce);
            request.getRequestDispatcher("login.jsp").forward(request, response);
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }

}
