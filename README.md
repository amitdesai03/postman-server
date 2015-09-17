# postman-server
Runs as independent web application using CORS proxy and not as chrome plugin

## About
Postman chrome plugin is excellent rest client. 
However it cannot be easily migrated to an stand alone web application due to CORS(Cross-Origin Resource Sharing) limitations.
So a http proxy is needed in between by pass CORS restrictions.
All important aspects of postman are migrated as server side application.

## Environment
- Java 1.7+
- Tomcat 7+

## Credits
- Postman chrome plugin -> html/css/js for rendering purpose.
- CORS http proxy and web application -> Amit Desai

