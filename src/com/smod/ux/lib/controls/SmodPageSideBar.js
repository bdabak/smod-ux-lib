/*global window*/
sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/List",
	"sap/ui/core/IconPool",
	"sap/ui/core/format/DateFormat",
	"./SmodPageSideBarItem",
	"sap/ui/Device"
], function (Control, List, IconPool, DateFormat, SmodPageSideBarItem, Device) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.SmodPageSideBar", {

		metadata: {
			library: "smod.ui5.controls",
			properties: {
				"showToggleButton": {
					type: "boolean",
					bindable: true
				},
				"profileTitle": {
					type: "string",
					bindable: true
				}
			},
			aggregations: {
				brandImage: {
					type: "sap.m.Image",
					multiple: false
				},
				profileInfo: {
					type: "sap.ui.core.Control",
					multiple: false
				},
				detailTabs: {
					type: "sap.ui.core.Control",
					multiple: true,
					singularName: "detailTab"
				},
				footer: {
					type: "sap.ui.core.Control",
					multiple: false
				},
				sideBarItems: {
					type: "com.smod.ux.lib.controls.SmodPageSideBarItem",
					multiple: true,
					singularName: "sideBarItem"
				},
				actionMenu: {
					type: "sap.m.ActionSheet",
					multiple: false
				}
			}
		},
		_renderProfileInfo: function (oRM, oControl) {
			var sProfileTitle = oControl.getProfileTitle();
			var aDetailTabControls = oControl.getDetailTabs();
			var sCount = 0;
			var oActionMenu = oControl.getAggregation("actionMenu");

			//Profile and tabs info begin
			oRM.write("<div"); //Div 3 begin
			oRM.addClass("smod-page-sidebar-profile-container");
			oRM.writeClasses();
			oRM.write(">");
			if (sProfileTitle) {
				oRM.write("<div"); //Div 3 begin
				oRM.addClass("smod-page-sidebar-profile-title");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write(sProfileTitle);
				if (oActionMenu) {
					if (oActionMenu.getVisible()) {
						var oActionButton = new sap.ui.core.Icon({
							src: "sap-icon://customize",
							press: function () {
								oActionMenu.openBy(this);
							}
						}).addStyleClass("smod-side-bar-action-button");

						oRM.write("<div"); //Div 3 begin
						oRM.addClass("smod-side-bar-action-menu");
						oRM.writeClasses();
						oRM.write(">");
						oRM.renderControl(oActionButton);
						oRM.write("</div>");
					}
				}
				oRM.write("</div>"); //Div 3 begin
			}

			//Begin of profile info
			oRM.renderControl(oControl.getAggregation("profileInfo"));
			//End of profile info

			//Info tabs
			try {
				if (aDetailTabControls.length > 0) {
					oRM.write("<div"); //Div 4 begin
					oRM.addClass("smod-page-sidebar-profile-tabstrip");
					oRM.writeClasses();
					oRM.write(">");
					oRM.write("<div"); //Div 5 begin
					oRM.addClass("smod-page-sidebar-profile-tab");
					oRM.writeClasses();
					oRM.write(">");
					sCount = 0;
					for (var i = 0; i < aDetailTabControls.length; i++) {
						if (aDetailTabControls[i].getVisible()) {
							if (sCount > 3) {
								jQuery.sap.log.error("This component renders up to 4 tabs");
								break;
							}
							//Form status
							oRM.write("<button");
							oRM.addClass("smod-page-sidebar-profile-tablink");
							oRM.addClass("smod-page-sidebar-profile-tablink-" + aDetailTabControls[i].getTabCount());
							if (i === 0) { //First tab should be active
								oRM.addClass("active");
							}
							oRM.writeClasses();
							oRM.writeAttributeEscaped("data-target-profile-tab", "smod-page-sidebar-profile-tabcontent-" + aDetailTabControls[i].getTabCount());
							oRM.write(">" + aDetailTabControls[i].getTabTitle() + "</button>");
							sCount++;
						}
					}
					oRM.write("</div>"); //Div 5 end

					//Render tab contents begin
					sCount = 0;
					for (var j = 0; j < aDetailTabControls.length; j++) {
						if (aDetailTabControls[j].getVisible()) {
							if (sCount > 0) {
								aDetailTabControls[j].addStyleClass("smod-page-sidebar-profile-tabcontent-hidden");
							}
							oRM.renderControl(aDetailTabControls[j]);
							sCount++;
						}
					}
					//Render tab contents end
					oRM.write("</div>"); //Div 4 end
				}
			} catch (oEx) {
				jQuery.sap.log.error(oEx);
			}

			oRM.write("</div>"); //Div 3 end
			//Profile and tabs info end	
		},
		_renderSideBarItems: function (oRM, oControl) {

			oRM.write("<div"); //Div 3 begin
			oRM.addClass("smod-page-sidebar-item-container");
			oRM.writeClasses();
			oRM.write(">");

			$.each(oControl.getSideBarItems(), function (sIndex, oSideBarItem) {
				oRM.renderControl(oSideBarItem);
			});

			oRM.write("</div>");
		},
		renderer: function (oRM, oControl) {

			oRM.write("<div"); //Div SideBarMain Begin
			oRM.writeControlData(oControl);
			oRM.addClass("smod-page-sidebar");
			oRM.writeClasses();
			oRM.write(">");

			oRM.write("<div"); //Div BrandContainer
			oRM.addClass("smod-page-brand-container");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("<button");
			oRM.addClass("smod-page-button smod-page-back-left-button");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("</button>");
			oRM.write("<div"); //Div BrandImage 
			oRM.addClass("smod-page-brand-image");
			oRM.writeClasses();
			oRM.write(">");
			oRM.renderControl(oControl.getBrandImage());
			oRM.write("</div>"); //Div BrandImage 

			oRM.write("<button");
			oRM.addClass("smod-page-button smod-page-close-button");
			oRM.writeClasses();
			oRM.write(">");
			oRM.write("</button>");
			oRM.write("</div>"); //Div BrandContainer

			if (oControl.getShowToggleButton()) {
				oRM.write("<button");
				oRM.addClass("smod-page-button smod-page-float-toggle-button");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write("</button>");
			}

			//Render profile and info tabs
			oControl._renderProfileInfo(oRM, oControl);

			//Render sidebar items
			oControl._renderSideBarItems(oRM, oControl);

			if (!Device.system.phone) {
				oRM.write("<button");
				oRM.addClass("smod-page-pin-button smod-page-pin-inactive");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write("</button>");
			}

			oRM.write("</div>"); //Div SideBarMain End

		}
	});

	E.prototype.ontap = function (e) {

	};

	return E;

});