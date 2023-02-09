/*global window*/
sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.CustomSideBarStatus", {

		metadata: {
			library: "smod.ui5.controls",
			properties: {
				"statusData": {
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
			var aStatusInfo = oControl.getStatusData();
			var sTabCount = oControl.getTabCount();
			var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			var sCount = 0;

			try {
				//Form status tab content
				oRM.write("<div");
				oRM.writeControlData(oControl);
				if (sTabCount) {
					oRM.addClass("bd-side-nav-profile-tabcontent");
					oRM.addClass("bd-side-nav-profile-tabcontent-" + sTabCount);
					oRM.writeClasses();
				}
				oRM.write(">");

				oRM.write("<div");
				oRM.addClass("bd-side-nav-profile-status");
				oRM.writeClasses();
				oRM.write(">");

				if (aStatusInfo && aStatusInfo.length > 0) {
					oRM.write("<table");
					oRM.addClass("bd-side-nav-profile-status-table");
					oRM.writeClasses();
					oRM.write(">");

					$.each(aStatusInfo, function (sKey, oStatusLine) {
						if (sCount > 3) {
							jQuery.sap.log.error("Max four lines allowed!");
							return false;
						}
						oRM.write("<tr>");
						oRM.write("<td");
						oRM.addClass("bd-side-nav-profile-status-table-row-label");
						oRM.writeClasses();
						oRM.write(">" + oStatusLine.Label + "</td>");
						oRM.write("<td>" + oStatusLine.Value + "</td>");
						oRM.write("</tr>");
						sCount++;
					});

					oRM.write("</table>");

				}
				oRM.write("</div>");
				oRM.write("</div>");
				//Form status tab content

			} catch (ex) {
				jQuery.sap.log.info("render failed!");
			}
		}
	});

	return E;

});