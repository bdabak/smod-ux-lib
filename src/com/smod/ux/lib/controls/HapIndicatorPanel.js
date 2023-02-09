sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/List"
], function (Control, List) {
	"use strict";

	var E = Control.extend("com.smod.ux.lib.controls.HapIndicatorPanel", {

		metadata: {
			library: "smod.ui5.controls",
			properties: {
				"headerText": {
					type: "string"
				},
				"headerDescription": {
					type: "string",
					default: ""
				},
				"headerAlign": {
					type: "string",
					default: "Left"
				},
				"headerDesign": {
					type: "string",
					default: "None" /*None, Positive, Critical, Emphasized, Negative*/
				}
			},
			aggregations: {
				"list": {
					type: "sap.m.List",
					multiple: true
				},
				"hapPanel": {
					type: "hcm.ux.hapv2.control.HapIndicatorPanel",
					multiple: true
				}
			},
			events: {
				"headerTap": {}
			}

		},

		init: function () {
			var libraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(libraryPath + "/controls/HapIndicatorPanel.css");
		},

		onAfterRendering: function () {},

		renderer: function (oRM, oControl) {
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("hapIndicatorPanelDiv");
			if (oControl.getHeaderDesign() !== "None") {
				oRM.addClass("hapIndicatorPanelDiv" + oControl.getHeaderDesign());
			}
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("<div");
			try {
				if (oControl.getList().length > 0) {
					oRM.addClass("hapIndicatorPanelCursor");
				} else {
					oRM.addClass("hapIndicatorPanelHeaderTextMain");
				}
			} catch (oErr) {}
			oRM.addClass("hapIndicatorPanelHeaderText");
			oRM.addClass("hapIndicatorPanelHeaderTextHasBorder");
			if (oControl.getHeaderDesign() !== "None") {
				oRM.addClass("hapIndicatorPanelHeaderDesign" + oControl.getHeaderDesign());
			}

			oRM.writeClasses();
			oRM.write(">");
			try {
				if (oControl.getList().length > 0) {
					oRM.write("<span");
					oRM.addClass("hapIndicatorPanelIcon");
					oRM.addClass("hapIndicatorPanelIconExpanded");
					oRM.writeClasses();
					oRM.write(">");
					oRM.write("</span>");
				}
			} catch (oErr) {}
			oRM.write("<div");
			if (oControl.getHeaderAlign() === "Center") {
				oRM.addClass("hapIndicatorPanelHeaderAlignCenter");
			} else {
				oRM.addClass("hapIndicatorPanelHeaderAlignLeft");
			}
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("<span>");
			oRM.write(oControl.getHeaderText());
			oRM.write("</span>");
			if (oControl.getHeaderAlign() === "Center" && oControl.getHeaderDescription() !== "") {
				oRM.write("<span");
				oRM.addClass("hapTooltipText");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write(oControl.getHeaderDescription());
				oRM.write("</span>");
			}
			oRM.write("</div>");
			oRM.write("</div>");
			try {
				if (oControl.getHapPanel().length > 0) {
					oRM.write("<div>");
					$(oControl.getHapPanel()).each(function () {
						oRM.renderControl(this);
					});
					oRM.write("</div>");
				}
			} catch (oErr) {

			}
			try {
				if (oControl.getList()) {
					oRM.write("<div");
					oRM.addClass("hapIndicatorPanelListDiv");
					oRM.writeClasses();
					oRM.write(">");
					$(oControl.getList()).each(function () {
						oRM.renderControl(this);
					});
				}
			} catch (oErr) {

			}
			oRM.write("</div>");
			oRM.write("</div>");
		}
	});

	E.prototype.ontap = function (e) {
		console.log(e);
		if (e.originalEvent.target.classList[0] === "hapIndicatorPanelCursor" ||
			e.originalEvent.target.classList[0] === "hapIndicatorPanelHeaderAlignLeft" ||
			e.originalEvent.target.classList[0] === "hapIndicatorPanelIcon") {
			//this.fireHeaderTap(e);
			try {
				var oList = this.getList()[0];
				if (oList !== undefined && oList !== null) {
					var oEl = $("#" + oList.getId());
					if (e.originalEvent.target.classList[0] === "hapIndicatorPanelHeaderAlignLeft" ||
						e.originalEvent.target.classList[0] === "hapIndicatorPanelIcon") {
						var oHead = $(e.originalEvent.target.parentElement);
					} else {
						var oHead = $(e.originalEvent.target);
					}

					if (oHead.find(".hapIndicatorPanelIcon").hasClass("hapIndicatorPanelIconExpanded")) {
						oHead.find(".hapIndicatorPanelIconExpanded").removeClass("hapIndicatorPanelIconExpanded").addClass(
							"hapIndicatorPanelIconCollapsed");
					} else if (oHead.find(".hapIndicatorPanelIcon").hasClass("hapIndicatorPanelIconCollapsed")) {
						oHead.find(".hapIndicatorPanelIcon").removeClass("hapIndicatorPanelIconCollapsed").addClass(
							"hapIndicatorPanelIconExpanded");
					}

					oEl.slideToggle();

					if (oHead.hasClass("hapIndicatorPanelHeaderTextHasBorder")) {
						oHead.removeClass("hapIndicatorPanelHeaderTextHasBorder").addClass("hapIndicatorPanelHeaderTextNoBorder");
					} else if (oHead.hasClass("hapIndicatorPanelHeaderTextNoBorder")) {
						oHead.removeClass("hapIndicatorPanelHeaderTextNoBorder").addClass("hapIndicatorPanelHeaderTextHasBorder");
					}

				}
			} catch (oErr) {
				console.log(oErr);
			}
		}

	};

	return E;

});