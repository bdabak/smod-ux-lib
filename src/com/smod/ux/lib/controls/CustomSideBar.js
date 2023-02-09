/*global window*/
sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/List",
	"sap/ui/core/IconPool",
	"sap/ui/core/format/DateFormat"
], function (Control, List, IconPool, DateFormat) {
	"use strict";
	var E = Control.extend("com.smod.ux.lib.controls.CustomSideBar", {

		metadata: {
			library: "smod.ui5.controls",
			properties: {
				"navData": {
					type: "object",
					bindable: true
				},
				"profileTitle": {
					type: "string",
					bindable: true
				},
				"footerNavigationVisible": {
					type: "boolean",
					bindable: true
				}
			},
			aggregations: {
				content: {
					type: "sap.ui.core.Control",
					multiple: false
				},
				brandImageExpanded: {
					type: "sap.m.Image",
					multiple: false
				},
				brandImageCollapsed: {
					type: "sap.m.Image",
					multiple: false
				},
				mainProfileInfo: {
					type: "sap.ui.core.Control",
					multiple: false
				},
				infoTabs: {
					type: "sap.ui.core.Control",
					multiple: true,
					singularName: "infoTab"
				},
				footer: {
					type: "sap.ui.core.Control",
					multiple: false
				},
				actionMenu: {
					type: "sap.m.ActionSheet",
					multiple: false
				}
			},
			events: {
				"navItemSelected": {
					parameters: {
						rowIid: {
							type: "string"
						}
					}
				},
				"navButtonPressed": {
					parameters: {}
				}
			}

		},
		_isExpanded: true,

		init: function () {
			var libraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(libraryPath + "/controls/CustomSideBar.css");
		},
		_formatDate: function (sDate) {
			try {
				var oDateFormat = DateFormat.getDateTimeInstance({
					pattern: "dd/MM/yyyy"
				});

				return oDateFormat.format(sDate);
			} catch (ex) {
				return "";
			}
		},

		_geti18nText: function (sTextKey, aParam) {
			return this._oResourceBundle.getText(sTextKey, aParam);
		},

		onAfterRendering: function () {
			this._oResourceBundle = this.getModel("i18n").getResourceBundle();
		},

		renderer: function (oRM, oControl) {
			var aNavData = oControl.getNavData();
			var sProfileTitle = oControl.getProfileTitle();
			var sFooterVisible = oControl.getFooterNavigationVisible() || false;
			var aInfoTabControls = oControl.getInfoTabs();
			//var oImage = oControl.getAggregation("brandImage");
			var oFooter = oControl.getAggregation("footer");
			var sCount = 0;
			var oBrandImageExpanded = oControl.getAggregation("brandImageExpanded");
			var oBrandImageCollapsed = oControl.getAggregation("brandImageCollapsed");
			var oActionMenu = oControl.getAggregation("actionMenu");

			try {
				oRM.write("<div"); //Div 1 begin
				oRM.writeControlData(oControl);
				oRM.addClass("bd-side-nav-page");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write("<nav");
				oRM.addClass("bd-side-nav");
				oRM.writeClasses();
				oRM.write(">");
				oRM.write("<div"); // Div 2 begin
				oRM.addClass("bd-side-nav-toggle-button");
				oRM.writeClasses();
				oRM.write(">");
				if (oBrandImageExpanded) {
					if (oBrandImageCollapsed) {
						oBrandImageExpanded.addStyleClass("bd-side-nav-toggle-button-image-expanded");
						oRM.renderControl(oBrandImageExpanded);
						oBrandImageCollapsed.addStyleClass("bd-side-nav-toggle-button-image-collapsed");
						oRM.renderControl(oBrandImageCollapsed);
					} else {
						oBrandImageExpanded.addStyleClass("bd-side-nav-toggle-button-image-expanded");
						oRM.renderControl(oBrandImageExpanded);
						oBrandImageCollapsed = new sap.ui.core.Icon({
							src: "sap-icon://menu2",
							color: "#f9fdfe"
						}).addStyleClass("bd-side-nav-toggle-button-image-collapsed");
						oRM.renderControl(oBrandImageCollapsed);
					}
				} else {
					oRM.renderControl(new sap.ui.core.Icon({
						src: "sap-icon://menu2",
						color: "#f9fdfe"
					}).addStyleClass("bd-side-nav-toggle-button-icon"));
				}
				oRM.write("</div>"); // Div 2 end

				//Profile and tabs info begin
				oRM.write("<div"); //Div 3 begin
				oRM.addClass("bd-side-nav-profile-container");
				oRM.writeClasses();
				oRM.write(">");
				if (sProfileTitle) {
					oRM.write("<div"); //Div 3 begin
					oRM.addClass("bd-side-nav-profile-title");
					oRM.writeClasses();
					oRM.write(">");
					oRM.write(sProfileTitle);

					if (oActionMenu) {
						if (oActionMenu.getVisible()) {
							var oActionButton = new sap.ui.core.Icon({
								src: "sap-icon://action-settings",
								press: function () {
									oActionMenu.openBy(this);
								}
							});

							oRM.write("<div"); //Div 3 begin
							oRM.addClass("bd-side-nav-profile-action-menu");
							oRM.writeClasses();
							oRM.write(">");
							oRM.renderControl(oActionButton);
							oRM.write("</div>");
						}
					}
					oRM.write("</div>"); //Div 3 begin
				}

				//Begin of profile info
				oRM.renderControl(oControl.getAggregation("mainProfileInfo"));
				//End of profile info

				//Info tabs
				try {
					if (aInfoTabControls.length > 0) {
						oRM.write("<div"); //Div 4 begin
						oRM.addClass("bd-side-nav-profile-tabstrip");
						oRM.writeClasses();
						oRM.write(">");
						oRM.write("<div"); //Div 5 begin
						oRM.addClass("bd-side-nav-profile-tab");
						oRM.writeClasses();
						oRM.write(">");
						sCount = 0;
						for (var i = 0; i < aInfoTabControls.length; i++) {
							if (aInfoTabControls[i].getVisible()) {
								if (sCount > 3) {
									jQuery.sap.log.error("This component renders up to 4 tabs");
									break;
								}
								//Form status
								oRM.write("<button");
								oRM.addClass("bd-side-nav-profile-tablink");
								oRM.addClass("bd-side-nav-profile-tablink-" + aInfoTabControls[i].getTabCount());
								if (i === 0) { //First tab should be active
									oRM.addClass("active");
								}
								oRM.writeClasses();
								oRM.writeAttributeEscaped("data-target-profile-tab", "bd-side-nav-profile-tabcontent-" + aInfoTabControls[i].getTabCount());
								oRM.write(">" + aInfoTabControls[i].getTabTitle() + "</button>");
								sCount++;
							}
						}
						oRM.write("</div>"); //Div 5 end

						//Render tab contents begin
						sCount = 0;
						for (var j = 0; j < aInfoTabControls.length; j++) {
							if (aInfoTabControls[j].getVisible()) {
								if (sCount > 0) {
									aInfoTabControls[j].addStyleClass("bd-side-nav-profile-tabcontent-hidden");
								}
								oRM.renderControl(aInfoTabControls[j]);
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

				oRM.write("<div"); //Div 6 begin
				oRM.addClass("bd-side-nav-icon-bar");
				oRM.writeClasses();
				oRM.write(">");

				// Unordered list 
				oRM.write("<ul");
				oRM.addClass("bd-side-nav-item-list");
				oRM.writeClasses();
				oRM.write(">");
				var _sLinkCount = 0;
				var _renderNav = function (oParent, sChild, sLevel) {
					var oIconInfo = oParent.Icon ? IconPool.getIconInfo(oParent.Icon) : false;
					oRM.write("<li");
					oRM.addClass("bd-side-nav-item");
					oRM.addClass("bd-side-nav-item-level" + sLevel);
					oRM.writeClasses();
					oRM.write(">");
					oRM.write("<a data-element-row-id='" + oParent.RowIid + "'");
					oRM.addClass("bd-side-nav-item-link");
					if (_sLinkCount === 0) {
						oRM.addClass("bd-side-nav-item-link-active");
						_sLinkCount++;
					}
					if (oIconInfo) {
						oRM.writeAttributeEscaped("data-sap-ui-icon-content", oIconInfo.content);
						oRM.addClass("bd-side-nav-item-icon");
					}
					oRM.writeClasses();
					oRM.write("href = 'javascript:void(0)'> <span class='bd-side-nav-item-text'>" + oParent.Name + "</span>");
					oRM.write("<span");
					oRM.addClass("bd-side-nav-item-tooltip");
					oRM.writeClasses();
					oRM.write(">" + oParent.Name + "</span>");

					try {
						if (oParent.hasOwnProperty("Children") && oParent.Children.length > 0) {
							oRM.write("<b");
							oRM.addClass("bd-side-nav-item-caret");
							oRM.writeClasses();
							oRM.write("></b></a>");

							oRM.write("<ul");
							oRM.addClass("bd-side-nav-item-sublist bd-side-nav-item-list-hidden");
							oRM.writeClasses();
							oRM.write(">");
							$.each(oParent.Children, function (sKey, oChild) {
								_renderNav(oChild, true, sLevel + 1);
							});
							oRM.write("</ul></li>");

						} else {
							oRM.write("</a></li>");
						}
					} catch (ex) {
						oRM.write("</a></li>");

					}

				};

				$.each(aNavData, function (sKey, aNavItem) {
					_renderNav(aNavItem, false, 1);
				});

				oRM.write("</ul>");

				oRM.write("</div>"); //Div 6 end

				if (oFooter) {
					oRM.write("<div"); //Div 8 begin
					oRM.addClass("bd-side-nav-footer");
					oRM.writeClasses();
					oRM.write(">");
					oRM.renderControl(oFooter);
					oRM.write("</div>"); //Div 8 end
				} else if (sFooterVisible) {
					//bd-side-nav-back-button
					oRM.write("<div"); //Div 8 begin
					oRM.addClass("bd-side-nav-back-button");
					oRM.writeClasses();
					oRM.write(">");
					oRM.write("</div>"); //Div 8 end
				}

				oRM.write("<span");
				oRM.addClass("bd-side-nav-toggler");
				oRM.writeClasses();
				var oIconToggler = IconPool.getIconInfo("sap-icon://navigation-left-arrow");
				oRM.writeAttribute("data-sap-ui-icon-content", oIconToggler.content);
				oRM.write("></span>");
				oRM.write("</nav>");
				oRM.write("<div"); //Div 7 begin
				oRM.addClass("bd-side-nav-page-content");
				oRM.writeClasses();
				oRM.write(
					">");
				oRM.renderControl(oControl.getAggregation("content"));
				oRM.write("</div>"); //Div 7 end
				oRM.write("</div>"); //Div 1 end

			} catch (ex) {
				jQuery.sap.log.info("render failed!");
			}
		}
	});
	E.prototype.onmouseover = function (e) {};

	E.prototype.ontap = function (e) {
		var sWidth = this._isExpanded ? "45px" : "250px";
		var sContainerLeft = this._isExpanded ? "45px" : "250px";
		var sContainerWidth = this._isExpanded ? "calc(100% - 55px)" : "calc(100% - 260px)";
		var sTooltipLeft = this._isExpanded ? "50px" : "255px";
		var t = this;
		var sText = this._isExpanded ? "none" : "block";
		var sTooltipDisplay = this._isExpanded ? "inline-block" : "none";
		var sPosition = this._isExpanded ? "center" : "left";
		var sTarget = !this._isExpanded;
		var sLinkPadding = this._isExpanded ? "0" : "10px";
		var sBlockRemove = t._isExpanded ? "bd-side-nav-display-block" : "bd-side-nav-display-hide";
		var sBlockAdd = !t._isExpanded ? "bd-side-nav-display-block" : "bd-side-nav-display-hide";

		if ($(e.target).hasClass("bd-side-nav-profile-tablink")) {

			if ($(e.target).hasClass("active")) {
				return;
			}
			var sTargetContent = $(e.target).data("target-profile-tab");
			/*$(e.target).hasClass("bd-side-nav-profile-tablink-formstatus") ? ".bd-side-nav-profile-tabcontent-formstatus" :
				$(e.target).hasClass("bd-side-nav-profile-tablink-1stappraiser") ? ".bd-side-nav-profile-tabcontent-1stappraiser" :
				$(e.target).hasClass("bd-side-nav-profile-tablink-2ndappraiser") ? ".bd-side-nav-profile-tabcontent-2ndappraiser" : null;
			*/
			if (sTargetContent) {
				sTargetContent = "." + sTargetContent;
				$(".bd-side-nav-profile-tabcontent").css("display", "none");
				$(sTargetContent).css("display", "block");
				$(".bd-side-nav-profile-tablink").removeClass("active");
				$(e.target).addClass("active");
			}

		} else if ($(e.target).hasClass("bd-side-nav-toggle-button") ||
			$(e.target).hasClass("bd-side-nav-toggler") ||
			$(e.target).hasClass("bd-side-nav-toggle-button-icon") ||
			$(e.target).hasClass("bd-side-nav-toggle-button-image-expanded") ||
			$(e.target).hasClass("bd-side-nav-toggle-button-image-collapsed")
		) {
			e.preventDefault();

			if ($(".bd-side-nav-toggle-button-image-collapsed").length) {
				$(".bd-side-nav-toggle-button-image-expanded").css({
					"visibility": this._isExpanded ? "hidden" : "visible",
					"display": this._isExpanded ? "none" : "block"
				});
				$(".bd-side-nav-toggle-button-image-collapsed").css({
					"visibility": !this._isExpanded ? "hidden" : "visible",
					"display": !this._isExpanded ? "none" : "block"
				});
			}

			$(".bd-side-nav").animate({
				width: sWidth
			}, {
				duration: 10,
				easing: "linear",
				start: function () {
					$(".bd-side-nav-page-content").css({
						"left": sContainerLeft,
						"width": sContainerWidth
					});
				},
				complete: function () {

					$(".bd-side-nav-item-text,.bd-side-nav-profile-container,.bd-side-nav-item-caret").removeClass(sBlockRemove)
						.addClass(sBlockAdd);
					$(".bd-side-nav-item-link").removeClass(t._isExpanded ? "bd-side-nav-item-link-left" : "bd-side-nav-item-link-center")
						.addClass(!t._isExpanded ? "bd-side-nav-item-link-left" : "bd-side-nav-item-link-center");

					$(".bd-side-nav-footer").css("display", sText);
					$(".bd-side-nav-item-tooltip").css({
						"left": sTooltipLeft,
						"display": sTooltipDisplay
					});

					/*var _doRest = function () {
						// $(".bd-side-nav-item-text").css("display", sText);
						// $(".bd-side-nav-profile-container").css("display", sText);
						// 
						// $(".bd-side-nav-item-caret").css("display", sText);
						// $(".bd-side-nav-item-link").css({
						// 	"justify-content": sPosition,
						// 	"padding-left": sLinkPadding
						// });
						// $(".bd-side-nav-item-tooltip").css({
						// 	"left": sTooltipLeft,
						// 	"display": sTooltipDisplay
						// });
					};*/
					$(".bd-side-nav-toggler").toggleClass("bd-side-nav-toggler-flip");
					t._isExpanded = sTarget;
					//window.setTimeout(_doRest, t._isExpanded ? 200 : 10);
				}
			});
		} else if ($(e.target).hasClass("bd-side-nav-back-button")) {
			this.fireNavButtonPressed();
		} else {
			if ($(e.target).hasClass("bd-side-nav-item-caret")) {
				var oEl = $($(e.target.parentElement.parentElement).find(".bd-side-nav-item-sublist")[0]);
				if (oEl && oEl.hasClass("bd-side-nav-item-sublist")) {
					oEl.toggle(200);
				}
			} else if ($(e.target).hasClass("bd-side-nav-item-link") || $(e.target).hasClass("bd-side-nav-item-text")) {
				$(".bd-side-nav-item-link-active").removeClass("bd-side-nav-item-link-active");

				var oClickedItem = $(e.target.parentElement).hasClass("bd-side-nav-item-link") ? e.target.parentElement :
					$(e.target).hasClass("bd-side-nav-item-link") ? e.target : null;

				if (oClickedItem) {
					$(oClickedItem).addClass("bd-side-nav-item-link-active");
				} else {
					return;
				}
				this.fireNavItemSelected({
					rowIid: $(oClickedItem).data("element-row-id")
				});
			}
		}

	};

	return E;

});