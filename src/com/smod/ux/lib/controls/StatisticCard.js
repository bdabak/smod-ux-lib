sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/core/IconPool"
], function(Control, IconPool) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.StatisticCard", {
		metadata: {
			properties: {
				icon: {
					type: "string",
					bindable: true
				},
				title: {
					type: "string",
					bindable: true
				},
				bodyType:{
					type: "string",
					bindable: true,
					defaultValue: null
				},
				value: {
					type: "string",
					bindable: true
				},
				unit: {
					type: "string",
					bindable: true
				},
				unitPosition: {
					type: "string",
					bindable: true,
					defaultValue: "Left"
				},
				type: {
					type: "string",
					bindable: true,
					defaultValue: "Primary"
				},
				showUnit: {
					type: "boolean",
					bindable: true,
					defaultValue: true
				}
			},
			aggregations: {}
		},

		init: function() {
			//initialisation code, in this case, ensure css is imported
			var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(sLibraryPath + "/controls/StatisticCard.css");
		},

		renderer: function(oRM, oControl) {

			var sType = oControl.getType() || "";
			var sHeaderClass = "smod-statistic-card-header-primary";
			var sBodyClass = "smod-statistic-card-body-primary";
			var sIconUrl = IconPool.getIconURI(oControl.getIcon());
			var sUnitPos = oControl.getUnitPosition() || "Right";
			var sBodyType = oControl.getBodyType() || "";
			var sTitle = oControl.getTitle() || "";
			var sUnit = oControl.getUnit() || "";
			var bShowUnit = oControl.getShowUnit() || false;
			var sValue = oControl.getValue() || 0;

			switch (sType) {
				case "Success":
					sHeaderClass = "smod-statistic-card-header-success";
					break;
				case "Warning":
					sHeaderClass = "smod-statistic-card-header-warning";
					break;
				case "Info":
					sHeaderClass = "smod-statistic-card-header-info";
					break;
				case "Error":
					sHeaderClass = "smod-statistic-card-header-danger";
					break;
				case "Critical":
					sHeaderClass = "smod-statistic-card-header-rose";
					break;
				default:
					sHeaderClass = "smod-statistic-card-header-primary";
			}
			switch (sBodyType) {
				case "Success":
					sBodyClass = "smod-statistic-card-body-success";
					break;
				case "Warning":
					sBodyClass = "smod-statistic-card-body-warning";
					break;
				case "Info":
					sBodyClass = "smod-statistic-card-body-info";
					break;
				case "Error":
					sBodyClass = "smod-statistic-card-body-danger";
					break;
				case "Critical":
					sBodyClass = "smod-statistic-card-body-rose";
					break;
				default:
					sBodyClass = "smod-statistic-card-body-primary";
			}
			
			

			//Main stat card container
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("smod-statistic-card");
			oRM.addClass(sBodyClass);
			oRM.writeClasses();
			oRM.write(">");

			//Header
			oRM.write("<div");
			oRM.addClass("smod-statistic-card-header");
			oRM.addClass(sHeaderClass);
			oRM.writeClasses();
			oRM.write(">");

			//Icon
			oRM.write("<div");
			oRM.addClass("smod-statistic-card-icon");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("<i>");
			oRM.writeIcon(sIconUrl);
			oRM.write("</i>");
			oRM.write("</div>");
			//Icon

			//Title
			
			oRM.write("<p");
			oRM.addClass("smod-statistic-card-title");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write(sTitle);
			oRM.write("</p>");
			//Title

			//Value
			
			oRM.write("<h3");
			oRM.addClass("smod-statistic-card-value");
			oRM.writeClasses();
			oRM.write(">");
			if ( bShowUnit && sUnit && sUnitPos === "Left") {
				oRM.write("<small>" + sUnit + "</small>&nbsp;");
			}
			try {
				var oFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
					minFractionDigits: 2,
					maxFractionDigits: 2
				});
				oRM.write(oFormat.format(sValue));
			} catch (e) {
				oRM.write("0,00");
			}
			if (bShowUnit && sUnit && sUnitPos === "Right") {
				oRM.write("&nbsp;<small>" + sUnit + "</small>");
			}
			oRM.write("</h3>");
			//Value

			oRM.write("</div>");
			//Header

			//Footer
			oRM.write("<div");
			oRM.addClass("smod-statistic-card-footer");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("</div>");
			//Footer

			oRM.write("</div>");
			//Main

		}
	});

	return E;

});