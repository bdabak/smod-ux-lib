/*global _*/
sap.ui.define(
  ["sap/ui/core/Control", "sap/ui/core/IconPool"],
  function (Control, IconPool) {
    "use strict";

    return Control.extend("com.smod.ux.lib.controls.ResultBoard", {
      metadata: {
        properties: {
          icon: { type: "string", bindable: true },
          iconColor: {
            type: "string",
            bindable: true,
            defaultValue: "#1a3a6f",
          },
          tooltip: { type: "string", bindable: true },
          result: { type: "string", bindable: true },
          status: { type: "string", bindable: true, defaultValue: "None" },
          noValueText: { type: "string", bindable: true, defaultValue: "N/A" },
        },
        aggregations: {},
        events: {
          pressed: {},
        },
      },
      init: function () {
        //initialisation code, in this case, ensure css is imported
        var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
        jQuery.sap.includeStyleSheet(sLibraryPath + "/controls/ResultBoard.css");
      },
      renderer: function (oRM, oControl) {
        if (oControl.getIcon()) {
          var oIcon = new sap.ui.core.Icon({
            size: "15px",
            color: oControl.getIconColor(),
            src: oControl.getIcon(),
          });
        }
        //oControl.setAggreagation("_icon", oIcon);

        var sResult = oControl.getResult();
        if (sResult === null || sResult === undefined || sResult === "") {
          sResult = oControl.getNoValueText();
        }

        var oResult = new sap.m.Text({
          text: sResult,
        });

        //oControl.setAggreagation("_box", oVBox);

        oRM.openStart("div");
        oRM.writeControlData(oControl);
        oRM.class("smod-result-board-container");

        oRM.openEnd();

        oRM.openStart("div");
        oRM.class("smod-result-board");
        oRM.class("smod-result-board-" + oControl.getStatus().toLowerCase());
        oRM.openEnd();

        if (oControl.getTooltip()) {
          oRM.openStart("span");
          oRM.class("smod-result-board-tooltip");
          oRM.openEnd();
          oRM.text(oControl.getTooltip());
          oRM.close("span");
        }
        if (oControl.getIcon()) {
          oRM.openStart("div");
          oRM.class("smod-result-board-icon");
          oRM.openEnd();
          oRM.renderControl(oIcon);
          oRM.close("div");
        }

        oRM.openStart("div");
        oRM.class("smod-result-board-result");
        oRM.openEnd();
        oRM.renderControl(oResult);
        oRM.close("div");

        oRM.close("div");

        oRM.close("div");
      },
    });
  }
);
