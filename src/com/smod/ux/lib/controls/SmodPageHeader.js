/*global window*/
sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.SmodPageHeader", {

		metadata: {
			library: "smod.ui5.controls",
			properties: {
				"title": {
					type: "string",
					bindable: true
				},
				"showNavButton": {
					type: "boolean",
					bindable: true
				}
			}

		},

		renderer: function (oRM, oControl) {
			oRM.write("<div"); //Div header
			oRM.writeControlData(oControl);
			oRM.addClass("smod-page-header");
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("<button");
			oRM.addClass("smod-page-button smod-page-toggle-button");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("</button>");

			oRM.write("<span");
			oRM.addClass("smod-page-header-title");
			oRM.writeClasses();
			oRM.write(">");
			oRM.writeEscaped(oControl.getTitle());
			oRM.write("</span>");

			oRM.write("<button");
			oRM.addClass("smod-page-button smod-page-back-right-button");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("</button>");

			oRM.write("</div>");

		}
	});

	E.prototype.ontap = function (e) {

	};

	return E;

});