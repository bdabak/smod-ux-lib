/*global window*/

sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/core/format/NumberFormat",
	"./SmodApexChart"
], function(Control, NumberFormat, SmodApexChart) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.BudgetIndicator", {
		metadata: {
			properties: {
				title: {
					type: "string",
					bindable: true
				},
				type: {
					type: "string",
					bindable: true
				},
				percentage: {
					type: "string",
					bindable: true
				},
				currentValue: {
					type: "string",
					bindable: true
				},
				maxValue: {
					type: "string",
					bindable: true
				},
				unit: {
					type: "string",
					bindable: true
				}
			}
		},

		init: function() {
			//initialisation code, in this case, ensure css is imported
			var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(sLibraryPath + "/controls/BudgetIndicator.css");
		},
		parseDecimal: function(sNum) {
			var f = NumberFormat.getFloatInstance({
				minFractionDigits: 2,
				maxFractionDigits: 2
			});
			return f.format(sNum);
		},
		parseCurrency: function(sNum) {
			return this.parseDecimal(sNum) + " ₺";
		},

		renderer: function(oRM, oControl) {
			var sTitle = oControl.getTitle() || "";
			var sType = oControl.getType() || "Emphasized";
			var sPercentage = parseFloat(oControl.getPercentage()) || 0;
			var sValue = oControl.getCurrentValue();
			var sMax = oControl.getMaxValue();
			//var sUnit = oControl.getUnit();
			var sColor;
			var sFontClass;
			switch (sType) {
				case "Emphasized":
					sColor = "#ffc107";
					sFontClass = "smod-budget-color-emphasized";
					break;
				case "EmphasizedDark":
					sColor = "#FF9800";
					sFontClass = "smod-budget-color-emphasized-dark";
					break;
				case "Accept":
					sColor = "#28a745";
					sFontClass = "smod-budget-color-accept";
					break;
				case "AcceptDark":
					sColor = "#009688";
					sFontClass = "smod-budget-color-accept-dark";
					break;
				case "Reject":
					sColor = "#dc3545";
					sFontClass = "smod-budget-color-reject";
					break;
				case "RejectDark":
					sColor = "#b12835";
					sFontClass = "smod-budget-color-reject-dark";
					break;
				default:
					sColor = "#007bff";
					sFontClass = "smod-budget-color-emphasized";
			}

			sPercentage = isNaN(sPercentage) ? 0 : sPercentage;
			sValue = isNaN(sValue) ? 0 : sValue;
			sMax = isNaN(sMax) ? 0 : sMax;

			var oChartOptions = {
				series: [sPercentage],
				chart: {
					height: 120,
					type: "radialBar"
				},
				colors: [sColor],
				plotOptions: {
					radialBar: {
						hollow: {
							size: "50%"
						},
						dataLabels: {
							name: {
								show: false
							},
							value: {
								offsetY: 0,
								fontSize: "12px",
								formatter: function(value) {
									return oControl.parseDecimal(value) + " %";
									// return [parseFloat(value).toLocaleString("tr-TR", {
									// 	style: "decimal"
									// }), "%"];
								}
							}
						},
						rack: {
							background: "#f7f7f7",
							strokeWidth: "97%",
							margin: 5, // margin is in pixels
							dropShadow: {
								enabled: true,
								top: 2,
								left: 0,
								color: "#999",
								opacity: 1,
								blur: 2
							}
						}
					}
				},
				stroke: {
					lineCap: "round"
				},
				labels: [sTitle]
			};

			var oChart = new SmodApexChart({
				options: oChartOptions
			});

			try {
				//Main content begin
				oRM.write("<div");
				oRM.writeControlData(oControl);
				oRM.addClass("smod-budget-indicator-container");
				oRM.writeClasses();
				oRM.write(">");

				//Title
				oRM.write("<div");
				oRM.addClass("smod-budget-indicator-title");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write(sTitle);
				oRM.write("</div>");

				//Body container
				oRM.write("<div");
				oRM.addClass("smod-budget-indicator-body");
				oRM.writeClasses();
				oRM.write(">");

				//Graph Container
				oRM.write("<div");
				oRM.addClass("smod-budget-indicator-graph-container");
				oRM.writeClasses();
				oRM.write(">");
				oRM.renderControl(oChart);
				oRM.write("</div>");
				//Graph Container

				//Values Container
				oRM.write("<div");
				oRM.addClass("smod-budget-indicator-value-container");
				oRM.writeClasses();
				oRM.write(">");

				//Row Container
				oRM.write("<div");
				oRM.addClass("smod-budget-indicator-value-rows");
				oRM.writeClasses();
				oRM.write(">");

				//Value itself
				oRM.write("<div");
				oRM.addClass("smod-budget-indicator-actual-value");
				oRM.addClass(sFontClass);
				oRM.writeClasses();
				oRM.write(">");
				oRM.write(oControl.parseCurrency(sValue));
				oRM.write("</div>");

				oRM.write("<div");
				oRM.addClass("smod-budget-indicator-separator");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write("</div>");

				oRM.write("<div");
				oRM.addClass("smod-budget-indicator-max-value");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write(oControl.parseCurrency(sMax));
				oRM.write("</div>");

				oRM.write("</div>");
				//Row container 

				oRM.write("</div>");
				//Value container 

				oRM.write("</div>");
				//Body Container

				oRM.write("</div>");
				//Main content
			} catch (ex) {
				jQuery.sap.log.info("render failed!");
			}
		}
	});

	return E;

});