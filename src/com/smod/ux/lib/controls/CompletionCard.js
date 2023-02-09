/*global window*/

sap.ui.define([
	"sap/ui/core/Control",
	"./SmodApexChart",
	"sap/ui/core/format/NumberFormat"
], function(Control, SmodApexChart, NumberFormat) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.CompletionCard", {
		metadata: {
			properties: {
				percentage: {
					type: "string",
					bindable: true
				},
				bgColor: {
					type: "string",
					bindable: true
				},
				color: {
					type: "string",
					bindable: true
				}
			}
		},

		init: function() {
			//initialisation code, in this case, ensure css is imported
			var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(sLibraryPath + "/controls/CompletionCard.css");
		},

		renderer: function(oRM, oControl) {
			var oFormat = NumberFormat.getFloatInstance({
				maxFractionDigits: 2	
			});
			var sPercentage = oFormat.format(oControl.getPercentage());
			var sBgColor = oControl.getBgColor();
			var sColor = oControl.getColor();

			try {
				//Main content begin
				oRM.write("<div");
				oRM.writeControlData(oControl);
				oRM.addClass("smod-completion-card-container");
				oRM.writeClasses();
				oRM.addStyle("background-color", sBgColor);
				oRM.writeStyles();
				oRM.write(">");

				//Graph Container
				oRM.write("<div");
				oRM.addClass("smod-completion-card-text");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write("<span");
				oRM.addStyle("color", sColor);
				oRM.writeStyles();
				oRM.write(">");
				oRM.write(sPercentage);
				oRM.write("</span>");
				oRM.write("</div>");
				//Graph Container

				oRM.write("</div>");
				//Main content
			} catch (ex) {
				jQuery.sap.log.info("render failed!");
			}
		}
	});

	return E;

});