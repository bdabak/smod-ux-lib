/*global _*/
sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.ux.lib.controls.ScaleEntrance", {
    metadata: {
      properties: {
        cellValueList: { type: "object", bindable: true },
        scaleValue: { type: "string", bindable: true },
        binaryScale: { type: "boolean", bindable: true, defaultValue: false },
        editable: { type: "boolean", bindable: true, defaultValue: true },
      },
      aggregations: {
        scaleCustomizer: {
          type: "sap.m.Table",
          multiple: false,
        },
        binaryScaleBox: {
          type: "sap.ui.core.Control",
          multiple: false,
        },
      },
      events: {
        change: {},
      },
    },
    init: function () {
      var that = this;
      //initialisation code, in this case, ensure css is imported
      var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
      jQuery.sap.includeStyleSheet(sLibraryPath + "/controls/ScaleEntrance.css");

      var oModel = new sap.ui.model.json.JSONModel({
        scaleList: [],
        editable: true,
      });

      var oCustomizer = new sap.m.Table({
        alternateRowColors: true,
        inset: false,
        columns: [
          new sap.m.Column({
            hAlign: "Left",
            // header: new sap.m.Title({ text: "Ölçek" }),
          }),
          new sap.m.Column({
            width: "7rem",
            hAlign: "Center",
            // header: new sap.m.Title({ text: "Min" }),
          }),
          new sap.m.Column({
            width: "7rem",
            hAlign: "Center",
            // header: new sap.m.Title({ text: "Max" }),
          }),
        ],
      });

      this.setModel(oModel);

      var oRowTemplate = new sap.m.ColumnListItem({
        cells: [
          new sap.m.Label({
            text: "{Name}",
            wrapping: true,
          }),
          new sap.m.Input({
            placeholder: "Min",
            value: {
              path: "Low",
              type: "sap.ui.model.type.Float",
              formatOptions: {
                minFractionDigits: 3,
                maxFractionDigits: 3,
              },
            },
            editable: {
              path: "/editable",
            },
            autocomplete: false,
            valueLiveUpdate: false,
            textAlign: "Right",
            change: function (e) {
              if (isNaN(parseFloat(e.getParameter("value")))) {
                e.getSource().setValue(null);
              }
              that._updateScaleText();
            }.bind(that),
          }),
          new sap.m.Input({
            placeholder: "Max",
            value: {
              path: "High",
              type: "sap.ui.model.type.Float",
              formatOptions: {
                minFractionDigits: 3,
                maxFractionDigits: 3,
              },
            },
            editable: {
              path: "/editable",
            },
            autocomplete: false,
            valueLiveUpdate: false,
            textAlign: "Right",
            change: function (e) {
              if (isNaN(parseFloat(e.getParameter("value")))) {
                e.getSource().setValue(null);
                // } else {
                //   that._setNextMinValue(e);
              }
              that._updateScaleText();
            }.bind(that),
          }),
        ],
      });

      oCustomizer.bindAggregation("items", {
        path: "/scaleList",
        template: oRowTemplate,
      });

      this.setAggregation("scaleCustomizer", oCustomizer);

      /* Binary Scale */
      var oBinaryScale = new sap.m.HBox({
        items: [
          new sap.m.Text({
            text: "Beklenen Seviye",
          }).addStyleClass("smod-scale-entrance-emph-text"),
          new sap.m.Text({
            text: "=",
          })
            .addStyleClass("sapUiTinyMarginBeginEnd")
            .addStyleClass("smod-scale-entrance-emph-text"),
          new sap.m.Text({
            text: "Gerçekleşti",
          }).addStyleClass("smod-scale-entrance-emph-text"),
        ],
        width: "100%",
        height: "50px",
        alignItems: "Center",
        justifyContent: "Start",
      });

      this.setAggregation("binaryScaleBox", oBinaryScale);
    },
    renderer: function (oRM, oControl) {
      var oCustomizer = oControl.getAggregation("scaleCustomizer");
      var oBinaryScaleBox = oControl.getAggregation("binaryScaleBox");
      var oModel = oControl.getModel();
      var bBinaryScale = oControl.getBinaryScale();

      oModel.setProperty("/scaleList", []);

      if (!bBinaryScale) {
        //--Generate scaleCustomizer rows
        oControl._generateTableFromValue();
      } else {
        oControl.setScaleValue("");
      }

      oModel.setProperty("/editable", oControl.getEditable());

      oRM.openStart("div");
      oRM.writeControlData(oControl);
      oRM.class("smod-scale-entrance");
      oRM.openEnd();
      if (!bBinaryScale) {
        oRM.renderControl(oCustomizer);
      } else {
        oRM.renderControl(oBinaryScaleBox);
      }

      oRM.close("div");
    },
    _generateTableFromValue: function () {
      var oModel = this.getModel();
      var sScaleValue = this.getScaleValue();
      var aCellValueList = this.getCellValueList() || [];
      var aScaleList = [];

      if (aCellValueList.length === 0) {
        console.error("Scale list cannot be empty!");
        oModel.setProperty("/scaleList", aScaleList);
        return;
      }

      $.each(aCellValueList, function (i, oCellValue) {
        if (
          oCellValue.ValueEid === "%NO%VALUE%" ||
          oCellValue.ValueIid === "0000" ||
          oCellValue.ValueIid === "0001"
        ) {
          return;
        }
        aScaleList.push({
          ValueIid: oCellValue.ValueIid,
          ValueEid: oCellValue.ValueEid,
          Name: oCellValue.ValueText,
          Low: null,
          High: null,
        });
      });

      var aRows = sScaleValue.split("|") || [];
      if (aRows.length > 0) {
        $.each(aRows, function (i, oRow) {
          var aFields = oRow.split("~") || [];
          var j = _.findIndex(aScaleList, ["ValueEid", aFields[0]]);

          if (j >= 0) {
            aScaleList[j].Low = aFields[1];
            aScaleList[j].High = aFields[2];
          }
        });
      }

      oModel.setProperty("/scaleList", aScaleList);
    },
    _setNextMinValue: function (e) {
      var fVal = parseFloat(
        e.getParameter("value").replace(".", "").replace(",", ".")
      );
      var oSource = e.getSource();
      var oContext = oSource.getBindingContext();
      var sPath = oContext.sPath;
      var oModel = oContext.oModel;
      var aScaleList = oModel.getProperty("/scaleList");
      var aPath = sPath.split("/");
      var iNextRow = parseInt(aPath[2]) + 1;
      var sNextPath = "/" + aPath[1] + "/" + iNextRow + "/Low";

      if (aScaleList[iNextRow]) {
        oModel.setProperty(sNextPath, parseFloat(fVal + 0.001).toFixed(3));
      }
    },
    _updateScaleText: function () {
      var oModel = this.getModel();
      var aScaleValue = oModel.getProperty("/scaleList");
      var sScaleText = "";
      $.each(aScaleValue, function (i, oScale) {
        if (sScaleText === "") {
          sScaleText = oScale.ValueEid + "~" + oScale.Low + "~" + oScale.High;
        } else {
          sScaleText =
            sScaleText +
            "|" +
            oScale.ValueEid +
            "~" +
            oScale.Low +
            "~" +
            oScale.High;
        }
      });
      this.setScaleValue(sScaleText);
    },
  });
});
