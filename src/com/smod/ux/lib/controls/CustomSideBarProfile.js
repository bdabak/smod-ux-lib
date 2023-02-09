/*global window*/
sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.CustomSideBarProfile", {

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

		init: function () {
			var libraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(libraryPath + "/controls/CustomSideBar.css");
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
					oRM.addClass("bd-side-nav-profile-tabcontent");
					oRM.addClass("bd-side-nav-profile-tabcontent-" + sTabCount);
					oRM.writeClasses();
				}

				oRM.write(">");

				//Profile info begin
				oRM.write("<div");
				oRM.addClass("bd-side-nav-profile-info-content");
				oRM.writeClasses();
				oRM.write(">");
				var sProfilePhoto = oProfileData ? oProfileData.ImageSource :
					sLibraryPath + "/images/loading.gif";
				oRM.writeAttributeEscaped("<img src=\"" + sProfilePhoto + "\"");
				oRM.addClass("bd-side-nav-profile-image");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write("<div");
				oRM.addClass("bd-side-nav-profile-details");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write("<div");
				oRM.addClass("bd-side-nav-profile-details-title");
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