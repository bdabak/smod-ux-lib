/*global window*/
sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/Device",
	"./SmodPageHeader",
	"./SmodPageSideBar"
], function (Control, Device, SmodPageHeader, SmodPageSideBar) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.SmodPage", {

		metadata: {
			library: "smod.ui5.controls",
			aggregations: {
				header: {
					type: "com.smod.ux.lib.controls.SmodPageHeader",
					multiple: false
				},
				sideBar: {
					type: "com.smod.ux.lib.controls.SmodPageSideBar",
					multiple: false
				},
				navContainer: {
					type: "sap.m.NavContainer",
					multiple: false
				}
			},
			events: {
				"navButtonPressed": {
					parameters: {}
				}
			}

		},
		_isExpanded: true,

		init: function () {
			var libraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(libraryPath + "/controls/SmodPage.css");
		},

		renderer: function (oRM, oControl) {
			oRM.write("<div"); //Div main
			oRM.writeControlData(oControl);
			oRM.addClass("smod-page");
			oRM.writeClasses();
			oRM.write(">");

			//Render sidebar first
			if (oControl.getSideBar()) {
				oRM.renderControl(oControl.getSideBar());

				//Render overlay
				oRM.write("<div"); //Div overlay
				oRM.addClass("smod-page-overlay");
				oRM.writeClasses();
				oRM.write("></div>");
			}

			//Render page header and content
			oRM.renderControl(oControl.getHeader());

			//Nav container
			oRM.write("<div"); //Div nav container
			oRM.addClass("smod-page-nav-container");
			oRM.writeClasses();
			oRM.write(">");
			oRM.renderControl(oControl.getNavContainer());
			oRM.write("</div>");

			oRM.write("</div>");

		}
	});
	E.prototype.onswiperight = function (e) {
		if (!Device.system.desktop) {
			$(".smod-page-sidebar").addClass("smod-page-sidebar-active smod-page-animate-left");
			$(".smod-page-overlay").addClass("smod-page-overlay-active");
			$(".smod-page-float-toggle-button").addClass("smod-page-float-toggle-button-passive");
			$(".smod-page").addClass("smod-page-sidebar-expanded");
		}
	};
	E.prototype.onswipeleft = function (e) {
		if (!Device.system.desktop) {
			$(".smod-page-sidebar").removeClass("smod-page-sidebar-active smod-page-animate-left");
			$(".smod-page-overlay").removeClass("smod-page-overlay-active");
			$(".smod-page-float-toggle-button").removeClass("smod-page-float-toggle-button-passive");
			$(".smod-page").removeClass("smod-page-sidebar-expanded");
		}
	};
	E.prototype.ontap = function (e) {
		if ($(e.target).hasClass("smod-page-overlay") || $(e.target).hasClass("smod-page-toggle-button") ||
			$(e.target).hasClass("smod-page-close-button") ||
			$(e.target).hasClass("smod-page-float-toggle-button")) {
			$(".smod-page-sidebar").toggleClass("smod-page-sidebar-active smod-page-animate-left");
			$(".smod-page-overlay").toggleClass("smod-page-overlay-active");
			$(".smod-page-float-toggle-button").toggleClass("smod-page-float-toggle-button-passive");
			$(".smod-page").toggleClass("smod-page-sidebar-expanded");
			return;
		}

		if ($(e.target).hasClass("smod-page-back-right-button") || $(e.target).hasClass("smod-page-back-left-button")) {
			if ($(e.target).hasClass("smod-page-back-left-button")) {
				$(".smod-page-sidebar").removeClass("smod-page-sidebar-active smod-page-animate-left");
				$(".smod-page-overlay").removeClass("smod-page-overlay-active");
				$(".smod-page-float-toggle-button").removeClass("smod-page-float-toggle-button-passive");
				$(".smod-page").removeClass("smod-page-sidebar-expanded");
			}
			this.fireNavButtonPressed();
			return;
		}

		if ($(e.target).hasClass("smod-page-pin-button")) {
			$(".smod-page").toggleClass("smod-page-sidebar-pinned");
			if ($(e.target).hasClass("smod-page-pin-inactive")) {
				$(".smod-page-pin-button").removeClass("smod-page-pin-inactive").addClass("smod-page-pin-active");
				sap.m.MessageToast.show("Menü sabitlendi");
			} else {
				$(".smod-page-pin-button").removeClass("smod-page-pin-active").addClass("smod-page-pin-inactive");
			}
			return;
		}

		if ($(e.target).hasClass("smod-page-sidebar-profile-tablink")) {
			if ($(e.target).hasClass("active")) {
				return;
			}
			var sTargetContent = $(e.target).data("target-profile-tab");
			if (sTargetContent) {
				sTargetContent = "." + sTargetContent;
				$(".smod-page-sidebar-profile-tabcontent").css("display", "none");
				$(sTargetContent).css("display", "block");
				$(".smod-page-sidebar-profile-tablink").removeClass("active");
				$(e.target).addClass("active");
			}
			return;
		}
	};

	return E;

});