sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/core/HTML"
], function(Control, HTML) {
	"use strict";

	var E = Control.extend("com.smod.ux.lib.controls.HapMessageStrip", {

		metadata: {
			library: "smod.ui5.controls",
			properties: {
				"htmlContent": {
					type: "string"
				},
				"messageType": {
					type: "string",
					defaultValue: "None"
				},
				"showIcon": {
					type: "boolean",
					defaultValue: false
				}
			},
			aggregations: {
				"_htmlContainer": {
					type: "sap.ui.core.HTML",
					multiple: false
				}
			}

		},

		init: function() {
			var libraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(libraryPath + "/controls/HapMessageStrip.css");

			var oHTML = new sap.ui.core.HTML();

			this.setAggregation("_htmlContainer", oHTML);

		},

		onAfterRendering: function() {},

		renderer: function(oRM, oControl) {
			/*First set the HTML content*/
			oControl.getAggregation("_htmlContainer").setContent("<div>" + oControl.getHtmlContent() +
				"</div>");

			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("hapMessageStripMainDiv");
			oRM.addClass("hapMessageType" + oControl.getMessageType());
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("<div");
			oRM.addClass("hapMessageStripContentDiv");
			oRM.writeClasses();
			oRM.write(">");
			if (oControl.getShowIcon()) {
				var sIconPath = (function() {
					switch (oControl.getMessageType()) {
						case "Success":
							return "sap-icon://message-success";
						case "Warning":
							return "sap-icon://message-warning";
						case "Error":
							return "sap-icon://message-error";
						default:
							return "sap-icon://message-information";
					}
				})();
				var oIcon = new sap.ui.core.Icon({
					src: sIconPath
				}).addStyleClass("sapUiTinyMarginBeginEnd hapMessageStripIcon");

				oRM.renderControl(oIcon);
			}
			oRM.renderControl(oControl.getAggregation("_htmlContainer"));
			oRM.write("</div>");
			oRM.write("</div>");
		}
	});

	return E;

});