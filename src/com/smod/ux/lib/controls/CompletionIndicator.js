/*global window*/

sap.ui.define([
	"sap/ui/core/Control",
	"./SmodApexChart",
	"sap/ui/core/format/NumberFormat"
], function(Control, SmodApexChart, NumberFormat) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.CompletionIndicator", {
		metadata: {
			properties: {
				percentage: {
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
			jQuery.sap.includeStyleSheet(sLibraryPath + "/controls/CompletionIndicator.css");
		},

		renderer: function(oRM, oControl) {
			var sPercentage = parseFloat(oControl.getPercentage());
			var sColor = oControl.getColor();

			var oChartOptions = {
				series: [sPercentage],
				chart: {
					type: "radialBar",
					offsetY: -10,
					sparkline: {
						enabled: true
					}
				},
				colors: [sColor],
				plotOptions: {
					radialBar: {
						startAngle: -90,
						endAngle: 90,
						track: {
							background: "#e7e7e7",
							strokeWidth: "100%"
								/*margin: 5, // margin is in pixels
								dropShadow: {
									enabled: true,
									top: 2,
									left: 0,
									color: "#999",
									opacity: 1,
									blur: 2
								}*/
						},
						dataLabels: {
							name: {
								show: false
							},
							value: {
								offsetY: -2,
								fontSize: "12px",
								formatter: function(val) {
									var f = NumberFormat.getFloatInstance({
										maxFractionDigits: 2
									});
									return f.format(val);
								}
							}

						}
					}
				}
			};

			var oChart = new SmodApexChart({
				options: oChartOptions
			});

			try {
				//Main content begin
				oRM.write("<div");
				oRM.writeControlData(oControl);
				oRM.addClass("smod-completion-indicator-container");
				oRM.writeClasses();
				oRM.write(">");

				//Graph Container
				oRM.write("<div");
				oRM.addClass("smod-completion-indicator-graph-container");
				oRM.writeClasses();
				oRM.write(">");
				oRM.renderControl(oChart);
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