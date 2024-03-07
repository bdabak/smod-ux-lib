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
            apiUrl: {
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
            useBearerToken: {
              type: "boolean",
              bindable: true,
              defaultValue: false,
            },
            tokenKey: {
              type: "string",
              bindable: true,
              defaultValue: "token",
            },
            successText: {
              type: "string",
              bindable: true,
              defaultValue:
                "Geri bildiriminiz başrıyla alınmıştır.<br>Katılımınız için teşekkür ederiz.",
            },
            errorText: {
              type: "string",
              bindable: true,
              defaultValue:
                "Erişimle ilgili bir sorun yaşanmıştır. <br> Geri bildiriminizi daha sonra tekrar paylaşmanızı rica ederiz.",
            },
            placeholders: {
              type: "object",
              bindable: true,
              defaultValue: {
                value_1:
                  "Deneyiminizle ilgili olumsuz yorumunuzu buraya yazabilirsiniz.",
                value_2:
                  "Deneyiminizle ilgili olumsuz yorumunuzu buraya yazabilirsiniz.",
                value_3:
                  "Deneyiminizle ilgili olumsuz yorumunuzu buraya yazabilirsiniz.",
                value_4:
                  "Deneyiminizle ilgili varsa olumlu yorumunuzu buraya yazabilirsiniz.",
                value_5:
                  "Deneyiminizle ilgili varsa olumlu yorumunuzu buraya yazabilirsiniz.",
              },
            },
            preparedComments: {
              type: "object",
              bindable: true,
              defaultValue: {
                value_1: [],
                value_2: [],
                value_3: [],
                value_4: [],
                value_5: [],
              },
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
          this.attachBeforeOpen(this.handleBeforeOpen, this);
        },

        handleTimeUp: function (e) {
          this.close();
          if (this.fnCallback) {
            this.fnCallback();
          }
        },
        handleAfterClose: function () {
          const oFB = this.getAggregation("content")[0];
          oFB.initiateRating();
        },
        handleBeforeOpen: function () {
          //this.destroyContent();
          const oFB = this.getAggregation("content")[0];
          oFB.initiateRating();
        },

        handleSubmit: function (e) {
          var oParam = e.getParameters();
          var that = this;

          var oPayload = {
            siteId: this.getSiteId(),
            value: oParam.rating,
            comments: oParam.comments,
          };


          var relativeUrl = "/api/Feedbacks";
          if (this.getUseBearerToken()) {
            relativeUrl = "/oidc" + relativeUrl;
          }

          this.httpPostAsync(
            this.getApiUrl() + relativeUrl,
            JSON.stringify(oPayload),
            function () {
              that.handleResult(true, null);
            },
            function (err) {
              that.handleResult(false, err);
            }
          );
        },

        handleResult: function(bSuccess, err){
          const oFB = this.getAggregation("content")[0];

          if(oFB){
            oFB.handleResult(bSuccess, err);
          }
        },

       

        onAfterRendering: function () {
          if (!this._bRendered) {
            var oFB = this.getContent()[0];
            this._bRendered = true;
            this.getTitle() ? oFB.setTitle(this.getTitle()) : null;
            this.getDescription() ? oFB.setDescription(this.getDescription()) : null;
            this.getSuccessText() ? oFB.setSuccessText(this.getSuccessText()) : null;
            this.getErrorText() ?   oFB.setErrorText(this.getErrorText()) : null;
            this.getPlaceholders() ?   oFB.setPlaceholders(this.getPlaceholders()) : null;
            this.getPreparedComments() ?   oFB.setPreparedComments(this.getPreparedComments()) : null;

            oFB.setApiUrl(this.getApiUrl());
          }
        },

        renderer: function (oRM, oControl) {
          DialogRenderer.render(oRM, oControl);
        },
        feedback: function (fnCallback) {
          var that = this;

          if (typeof fnCallback === "function") {
            this.fnCallback = fnCallback;
          }

          var fnSuccess = function () {
            that.open();
          };

          var fnFailed = function () {
            that.close();
            if (that.fnCallback) {
              that.fnCallback();
            }
          };

          var relativeUrl = "/api/Feedbacks/valid?siteId=" + that.getSiteId();
          if (this.getUseBearerToken()) {
            relativeUrl = "/oidc" + relativeUrl;
          }

          this.httpGetAsync(that.getApiUrl() + relativeUrl, function (result) {
            if (result == "false") {
              fnSuccess();
            } else {
              fnFailed();
            }
          });
        },
        httpGetAsync: function (url, onSuccess) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              onSuccess(xhr.responseText);
            }
          };
          xhr.open("GET", url, true);
          xhr.withCredentials = !this.getUseBearerToken();
          xhr.setRequestHeader("content-type", "application/json");
          if (this.getUseBearerToken()) {
            xhr.setRequestHeader(
              "Authorization",
              "Bearer " + localStorage.getItem(this.getTokenKey())
            );
          }
          xhr.send(null);
        },
        httpPostAsync: function (url, data, onSuccess, onFailed) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (
              xhr.readyState == 4 &&
              (xhr.status == 200 || xhr.status == 201)
            ) {
              onSuccess(xhr.responseText);
            } else if (xhr.status > 399) {
              onFailed(xhr.responseText);
            }
          };
          xhr.open("POST", url, true);
          xhr.withCredentials = !this.getUseBearerToken();
          xhr.setRequestHeader("content-type", "application/json");
          if (this.getUseBearerToken()) {
            xhr.setRequestHeader(
              "Authorization",
              "Bearer " + localStorage.getItem(this.getTokenKey())
            );
          }
          xhr.send(data);
        },
      }
    );

    return AppFeedbackDialog;
  }
);
