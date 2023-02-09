sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/core/IconPool"
], function(Control, IconPool) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.SideNavigationItem", {
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
				active: {
					type: "boolean",
					bindable: true
				}
			},
			aggregations: {
				content: {
					type: "sap.ui.core.Control",
					multiple: false
				}
			}
		},

		init: function() {},

		renderer: function(oRM, oControl) {
			var isCollapsed = oControl.getParent().getProperty("isCollapsed");
			oRM.write("<li");
			oRM.writeControlData(oControl);
			oRM.addClass("smod-side-nav-menu-item");
			oRM.addClass("smod-side-nav-hover");
			oRM.addClass("smod-side-nav-selectable");
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("<a");
			oRM.addClass("smod-side-nav-menu-item-link");
			oRM.addClass("smod-side-nav-hover");
			oRM.addClass("smod-side-nav-selectable");
			if (oControl.getActive()) {
				oRM.addClass("active");
			}
			oRM.writeClasses();
			oRM.write(">");

			//Icon
			oRM.writeIcon(IconPool.getIconURI(oControl.getIcon()));

			oRM.write("<div");
			oRM.addClass("smod-side-nav-menu-item-link-text");
			//oRM.addClass("smod-side-nav-text-exp");
			oRM.addClass(isCollapsed ? "smod-side-nav-text-col smod-side-nav-text-exp" : "smod-side-nav-text-exp");
			oRM.addClass("smod-side-nav-hover");
			oRM.addClass("smod-side-nav-selectable");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write(oControl.getTitle());
			oRM.write("</div>");
			oRM.write("</a>");
			oRM.write("</li>");

		},
		onclick: function(evt) {
			this.getParent().fnItemSelected(this);
			evt.preventDefault(true);
		}

	});

	return E;

});