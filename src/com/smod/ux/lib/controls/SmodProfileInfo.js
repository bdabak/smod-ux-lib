/*global window*/
sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.SmodProfileInfo", {

		metadata: {
			library: "smod.ui5.controls",
			properties: {
				"profileData": {
					type: "object",
					bindable: true
				},
				"tabCount": {
					type: "string",
					bindable: true
				},
				"tabTitle": {
					type: "string",
					bindable: true
				}
			}
		},

		renderer: function (oRM, oControl) {
			var oProfileData = oControl.getProfileData();
			var sTabCount = oControl.getTabCount();
			var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library

			try {
				//Tab content begin
				oRM.write("<div");
				oRM.writeControlData(oControl);
				if (sTabCount) {
					oRM.addClass("smod-page-sidebar-profile-tabcontent");
					oRM.addClass("smod-page-sidebar-profile-tabcontent-" + sTabCount);
					oRM.writeClasses();
				}

				oRM.write(">");

				//Profile info begin
				oRM.write("<div");
				oRM.addClass("smod-page-sidebar-profile-info-content");
				oRM.writeClasses();
				oRM.write(">");
				var sProfilePhoto = oProfileData ? oProfileData.ImageSource :
					sLibraryPath + "/src/images/loading.gif";
				oRM.writeAttributeEscaped("<img src=\"" + sProfilePhoto + "\"");
				oRM.addClass("smod-page-sidebar-profile-image");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write("<div");
				oRM.addClass("smod-page-sidebar-profile-details");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write("<div");
				oRM.addClass("smod-page-sidebar-profile-details-title");
				oRM.writeClasses();
				oRM.write(">" + oProfileData.Title + "</div>");
				if (oProfileData.Line1) oRM.write("<div>" + oProfileData.Line1 + "</div>");
				if (oProfileData.Line2) oRM.write("<div>" + oProfileData.Line2 + "</div>");
				if (oProfileData.Line3) oRM.write("<div>" + oProfileData.Line3 + "</div>");
				oRM.write("</div>");
				oRM.write("</div>");
				//Profile end 

				oRM.write("</div>");
				//Profile content

			} catch (ex) {
				jQuery.sap.log.info("render failed!");
			}
		}
	});

	return E;

});