/*global am5,am5themes_Animated,am5percent*/
sap.ui.define(
	[
		"sap/ui/core/Control",
		"com/smod/ux/lib/thirdparty/amcharts/index",
		"com/smod/ux/lib/thirdparty/amcharts/percent",
		"com/smod/ux/lib/thirdparty/amcharts/themes/Animated"
	],
	function (Control, ChartMain, ChartPercent, ChartAnimation) {
		"use strict";
		var root = null;
		var chart = null;
		var series = null;
		var legend = null;

		return Control.extend("com.smod.ux.lib.controls.PieChart", {
			metadata: {
				properties: {
					chartData: {
						type: "object",
						bindable: true
					},
					chartProperties: {
						type: "object",
						bindable: true
					}
				},
				aggregations: {},
				events: {}
			},
			init: function () {
				//initialisation code, in this case, ensure css is imported
				var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
				jQuery.sap.includeStyleSheet(sLibraryPath + "/controls/PieChart.css");
			},

			onAfterRendering: function () {
				root = am5.Root.new(this.getId());

				root.setThemes([am5themes_Animated.new(root)]);

				chart = root.container.children.push(
					am5percent.PieChart.new(root, {
						endAngle: 270
					})
				);

				series = chart.series.push(
					am5percent.PieSeries.new(root, {
						valueField: "value",
						categoryField: "category",
						endAngle: 270
					})
				);

				legend = chart.children.push(
					am5.Legend.new(root, {
						centerX: am5.percent(50),
						x: am5.percent(50),
						y: am5.percent(93),
						centerY: am5.percent(50),
						layout: root.gridLayout
					})
				);

				series.states.create("hidden", {
					endAngle: -90
				});

				series.data.setAll(this.getChartData());
				legend.data.setAll(series.dataItems);
				legend.labels.template.setAll({
					fontSize: 12,
					fontWeight: "400"
				});
				legend.valueLabels.template.setAll({
					fontSize: 12,
					fontWeight: "300"
				});

				series.appear(1000, 200);
			},

			renderer: function (oRM, oControl) {
				oRM.write("<div");
				oRM.writeControlData(oControl);
				oRM.addClass("smod-chart-root");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write("</div>");
			}
		});
	}
);