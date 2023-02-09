sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";

	var E = Control.extend("com.smod.ux.lib.controls.ComparisonTableCell", {

		metadata: {
			library: "smod.ui5.controls",
			properties: {
				"cellData": {
					type: "object",
					bindable: true
				},
				"cellGroup": {
					type: "string",
					bindable: true
				}
			},
			aggregations: {
				content: {
					type: "sap.ui.core.Control",
					multiple: false
				}
			},
			events: {

			}

		},
		init: function () {},

		_renderBodyCell: function (oRM, oControl, oCellData) {

			var sRowStyle = "";
			if (oCellData.ColumnIndex % 2 === 0) {
				if (oCellData.RowIndex % 2 === 0) {
					sRowStyle = "row_style_3";
				} else {
					sRowStyle = "row_style_1";
				}
			} else {
				if (oCellData.RowIndex % 2 === 0) {
					sRowStyle = "row_style_4";
				} else {
					sRowStyle = "row_style_2";
				}

			}

			oRM.write("<li"); // Div 1 begin
			oRM.writeControlData(oControl);
			if (oCellData.Type === "HeaderEmpty") {
				oRM.addClass("css3_grid_row_1 header_row css3_grid_row_1_responsive");
			} else if (oCellData.Type === "Header") {
				oRM.addClass("css3_grid_row_1 header_row css3_grid_row_1_responsive align_center");
			} else if (oCellData.Type === "RowLabel") {
				oRM.addClass("css3_grid_row_" + oCellData.RowIndex);

				oRM.addClass(sRowStyle);
				oRM.addClass("css3_grid_row_" + oCellData.RowIndex + "_responsive");
			} else if (oCellData.Type === "RowValue") {
				oRM.addClass("css3_grid_row_" + oCellData.RowIndex);
				oRM.addClass(sRowStyle);
				oRM.addClass("css3_grid_row_" + oCellData.RowIndex + "_responsive");
				oRM.addClass("align_center");
			}
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("<span");
			oRM.addClass("css3_grid_vertical_align_table");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("<span");
			oRM.addClass("css3_grid_vertical_align");
			oRM.writeClasses();
			oRM.write(">");
			if (oCellData.Type === "HeaderEmpty") {
				oRM.write("<h2");
				oRM.addClass("caption header_col");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write(oCellData.Value);
				oRM.write("</h2>");
			} else if (oCellData.Type === "Header") {
				oRM.write("<h2");
				oRM.addClass("header_col");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write(oCellData.Value);
				oRM.write("</h2>");
			} else if (oCellData.Type === "RowLabel") {
				oRM.write("<span>");
				oRM.write(oCellData.Value);
				oRM.write("</span>");
			} else if (oCellData.Type === "RowValue") {
				oRM.write("<span>");
				oRM.write(oCellData.Value);
				oRM.write("</span>");
			}

			oRM.write("</span>");
			oRM.write("</span>");
			oRM.write("</li>"); //Div 1 end

		},

		_renderFooterCell: function (oRM, oControl, oCellData) {
			var sColSpanClass = "col_span_" + oCellData.ColSpan;
			oRM.write("<div"); // Div 1 begin
			oRM.writeControlData(oControl);
			if (oCellData.Type === "FooterLabel") {
				oRM.addClass("css3_grid_row_1 footer_row_label css3_grid_row_1_responsive");
			} else if (oCellData.Type === "FooterValue") {
				oRM.addClass("css3_grid_row_1 footer_row_value css3_grid_row_1_responsive align_center");
			}
			oRM.addClass(sColSpanClass);
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("<span");
			oRM.addClass("css3_grid_vertical_align_table");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("<span");
			oRM.addClass("css3_grid_vertical_align");
			oRM.writeClasses();
			oRM.write(">");
			if (oCellData.Type === "FooterLabel") {
				oRM.write("<h2");
				oRM.addClass("caption header_col");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write(oCellData.Value);
				oRM.write("</h2>");

			} else if (oCellData.Type === "FooterValue") {
				oRM.write("<span>");
				oRM.write(oCellData.Value);
				oRM.write("</span>");
			}

			oRM.write("</span>");
			oRM.write("</span>");
			oRM.write("</div>"); //Div 1 end

		},

		renderer: function (oRM, oControl) {

			var oCellData = oControl.getCellData();
			var sCellGroup = oControl.getCellGroup();

			if (sCellGroup === "BodyCell") {
				oControl._renderBodyCell(oRM, oControl, oCellData);
			} else if (sCellGroup === "FooterCell") {
				oControl._renderFooterCell(oRM, oControl, oCellData);
			}
		}

	});

	return E;

});