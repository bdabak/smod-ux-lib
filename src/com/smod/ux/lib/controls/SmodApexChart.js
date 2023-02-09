/*global ApexCharts*/

sap.ui.define([
	"sap/ui/core/Control",
	"../thirdparty/apexcharts/ApexCharts"
], function (Control, ApexLib) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.SmodApexChart", {
		_apexChart: null,
		_isRendered: false,
		metadata: {
			properties: {
				options: {
					type: "object",
					bindable: true
				}
			}
		},
		_renderApex: function (oControl) {

			var oOptions = $.extend(true, {}, oControl.getOptions());

			if (oOptions.hasOwnProperty("chart")) {
				oOptions.chart.locales = [{
					"name": "tr",
					"options": {
						"months": [
							"Ocak",
							"Şubat",
							"Mart",
							"Nisan",
							"Mayıs",
							"Haziran",
							"Temmuz",
							"Ağustos",
							"Eylül",
							"Ekim",
							"Kasım",
							"Aralık"
						],
						"shortMonths": [
							"Oca",
							"Şub",
							"Mar",
							"Nis",
							"May",
							"Haz",
							"Tem",
							"Ağu",
							"Eyl",
							"Eki",
							"Kas",
							"Ara"
						],
						"days": [
							"Pazar",
							"Pazartesi",
							"Salı",
							"Çarşamba",
							"Perşembe",
							"Cuma",
							"Cumartesi"
						],
						"shortDays": ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
						"toolbar": {
							"exportToSVG": "SVG İndir",
							"exportToPNG": "PNG İndir",
							"exportToCSV": "CSV İndir",
							"menu": "Menü",
							"selection": "Seçim",
							"selectionZoom": "Seçim Yakınlaştır",
							"zoomIn": "Yakınlaştır",
							"zoomOut": "Uzaklaştır",
							"pan": "Kaydır",
							"reset": "Yakınlaştırmayı Sıfırla"
						}
					}
				}];
				oOptions.chart.defaultLocale = "tr";
			}

			oControl.ChartOptions = oOptions;

			if (oControl._apexChart) {
				oControl._apexChart.destroy();

			}
			oControl._apexChart = new ApexCharts(
				document.querySelector("#" + this.getId()),
				this.ChartOptions
			);

			oControl._isRendered = true;

			oControl._apexChart.render();
		},
		onAfterRendering: function () {
			var that = this;
			setTimeout(function () {
				that._renderApex(that);
			}, 300);
		},

		init: function () {
			//initialization code, in this case, ensure css is imported
			var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(sLibraryPath + "/thirdparty/apexcharts/ApexCharts.css");
		},

		renderer: function (oRM, oControl) {

			oControl._isRendered = false;
			try {
				//Tab content begin
				oRM.write("<div");
				oRM.writeControlData(oControl);
				oRM.addClass("smodApexChart");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write("</div>");
				//Profile content
			} catch (ex) {
				jQuery.sap.log.info("render failed!");
			}
		}
	});

	return E;

});