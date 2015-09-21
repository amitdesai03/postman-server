[![Build Status](https://travis-ci.org/amitdesai03/postman-server.svg)](https://travis-ci.org/amitdesai03/postman-server)

# postman-server
Runs as independent web application and not as chrome plugin

## About
Postman chrome plugin is excellent rest client. 
However you are required to install plugin in browser.
With postman in cloud application, you can avoid any installations.
    - support for non-chrome browsers

## Features
- Store request and response on server side instead of local chrome db.
- History/collections/environment are stored seperatly for each user 
- Social OAuth login

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

Proxy also allows you to send headers restricted by Chrome and the XMLHttpRequest specification.

These restrictions probably make sense for protecting the user agent but make testing API backends difficult.

