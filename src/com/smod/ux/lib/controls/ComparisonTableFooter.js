sap.ui.define([
	"sap/ui/core/Control",
	"com/smod/ux/lib/controls/ComparisonTableCell"
], function (Control, ComparisonTableCell) {
	"use strict";

	var E = Control.extend("com.smod.ux.lib.controls.ComparisonTableFooter", {

		metadata: {
			library: "smod.ui5.controls",
			properties: {
				"footerData": {
					type: "object",
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

			var oFooterData = oControl.getFooterData();

			oRM.write("<div"); // Div 1 begin
			oRM.writeControlData(oControl);
			if (oFooterData.Type === "FooterFinal") {
				oRM.addClass("footer_final_row");
			} else if (oFooterData.Type === "FooterNote") {
				oRM.addClass("footer_note_row");
			} else {
				oRM.addClass("footer_row");
			}
			oRM.writeClasses();
			oRM.write(">");

			$.each(oFooterData.Data, function (sIndex, oCellData) {
				var oFooterCell = new ComparisonTableCell({
					cellData: oCellData,
					cellGroup: "FooterCell"
				});
				oRM.renderControl(oFooterCell);
			});

			oRM.write("</div>"); //Div 1 end

		}
	});

	return E;

});