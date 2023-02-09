sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/core/IconPool"
], function(Control, IconPool) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.SideNavigationHeader", {
		metadata: {
			properties: {
				title: {
					type: "string",
					bindable: true
				}
			},
			aggregations: {
			}
		},

		init: function() {},

		renderer: function(oRM, oControl) {
			//Content header begin
			oRM.write("<header");
			oRM.writeControlData(oControl);
			oRM.addClass("smod-side-nav-content-header");
			oRM.writeClasses();
			oRM.write(">");

			//Toolbar begin
			oRM.write("<div");
			oRM.addClass("smod-side-nav-content-toolbar");
			oRM.writeClasses();
			oRM.write(">");

			//Button begin
			oRM.write("<div>");
			oRM.write("<div");
			oRM.addClass("smod-side-nav-content-btn-cnt");
			oRM.writeClasses();
			oRM.write(">");

			//Button <
			oRM.write("<button");
			oRM.addClass("smod-side-nav-content-btn toggle-menu");
			oRM.writeClasses();
			oRM.write(">");

			oRM.writeIcon(IconPool.getIconURI("sap-icon://menu2"));

			oRM.write("</button>");
			//Button >

			oRM.write("</div>");
			oRM.write("</div>");
			//Button end
			
			//Header text <
			oRM.write("<div");
			oRM.addClass("smod-side-nav-content-header-text");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write(oControl.getProperty("title"));
			oRM.write("</div>");
			//Header text >
			
			oRM.write("</div>");
			//Toolbar end

			oRM.write("</header>");
			//Content header end

		}

	});

	return E;

});