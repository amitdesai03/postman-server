[![Build Status](https://travis-ci.org/amitdesai03/postman-server.svg)](https://travis-ci.org/amitdesai03/postman-server)

# postman-server
Runs as independent web application using CORS proxy and not as chrome plugin

## About
Postman chrome plugin is excellent rest client. But it does not work on other browsers besides chrome.
Also you are required to install plugin in browser.
With this postman in cloud application, you can avoid such bottlenecks.

## How
Postman cannot be easily migrated to an stand alone web application due to CORS(Cross-Origin Resource Sharing) limitations.
So a http proxy is needed in between by pass CORS restrictions.
All important aspects of postman are migrated as server side application.

## Environment
- Java 1.7+
- Tomcat 7+

## Credits
- Postman chrome plugin -> html/css/js for rendering purpose. (https://github.com/postmanlabs/postman-app-support)
- Landing page by ScoopThemes--> (https://github.com/ScoopThemes/coming-soon)
- CORS http proxy and web application -> Amit Desai

