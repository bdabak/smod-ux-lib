sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/core/IconPool",
	"./SideNavigationItem",
	"./SideNavigationHeader"
], function (Control, IconPool, SideNavigationItem, SideNavigationHeader) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.SideNavigation", {
		metadata: {
			properties: {
				title: {
					type: "string",
					bindable: true
				},
				photoUrl: {
					type: "string",
					bindable: true
				},
				name: {
					type: "string",
					bindable: true
				},
				isCollapsed: {
					type: "boolean",
					bindable: true
				}
			},
			aggregations: {
				items: {
					type: "com.smod.ux.lib.controls.SideNavigationItem",
					multiple: true,
					singularName: "item"
				},
				header: {
					type: "com.smod.ux.lib.controls.SideNavigationHeader",
					multiple: false
				},
				navContainer: {
					type: "sap.m.NavContainer",
					multiple: false
				}
			},
			events: {
				itemSelected: {
					parameters: {
						item: {
							type: "object"
						}
					}
				}
			}
		},
		fnItemSelected: function (oItem) {
			var oNavCon = this.getNavContainer();
			var oHeader = this.getHeader();
			var aPages = oNavCon.getPages();
			var that = this;
			var aItems = this.getItems();

			$.each(aPages, function (i, oPage) {
				if (oPage.data("referenceItem") === oItem.getId()) {
					oNavCon.to(oPage, "fade");
					that.$().find(".smod-side-nav-menu-item-link").removeClass("active");
					oItem.$().find(".smod-side-nav-menu-item-link").addClass("active");
					return false;
				}
			});

			$.each(aItems, function (i, oLine) {
				oLine.setProperty("active", false, true);
			});
			oItem.setProperty("active", true, true);
			oHeader.setTitle(oItem.getTitle());
		},
		init: function () {
			//initialisation code, in this case, ensure css is imported
			var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(sLibraryPath + "/controls/SideNavigation.css");
		},

		_renderHeader: function (oRM, oControl) {
			//Header bg
			oRM.write("<div");
			oRM.addClass("smod-side-nav-header");
			oRM.addClass("smod-side-nav-hover");
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("<a target='_blank'");
			oRM.addClass("smod-side-nav-logo");
			oRM.addClass("smod-side-nav-hover");
			oRM.writeClasses();
			oRM.write(">");
			var sSrc = jQuery.sap.getModulePath("com.smod.ux.lib") + "/controls/images/logo.png";
			oRM.write("<img");
			oRM.addClass("smod-side-nav-hover");
			oRM.writeClasses();
			oRM.writeAttributeEscaped("width", "25px");
			oRM.writeAttributeEscaped("height", "25px");
			oRM.writeAttributeEscaped("src", sSrc);
			oRM.write("/>");
			oRM.write("</a>");

			oRM.write("<span");
			oRM.addClass("smod-side-nav-title");
			oRM.addClass(oControl.getIsCollapsed() ? "smod-side-nav-text-col smod-side-nav-text-exp" : "smod-side-nav-text-exp");
			oRM.addClass("smod-side-nav-hover");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write(oControl.getTitle());
			oRM.write("</span>");
			oRM.write("</div>");
			//Header end>
		},

		_renderProfile: function (oRM, oControl) {
			oRM.write("<div");
			oRM.addClass("smod-side-nav-profile");
			oRM.addClass("smod-side-nav-hover");
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("<div");
			oRM.addClass("smod-side-nav-profile-content");
			oRM.addClass("smod-side-nav-hover");
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("<img");
			oRM.addClass("smod-side-nav-profile-img");
			oRM.addClass("smod-side-nav-hover");
			oRM.writeClasses();
			oRM.writeAttributeEscaped("src", oControl.getPhotoUrl());
			oRM.writeAttributeEscaped("alt", oControl.getName());
			oRM.write("/>");

			oRM.write("</div>");

			oRM.write("<div");
			oRM.addClass("smod-side-nav-profile-name");
			oRM.addClass(oControl.getIsCollapsed() ? "smod-side-nav-text-col smod-side-nav-text-exp" : "smod-side-nav-text-exp");
			oRM.addClass("smod-side-nav-hover");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write(oControl.getName());

			oRM.write("</div>");

			oRM.write("</div>");
		},
		_renderMenuItems: function (oRM, oControl) {
			var aItems = oControl.getItems();
			var oHeader = oControl.getHeader();
			//Menus<
			oRM.write("<div");
			oRM.addClass("smod-side-nav-menu");
			oRM.addClass(oControl.getIsCollapsed() ? "smod-side-nav-col smod-side-nav-exp" : "smod-side-nav-exp");
			oRM.addClass("smod-side-nav-hover");
			oRM.writeClasses();
			oRM.write(">");

			oControl._renderProfile(oRM, oControl);

			oRM.write("<ul");
			oRM.addClass("smod-side-nav-menu-items");
			oRM.addClass("smod-side-nav-hover");
			oRM.writeClasses();
			oRM.write(">");

			$.each(aItems, function (i, oItem) {
				if (oItem.getActive()) {
					oHeader.setProperty("title", oItem.getTitle());
				}
				oRM.renderControl(oItem);
			});

			oRM.write("</ul>");

			oRM.write("</div>");
			//Menus>
		},
		_renderContent: function (oRM, oControl) {
			//Page content begin
			oRM.write("<div");
			oRM.addClass("smod-side-nav-content");
			oRM.addClass(oControl.getIsCollapsed() ? "smod-side-nav-content-col smod-side-nav-content-exp" : "smod-side-nav-content-exp"); //Default collapsed
			oRM.writeClasses();
			oRM.write(">");

			oRM.renderControl(oControl.getHeader());

			oRM.write("<div");
			oRM.addClass("smod-side-nav-content-body");
			oRM.writeClasses();
			oRM.write(">");

			oRM.renderControl(oControl.getNavContainer());

			oRM.write("</div>");

			oRM.write("</div>");
			//Page content end>
		},

		renderer: function (oRM, oControl) {
			var oNavCon = oControl.getNavContainer() || new sap.m.NavContainer();
			var oHeader = oControl.getHeader() || new SideNavigationHeader();
			var aItems = oControl.getItems();

			if (!oControl.getNavContainer()) {
				oControl.setNavContainer(oNavCon);
				oControl.setHeader(oHeader);
				$.each(aItems, function (i, oItem) {
					var oPage = new sap.m.Page({
						content: oItem.getContent(),
						showHeader: false,
						showFooter: false
					}).addStyleClass("smod-side-nav-content-page");

					oPage.data("referenceItem", oItem.getId());

					oNavCon.addPage(oPage);
				});
			}

			//<Control begin
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("smod-side-nav");
			oRM.writeClasses();
			oRM.write(">");

			//<Main beg
			oRM.write("<div>");
			oRM.write("<div");
			oRM.addClass("smod-side-nav-dock");
			oRM.addClass("smod-side-nav-hover");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("<div");
			oRM.addClass("smod-side-nav-root");
			oRM.addClass("smod-side-nav-main");
			oRM.addClass("smod-side-nav-hover");
			oRM.addClass(oControl.getIsCollapsed() ? "smod-side-nav-col smod-side-nav-exp" : "smod-side-nav-exp"); //Default collapsed
			oRM.addClass("smod-side-nav-etc");
			oRM.writeClasses();
			oRM.write(">");

			//Render Header
			oControl._renderHeader(oRM, oControl);

			//Render Menu

			oControl._renderMenuItems(oRM, oControl);

			//Bg beg>
			oRM.write("<div");
			oRM.addClass("smod-side-nav-bg");
			oRM.addClass("smod-side-nav-hover");
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("</div>");
			//Bg end>

			oRM.write("</div>");
			oRM.write("</div>");
			//Dock end
			oRM.write("</div>");
			//Main end>

			//Render content
			oControl._renderContent(oRM, oControl);

			oRM.write("</div>");
			//Control end>

		},

		onclick: function (evt) {
			var isCollapsed = this.getProperty("isCollapsed");
			if ($(evt.target).hasClass("toggle-menu") || $(evt.target).parent().hasClass("toggle-menu")) {
				this.$().find(".smod-side-nav-exp").toggleClass("smod-side-nav-col");
				this.$().find(".smod-side-nav-content").toggleClass("smod-side-nav-content-col");
				this.$().find(".smod-side-nav-text-exp").toggleClass("smod-side-nav-text-col");
				// this.$().find(".smod-side-nav-menu-item-link-text").toggleClass("smod-side-nav-text-col");
				// this.$().find(".smod-side-nav-profile-name").toggleClass("smod-side-nav-text-col");
				//this.$().find(".smod-side-nav-menu").toggleClass("smod-side-nav-col");
				this.setProperty("isCollapsed", !isCollapsed, true);
			}

			// if ($(evt.target).hasClass("smod-side-nav-selectable")) {
			// 	//this.$().find(".active").removeClass("active");
			// }
		},

		onmouseover: function (evt) {
			if (this.$().find(".smod-side-nav-content").hasClass("smod-side-nav-content-col")) {
				if ($(evt.target).hasClass("smod-side-nav-hover")) {
					this.$().find(".smod-side-nav-exp").toggleClass("smod-side-nav-col");
					this.$().find(".smod-side-nav-text-exp").toggleClass("smod-side-nav-text-col");
					// this.$().find(".smod-side-nav-title").toggleClass("smod-side-nav-text-col");
					// this.$().find(".smod-side-nav-menu-item-link-text").toggleClass("smod-side-nav-text-col");
					// this.$().find(".smod-side-nav-profile-name").toggleClass("smod-side-nav-text-col");
					//this.$().find(".smod-side-nav-menu").toggleClass("smod-side-nav-col");
				}
			}
		},

		onmouseout: function (evt) {
			if (this.$().find(".smod-side-nav-content").hasClass("smod-side-nav-content-col")) {
				if ($(evt.target).hasClass("smod-side-nav-hover")) {
					this.$().find(".smod-side-nav-exp").toggleClass("smod-side-nav-col");
					this.$().find(".smod-side-nav-text-exp").toggleClass("smod-side-nav-text-col");
					// this.$().find(".smod-side-nav-title").toggleClass("smod-side-nav-text-col");
					// this.$().find(".smod-side-nav-menu-item-link-text").toggleClass("smod-side-nav-text-col");
					// this.$().find(".smod-side-nav-profile-name").toggleClass("smod-side-nav-text-col");
					//this.$().find(".smod-side-nav-menu").toggleClass("smod-side-nav-col");
				}
			}
		}

	});

	return E;

});