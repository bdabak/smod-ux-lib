/*!
 * ${copyright}
 */
sap.ui.define([
	"./../library", "sap/ui/core/Control"
], function (library, Control) {
	"use strict";

	/**
	 * Constructor for a new FooterNotice control.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * Some class description goes here.
	 * @extends sap.ui.core.Control
	 *
	 * @author SAP SE
	 * @version 1.0.0
	 *
	 * @constructor
	 * @public
	 * @alias smod.ux.lib.smodcustomux.controls.FooterNotice
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var FooterNotice = Control.extend("com.smod.ux.lib.controls.FooterNotice", {
		metadata: {
			properties: {
				text: {
					type: "string",
					bindable: true
				}
			},
			aggregations: {},
			events: {}
		},

		init: function () {
			//initialisation code, in this case, ensure css is imported
			var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(sLibraryPath + "/controls/FooterNotice.css");
		},

		renderer: function (oRM, oControl) {

			//<Control begin
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("smod-footer-notice-container");
			oRM.writeClasses();
			oRM.write(">");

			//<Main beg
			oRM.write("<div");
			oRM.addClass("smod-footer-notice-content");
			oRM.writeClasses();
			oRM.write(">");

			oRM.write(oControl.getText());

			oRM.write("</div>");
			oRM.write("</div>");
			//Control end>

		}
	});
	return FooterNotice;
}, /* bExport= */ true);