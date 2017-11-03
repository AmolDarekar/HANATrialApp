sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.amol.hanatrialSample.controller.Home", {
	    

        onFBSignInPress:function(){
            var othis = this;
                      FB.init({
                        appId      : '150666185666979',
                        cookie     : true,  // enable cookies to allow the server to access 
                        xfbml      : true,  // parse social plugins on this page
                        version    : 'v2.5' // use graph api version 2.8
                      });
                      
                 FB.login(function(response) {
                        othis.statusChangeCallback(response);
                    }, {
                        scope: 'public_profile,email'
                    });
                      
        },
        statusChangeCallback:function (response) {
                var othis = this;
                if (response.status === 'connected') {
                      FB.api('/me', function(res) {
                        othis.getView().byId("idtextFBName").setText(res.name);
                        FB.api("/"+res.id+"/picture",
                            function (response) {
                              if (response && !response.error) {
                                    othis.getView().byId("idimgPic").setSrc(response.data.url);
                              }
                            }
                        );
                        
                    });
                    
                    
                } 
        },
        
        
	});
});