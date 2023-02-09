sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/core/IconPool"
], function (Control, IconPool) {
	"use strict";
	this._isExpanded = true;
	var E = Control.extend("com.smod.ux.lib.controls.CandidateCard", {

		metadata: {
			library: "smod.ui5.controls",
			properties: {
				"cardHeaderTitle": {
					type: "string",
					bindable: true
				},
				"cardFooterTitle": {
					type: "string",
					bindable: true
				},
				"cardStyle": {
					type: "string",
					bindable: true
				}
			},
			aggregations: {
				actions: {
					type: "sap.ui.core.Control",
					multiple: true
				},
				bodyContentTop: {
					type: "sap.ui.core.Control",
					multiple: false
				},
				bodyContentBottom: {
					type: "sap.ui.core.Control",
					multiple: false
				}
			},
			events: {

			}

		},
		init: function () {
			var libraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(libraryPath + "/controls/CandidateCard.css");

			IconPool.addIcon("more_vert", "mi", {
				fontFamily: "Material Icons",
				content: "e5d4"
			});
		},
		onAfterRendering: function () {},
		renderer: function (oRM, oControl) {

			var sCardHeaderTitle = oControl.getCardHeaderTitle();
			var sCardFooterTitle = oControl.getCardFooterTitle();
			var sCardStyle = oControl.getCardStyle();
			var oBodyContentTop = oControl.getAggregation("bodyContentTop");
			var oBodyContentBottom = oControl.getAggregation("bodyContentBottom");

			oRM.write("<div"); // Div 1 begin
			oRM.writeControlData(oControl);
			oRM.addClass("smod_candidate_card_container");
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("<div"); // Div 2 begin
			oRM.addClass("smod_candidate_card_header");
			oRM.addClass(sCardStyle === "A" ? "smod_candidate_internal" : "smod_candidate_external");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("<span");
			oRM.addClass("smod_candidate_card_header_title");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write(sCardHeaderTitle);
			oRM.write("</span>");
			oRM.write("</div>"); // Div 2 end

			oRM.write("<div"); // Div 2 begin
			oRM.addClass("smod_candidate_card_body");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("<div"); // Div 2 begin
			oRM.addClass("smod_candidate_card_body_top");
			oRM.writeClasses();
			oRM.write(">");
			if (oBodyContentTop) {
				oRM.renderControl(oBodyContentTop);
			}
			oRM.write("</div>"); // Div 2 end

			oRM.write("<div"); // Div 2 begin
			oRM.addClass("smod_candidate_card_body_bottom");
			oRM.writeClasses();
			oRM.write(">");
			if (oBodyContentBottom) {
				oRM.renderControl(oBodyContentBottom);
			}
			oRM.write("</div>"); // Div 2 end
			oRM.write("</div>"); // Div 2 end

			oRM.write("<div"); // Div 2 begin
			oRM.addClass("smod_candidate_card_footer");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("<span");
			oRM.addClass("smod_candidate_card_footer_title");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write(sCardFooterTitle);
			oRM.write("</span>");
			oRM.write("<div"); // Div 2 begin
			oRM.addClass("smod_candidate_actions");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("</div>"); // Div 2 end
			oRM.write("<div"); // Div 2 begin
			oRM.addClass("smod_candidate_actions_container");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("<ul>"); // Div 2 begin
			$(oControl.getActions()).each(function () {
				oRM.write("<li>"); // Div 2 begin
				oRM.renderControl(this);
				oRM.write("</li>"); // Div 2 begin
			});
			oRM.write("</ul>"); // Div 2 begin
			oRM.write("</div>"); // Div 2 end
			oRM.write("</div>"); // Div 2 end
			oRM.write("</div>"); //Div 1 end

		}
	});

	E.prototype.ontap = function (e) {
		// e.preventDefault();
		// e.stopPropagation();
		if ($(e.target).hasClass("smod_candidate_actions")) {
			var oElem = $($(e.target.parentElement).find(".smod_candidate_actions_container"));

			//Responsive calculations
			var sLeftOffset = $(e.target.parentElement).height() === 30 ? 119 : 159;
			var sTopOffset = $(e.target.parentElement).height() === 30 ? 130 : 167;

			oElem.css({
				"visibility": oElem.css("visibility") === "hidden" ? "visible" : "hidden",
				"z-index": oElem.css("visibility") === "hidden" ? "999" : "-1",
				"top": oElem.css("visibility") === "hidden" ? $(e.target).position().top - sTopOffset : 0,
				"left": oElem.css("visibility") === "hidden" ? $(e.target).position().left - sLeftOffset : 0,
				"opacity": oElem.css("visibility") === "hidden" ? 1 : 0
			});

			// 	if ($(e.target).hasClass("expanded")) {
			// 		$(e.target).removeClass("expanded").addClass("collapsed");
			// 	} else if ($(e.target).hasClass("collapsed")) {
			// 		$(e.target).removeClass("collapsed").addClass("expanded");
			// 	}
		} else {
			$($(e.target).find(".smod_candidate_actions_container")).css({
				"visibility": "hidden",
				"z-index": "-1",
				"top": 0,
				"left": 0,
				"opacity": 0
			});
		}
	};

	return E;

});