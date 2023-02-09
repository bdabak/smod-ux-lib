sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.FlipCard", {
		metadata: {
			properties: {

			},
			aggregations: {
				faces: {
					type: "sap.ui.core.Control",
					multiple: true,
					singularName: "face"
				}
			},
			defaultAggregation: "faces"
		},

		init: function () {
			//initialisation code, in this case, ensure css is imported
			var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(sLibraryPath + "/controls/FlipCard.css");
		},

		renderer: function (oRM, oControl) {
			var oFront = oControl.getAggregation("faces")[0];
			var oBack = oControl.getAggregation("faces")[1];

			var isOneFace = !oBack.getVisible();

			//Main flipcar container
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("smod-flip-card-container");
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("<div"); //Flip-card
			oRM.addClass(isOneFace ? "smod-no-flip-card" : "smod-flip-card");
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("<div"); //Inner
			oRM.addClass("smod-flip-card-inner");
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("<div"); // Front 
			oRM.addClass("smod-flip-card-front");
			oRM.writeClasses();
			oRM.write(">");

			oRM.renderControl(oFront);

			oRM.write("</div>"); // Front 

			if (!isOneFace) {
				oRM.write("<div"); // Back
				oRM.addClass("smod-flip-card-back");
				oRM.writeClasses();
				oRM.write(">");
				oRM.renderControl(oBack);
				oRM.write("</div>"); //Back
			}
			oRM.write("</div>"); //Inner
			oRM.write("</div>"); //Flip card
			oRM.write("</div>"); //Flip card main

		}
	});

	return E;

});