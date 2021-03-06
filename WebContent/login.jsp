<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="title" content="ScoopThemes">
    <meta name="ROBOTS" content="Bootstrap 3 Themes, Responsive Themes, Bootstrap 3 Responsive, Wordpress Themes, Clean Themes, Modern Themes, Flat Themes, Flat UI, UI Design, UX Design, Web design, responsive bootstrap, Jquery Plugins, Free Plugins, Premium Bootstrap themes, Bootstrap 3, Premium Web Templates, Bootstrap Templates, Bootstrap Responsive Templates, Admin, Dashboard, Admin Templates, Admin Responsive, Admin responsive themes">
    <meta name="description" content="Solutions For Web Developers Form ( Web Templates, Web Themes, Jquery Plugins, UX Design.. ) Whatever They Need.">
    <meta name="abstract" content="Solutions For Web Developers Form ( Web Templates, Web Themes, Jquery Plugins, UX Design.. ) Whatever They Need.">
   
    <meta name="author" content="www.scoopthemes.com">
    <meta name="publisher" content="www.scoopthemes.com">
    <meta name="copyright" content="www.scoopthemes.com">
    <meta name="revisit-after" content="2 days">
    <link rel="shortcut icon" href="assets/img/favicon.png">

    <title>Postman Cloud</title>

    <!-- Bootstrap -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <link href="assets/css/font-awesome.css" rel="stylesheet">
    <link href="assets/css/bootstrap-theme.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/animations.css">

    <!-- siimple style -->
    <link href="assets/css/style.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    <script src="https://cdn.auth0.com/js/lock-7.9.min.js"></script>
	
    
</head>

<body>
	<script type="text/javascript">
	<%!

    // Converts a relative path into a full path
    // Taken from http://stackoverflow.com/posts/5212336/revisions
   public String buildUrl(HttpServletRequest request, String relativePath) {


    String scheme      =    request.getScheme();        // http
    String serverName  =    request.getServerName();    // hostname.com
    int serverPort     =    request.getServerPort();    // 80
    String contextPath =    request.getContextPath();   // /mywebapp

    // Reconstruct original requesting URL
    StringBuffer url =  new StringBuffer();
    url.append(scheme).append("://").append(serverName);

    if ((serverPort != 80) && (serverPort != 443)) {
        url.append(":").append(serverPort);
    }

    url.append(contextPath).append(relativePath);

    return url.toString();

    }
 %>
	  var lock = new Auth0Lock('IaI1zx6ijeU04zGFlYHkSKXnKAYFYWdp', 'misc.auth0.com');
	  
	  
	  function signin() {
	        lock.show({
	            callbackURL: '<%= buildUrl(request, "/callback") %>'
	          , responseType: 'code'
	          , authParams: {
	              state: '${state}'
	            , scope: 'openid profile'
	            }
	        });
	      }
	</script>
    <div class="cloud floating">
        <img src="assets/img/cloud.png" alt="Scoop Themes">
    </div>

    <div class="cloud pos1 fliped floating">
        <img src="assets/img/cloud.png" alt="Scoop Themes">
    </div>

    <div class="cloud pos2 floating">
        <img src="assets/img/cloud.png" alt="Scoop Themes">
    </div>

    <div class="cloud pos3 fliped floating">
        <img src="assets/img/cloud.png" alt="Scoop Themes">
    </div>


    <div id="wrapper">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <h1>Postman Cloud</h1>
                     <h4>This application is not officially supported by <a href="https://www.getpostman.com">getpostman.com</a></h4>
                   <br/>
                   <% if ( request.getParameter("error") != null ) { %>
				        <%-- TODO Escape and encode ${param.error} properly. It can be done using jstl c:out. --%>
				        <span style="color: red;">${param.error}</span>
				    <% } %>
                    <button onclick="signin()" class="btn btn-theme">Login</button>

                   
                </div>
                
            </div>
            
        </div>
    </div>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="http://downloads.mailchimp.com/js/jquery.form-n-validate.js"></script>
    <script>
        
$(document).ready( function () {
    $('#wrapper').height($(document).height());
    // I only have one form on the page but you can be more specific if need be.
    var $form = $('form');

    if ( $form.length > 0 ) {
        $('form input[type="submit"]').bind('click', function ( event ) {
            if ( event ) event.preventDefault();
            // validate_input() is a validation function I wrote, you'll have to substitute this with your own.
            if ( $form.validate() ) { register($form); }
        });
    }
});

function appendResult(userText , className, iconClass){
  var resultHTML = "<div class='stretchLeft result "+ className + "'>" + userText + " <span class='fa fa-" + iconClass + "'></span>" + "</div>";
  $('body').append(resultHTML);
  $('.result').delay(10000).fadeOut('1000');
}


function register($form) {
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache       : false,
        dataType    : 'json',
        contentType: "application/json; charset=utf-8",
        error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
        success     : function(data) {
            if (data.result != "success") {
                appendResult('Wrong Email Or You Are Already Registered, Try Again', 'error', 'exclamation');
            } else {
                // It worked, carry on...
                appendResult('Successful, Check Your Email For Confirmation ', 'success', 'check');
            }
        }
    });
}
    </script>
	
</body>

</html>
