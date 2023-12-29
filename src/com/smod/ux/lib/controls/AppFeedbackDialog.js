sap.ui.define(
  [
    "sap/m/Dialog",
    "sap/m/DialogRenderer",
    "com/smod/ux/lib/controls/AppFeedback",
  ],
  function (Dialog, DialogRenderer, AppFeedback) {
    "use strict";

    var AppFeedbackDialog = Dialog.extend(
      "com.smod.ux.lib.controls.AppFeedbackDialog",
      {
        metadata: {
          properties: {
            siteId: {
              type: "string",
              bindable: true,
            },
            title: {
              type: "string",
              bindable: true,
            },
            description: {
              type: "string",
              bindable: true,
            },
            apiUrl: {
              type: "string",
              bindable: true,
            },
          },
          aggregations: {},
          events: {},
        },
        /**
         * Events
         */
        init: function () {
          Dialog.prototype.init.call(this);

          var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the app

          jQuery.sap.includeStyleSheet(
            sLibraryPath + "/controls/AppFeedbackDialog.css"
          );

          var oFB = new AppFeedback({
            timeIsUp: this.handleTimeUp.bind(this),
            submit: this.handleSubmit.bind(this),
          });
          this._bRendered = false;

          //--Initiate content
          this.destroyContent();
          this.addAggregation("content", oFB);

          //--Give default attbiutes
          this.setShowHeader(false);
          this.addStyleClass("appFeedBackDialog").addStyleClass(
            "sapUiNoContentPadding"
          );

          this.attachAfterClose(this.handleAfterClose, this);
        },

        handleTimeUp: function (e) {
          this.close();
          if (this.fnCallback) {
            this.fnCallback();
          }
        },
        handleAfterClose: function () {
          this.destroyContent();
        },

        handleSubmit: function (e) {
          var oParam = e.getParameters();
          var that = this;
          var sUrl = this.getApiUrl() + "/api/Feedbacks";

          var fnSuccess = function (m) {
            that.close();
            if (that.fnCallback) {
              that.fnCallback();
            }
          };
          var fnFailed = function (e) {
            that.close();
            if (that.fnCallback) {
              that.fnCallback();
            }
          };

          var xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function () {
            if (
              xhr.readyState == 4 &&
              (xhr.status == 200 || xhr.status == 201)
            ) {
              fnSuccess(xhr.responseText);
            } else if (xhr.status > 399) {
              fnFailed(xhr.responseText);
            }
          };

          xhr.onerror = function () {
            fnFailed(xhr.responseText);
          };

          xhr.open("POST", sUrl, true);
          xhr.withCredentials = true;
          xhr.setRequestHeader("content-type", "application/json");

          var oPayload = {
            siteId: this.getSiteId(),
            value: oParam.rating,
            comments: oParam.explanation,
          };

          xhr.send(JSON.stringify(oPayload));
        },

        onAfterRendering: function () {
          if (!this._bRendered) {
            var oFB = this.getContent()[0];
            this._bRendered = true;
            oFB.setTitle(this.getTitle());
            oFB.setDescription(this.getDescription());
            oFB.setSiteId(this.getSiteId());
            oFB.setApiUrl(this.getApiUrl());
          }
        },

        renderer: function (oRM, oControl) {
          DialogRenderer.render(oRM, oControl);
        },
      }
    );

    AppFeedbackDialog.prototype.feedback = function (fnCallback) {
      var that = this;

      // this.open();
      var xhr = new XMLHttpRequest();

      if (typeof fnCallback === "function") {
        this.fnCallback = fnCallback;
      }

      var fnSuccess = function (m) {
        that.open();
      };

      var fnFailed = function (m) {
        that.close();
        if (that.fnCallback) {
          that.fnCallback();
        }
      };

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          fnSuccess(xhr.responseText);
        } else if (xhr.status > 399) {
          fnFailed(xhr.responseText);
        }
      };

      xhr.onerror = function () {
        fnFailed(xhr.responseText);
      };

      xhr.open(
        "GET",
        `${that.getApiUrl()}/api/Feedbacks/valid?siteId=${that.getSiteId()}`,
        true
      );
      xhr.withCredentials = true;
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send(null);
    };

    return AppFeedbackDialog;
  }
);
