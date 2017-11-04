sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
	"use strict";
	return Controller.extend("com.amol.hanatrialSample.controller.Home", {
        onFBSignInPress:function(evt){
            var othis = this;
            if(!IN.User.isAuthorized()){
                IN.User.authorize(othis.onLoginSuccess, this);
            }else{
                othis.onLoginSuccess(null);
            }
        },
        onLoginSuccess:function(response){
            var othis = this;
            IN.API.Profile('me').fields([
                                        'first-name', 'last-name', // Add these to get the name
                                        'industry', 'positions','picture-url' // Add this one to get the job history
                                      ])
                                      .result(othis.onDisplayMe,othis);
                                      
            //IN.API.Raw("/people/~").result(othis.onDisplayMe,othis);
        },
        onDisplayMe:function(profiles){
            var othis = this;
            othis.getView().byId('idtextName').setText(profiles.values[0].firstName+" "+profiles.values[0].lastName);
            othis.getView().byId('idimgPic').setSrc(profiles.values[0].pictureUrl);
            othis.getView().byId('idlblInd').setText(profiles.values[0].industry);
            var _companyModel = new JSONModel();
            _companyModel.setData({"items":profiles.values[0].positions.values});
            this.getView().setModel(_companyModel,"POSITIONModel");
            _companyModel.updateBindings();
            console.log(profiles);
        }
        
	});
});