/*global window*/
sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.SmodPageSideBarItem", {

		metadata: {
			library: "smod.ui5.controls",
			properties: {
				"text": {
					type: "string",
					bindable: true
				},
				"icon": {
					type: "string",
					bindable: true
				},
				"pageIndex": {
					type: "string",
					bindable: true
				}
			}

		},

		renderer: function (oRM, oControl) {
			oRM.write("<a href='javascript:void(0)'"); //Div header
			oRM.writeControlData(oControl);
			oRM.addClass("smod-page-sidebar-item smod-page-sidebar-item-action");

			try {
				var oNC = oControl.getParent().getParent().getNavContainer();

				if (oNC.getCurrentPage().data("pageIndex") === oControl.getPageIndex()) {
					oRM.addClass("smod-page-sidebar-item-active");
				}

			} catch (oEx) {
				jQuery.sap.log.error("NC render problem!");
			}

			oRM.writeClasses();
			oRM.write(">");

			oRM.renderControl(new sap.ui.core.Icon({
				src: oControl.getIcon()
			}).addStyleClass("smod-page-sidebar-item-action smod-page-sidebar-item-icon"));

			oRM.write("<span");
			oRM.addClass("smod-page-sidebar-item-action smod-page-sidebar-item-text");
			oRM.writeClasses();
			oRM.write(">");
			oRM.writeEscaped(oControl.getText());
			oRM.write("</span>");

			oRM.write("<span");
			oRM.addClass("smod-page-sidebar-item-tooltip");
			oRM.writeClasses();
			oRM.write(">");
			oRM.writeEscaped(oControl.getText());
			oRM.write("</span>");

			oRM.write("</a>");

		}
	});

	E.prototype.ontap = function (e) {
		try {
			var oNC = this.getParent().getParent().getNavContainer();

			oNC.to(oNC.getPages()[this.getPageIndex()]);

			$(".smod-page-sidebar-item").removeClass("smod-page-sidebar-item-active");

			$(this.getDomRef()).addClass("smod-page-sidebar-item-active");

		} catch (oEx) {

		}
	};

	return E;

});