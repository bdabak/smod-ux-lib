sap.ui.define([
	"sap/ui/core/Control",
	"com/smod/ux/lib/controls/ComparisonTableCell"
], function (Control, ComparisonTableCell) {
	"use strict";

	var E = Control.extend("com.smod.ux.lib.controls.ComparisonTableColumn", {

		metadata: {
			library: "smod.ui5.controls",
			properties: {
				"columnData": {
					type: "object",
					bindable: true
				},
				"columnCount": {
					type: "int",
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

		renderer: function (oRM, oControl) {

			var oColumnData = oControl.getColumnData();
			var sColumnCount = oControl.getColumnCount();

			if (sColumnCount > 3) {
				sColumnCount = 3;
			}

			oRM.write("<div"); // Div 1 begin
			oRM.writeControlData(oControl);
			if (oColumnData.Type === "Caption") {
				oRM.addClass("caption_column caption_column_responsive");
				oRM.addClass("caption_column_" + sColumnCount + "_columns");
			} else {
				//oRM.addClass("column_" + oColumnData.ColumnIndex);
				oRM.addClass("data_column data_column_responsive");
				oRM.addClass("data_column_" + sColumnCount + "_columns");
			}
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("<ul>");
			$.each(oColumnData.Data, function (sIndex, oCellData) {
				var oColumnCell = new ComparisonTableCell({
					cellData: oCellData,
					cellGroup: "BodyCell"
				});
				oRM.renderControl(oColumnCell);
			});
			oRM.write("</ul>");

			oRM.write("</div>"); //Div 1 end

		}
	});

	return E;

});