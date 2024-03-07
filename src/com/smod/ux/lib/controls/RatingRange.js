sap.ui.define(
  ["sap/ui/core/Control", "sap/ui/core/format/NumberFormat"],
  function (Control, NumberFormat) {
    "use strict";

    var RatingRange = Control.extend("com.smod.ux.lib.controls.RatingRange", {
      metadata: {
        properties: {
          value: {
            type: "string",
            bindable: true,
            defaultValue: 0,
          },
          min: {
            type: "string",
            bindable: true,
            defaultValue: "0",
          },
          max: {
            type: "string",
            bindable: true,
            defaultValue: "100",
          },
          decimal: {
            type: "int",
            bindable: true,
            defaultValue: 0,
          },
          editable: {
            type: "boolean",
            bindable: true,
            defaultValue: true,
          },
        },
        aggregations: {},
        events: {
          pressed: {},
        },
      },

      init: function () {
        //initialisation code, in this case, ensure css is imported
        var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
        jQuery.sap.includeStyleSheet(
          sLibraryPath + "/controls/RatingRange.css"
        );
      },
      renderer: function (oRM, oControl) {
        var m = oControl.getMin();
        var x = oControl.getMax();
        var v = oControl.getValue();
        var d = oControl.getDecimal();
        var s = 1 / Math.pow(10, d);
        var bEditable = oControl.getEditable();

        if(v === undefined || v === null || isNaN(parseFloat(v))){
          v = "0";
        }
        

        oRM.openStart("div", oControl).class("srr").openEnd();

        //--Range
        oRM
          .openStart("input")
          .class("srr-input")
          .attr("type", "range")
          .attr("value", oControl._convertToFloat(v))
          .attr("min", m)
          .attr("step", s)
          .attr("max", x);

        if (!bEditable) {
          oRM.attr("disabled").class("srr-input-disabled");
        }

        oRM
          .style(
            "filter",
            "hue-rotate(-" + oControl._convertToFloat(v) + "deg)"
          )
          .openEnd()

          .close("input");
        //--Range

        //--Label
        oRM
          .openStart("span")
          .class("srr-label")
          .style("color", oControl._getLabelStyle(v))
          .openEnd()
          .text(oControl._formatValue(v))
          .close("span");
        //--Label

        //--Value
        oRM
          .openStart("div")
          .class("srr-val-container")
          .openEnd()
          .openStart("div")
          .class("srr-val-subcontainer")
          .openEnd()
          .openStart("h4")
          .class("srr-val-header")
          .style("transform", "translateX(-50%)")
          .style("left", `${oControl._convertToFloat(v)}%`)
          .openEnd()
          .openStart("span")
          .class("srr-val")
          .openEnd()
          .text(oControl._formatValue(v))
          .close("span")
          .openStart("span")
          .class("srr-val-pointer")
          .style(
            "filter",
            "hue-rotate(-" + oControl._convertToFloat(v) + "deg)"
          )
          .openEnd()
          .close("span")
          .close("h4")
          .close("div")
          .close("div");
        //--Value

        oRM.close("div");
      },

      oninput: function (e) {
        e.stopPropagation();
        e.preventDefault();

        var n = $(e.target).val();

        this.setProperty("value", n, true);

        var f = this._formatValue(n);

        //---set dom value
        this.$().find(".srr-val").text(f);
        this.$().find(".srr-label").text(f);

        //---set filter
        this.$()
          .find(".srr-input")
          .css("filter", "hue-rotate(-" + n + "deg)");
        this.$()
          .find(".srr-val-pointer")
          .css("filter", "hue-rotate(-" + n + "deg)");
        this.$().find(".srr-label").css("color", this._getLabelStyle(n));

        //--Set cursor position
        this.$()
          .find(".srr-val-header")
          .css({ transform: "translateX(-50%)", left: n + "%" });
      },

      _getLabelStyle: function (v) {
        try {
          if (parseInt(v) > 65) {
            return "whitesmoke";
          } else {
            return "black";
          }
        } catch (e) {
          return;
        }
      },
      _formatValue: function (v) {
        try {
          var oFormat = NumberFormat.getFloatInstance({
            decimals: this.getDecimal(),
            groupingEnabled: false, // grouping is enabled
            decimalSeparator: ",", // the decimal separator must be different from the grouping separator
          });
          return oFormat.format(this._convertToFloat(v));
        } catch (e) {
          return;
        }
      },
      _convertToFloat: function (v) {
        try {
          var d = v.replaceAll(",", ".");

          return parseFloat(d);
        } catch (e) {
          return;
        }
      },
    });

    return RatingRange;
  }
);
