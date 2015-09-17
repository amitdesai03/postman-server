[![Build Status](https://travis-ci.org/amitdesai03/postman-server.svg)](https://travis-ci.org/amitdesai03/postman-server)

# postman-server
Runs as independent web application using CORS proxy and not as chrome plugin

## About
Postman chrome plugin is excellent rest client. 
Because of that you are required to install plugin in browser.
With this postman in cloud application, you can avoid any installations.

## Environment
- Java 1.7+
- Tomcat 7+
- Chrome browser

## Credits
- Postman chrome plugin -> html/css/js for rendering purpose. (https://github.com/postmanlabs/postman-app-support)
- Landing page by ScoopThemes--> (https://github.com/ScoopThemes/coming-soon)
- CORS http proxy and web application -> Amit Desai

## Why proxy in between
Postman cannot be easily migrated to an stand alone web application due to CORS(Cross-Origin Resource Sharing) limitations.
So a http proxy is needed in between by pass CORS restrictions.

Proxy also allows you to send headers restricted by Chrome and the XMLHttpRequest specification. Due to these restrictions the following headers are blocked:

- Accept-Charset
- Accept-Encoding
- Access-Control-Request-Headers
- Access-Control-Request-Method
- Connection
- Content-Length
- Cookie
- Cookie 2
- Content-Transfer-Encoding
- Date
- Expect
- Host
- Keep-Alive
- Origin
- Referer
- TE
- Trailer
- Transfer-Encoding
- Upgrade
- User-Agent
- Via

These restrictions probably make sense for protecting the user agent but make testing API backends difficult.
Now you can send all the headers mentioned above. Postman does this by automatically prepending 'Postman-' to the restricted headers. The proxy strips out the 'Postman-' marker and sends the header forwards.
