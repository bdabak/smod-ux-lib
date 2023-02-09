sap.ui.define([
	"sap/ui/core/Control",
	"com/smod/ux/lib/controls/ComparisonTableColumn",
	"com/smod/ux/lib/controls/ComparisonTableFooter",
	"sap/ui/core/IconPool"
], function (Control, ComparisonTableColumn, ComparisonTableFooter, IconPool) {
	"use strict";
	this._isExpanded = true;
	var E = Control.extend("com.smod.ux.lib.controls.ComparisonTable", {

		metadata: {
			library: "smod.ui5.controls",
			properties: {
				"dataContent": {
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
		init: function () {
			var libraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(libraryPath + "/controls/ComparisonTable.css");
		},

		renderer: function (oRM, oControl) {

			var aDataContent = oControl.getDataContent();

			oRM.write("<div"); // Div 1 begin
			oRM.writeControlData(oControl);
			oRM.write(">");
			oRM.write("<div"); // Div 5 begin
			oRM.addClass("ct_table_toggle_area");
			oRM.writeClasses();
			oRM.write(">"); // Div 3 begin
			oRM.write("<div"); // Div 3 begin
			oRM.addClass("ct_table_responsive ct_table_hide_caption_column ct_table_1 ct_table_1_4 css3_grid_clearfix ct_table_hover_light");
			oRM.writeClasses();
			oRM.write(">");

			$.each(aDataContent.TableData, function (sIndex, oColumn) {
				var oTableColumn = new ComparisonTableColumn({
					columnData: oColumn,
					columnCount: aDataContent.TableData.length
				});
				oRM.renderControl(oTableColumn);
			});

			oRM.write("</div>"); //Div 3 end
			try {
				if (aDataContent.FooterData.length > 0) {
					oRM.write("<div"); // Div 4 begin
					oRM.addClass("ct_table_footer");
					oRM.writeClasses();
					oRM.write(">");
					$.each(aDataContent.FooterData, function (sIndex, oFooter) {
						var oTableFooter = new ComparisonTableFooter({
							footerData: oFooter
						});
						oRM.renderControl(oTableFooter);
					});
					oRM.write("</div>"); // Div 4 end
				}
			} catch (oEx) {
				jQuery.sap.log.info("Footer not present");
			}
			oRM.write("</div>"); // Div 5 end
			oRM.write("<div"); // Div 2 begin
			oRM.addClass("ct_table_toggler");
			oRM.writeClasses();
			oRM.write("><span");
			oRM.addClass("ct_table_toggler_button expanded");
			oRM.writeClasses();
			var oIconInfo = IconPool.getIconInfo("sap-icon://up");
			oRM.writeAttributeEscaped("data-sap-ui-icon-content", oIconInfo.content);
			oRM.write("></span>"); // span for toggler
			oRM.write("</div>"); //Div 2 end

			oRM.write("</div>"); //Div 1 end

		}
	});

	E.prototype.ontap = function (e) {
		e.preventDefault();
		e.stopPropagation();
		if ($(e.target).hasClass("ct_table_toggler_button")) {
			$($(e.target.parentElement.parentElement).find(".ct_table_toggle_area")).slideToggle();
			if ($(e.target).hasClass("expanded")) {
				$(e.target).removeClass("expanded").addClass("collapsed");
			} else if ($(e.target).hasClass("collapsed")) {
				$(e.target).removeClass("collapsed").addClass("expanded");
			}
		}
	};

	return E;

});