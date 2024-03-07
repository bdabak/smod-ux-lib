sap.ui.define(
  [
    "sap/ui/core/Control",
    "com/smod/ux/lib/controls/AppFeedbackTimer",
    "com/smod/ux/lib/controls/AppFeedbackComment",
  ],
  function (Control, Timer, Comment) {
    "use strict";

    var FULL_DASH_ARRAY = 283;
    var WARNING_THRESHOLD = 90;
    var ALERT_THRESHOLD = 30;

    var COLOR_CODES = {
      info: { color: "green" },
      warning: { color: "orange", threshold: WARNING_THRESHOLD },
      alert: { color: "red", threshold: ALERT_THRESHOLD },
    };

    var AppFeedback = Control.extend("com.smod.ux.lib.controls.AppFeedback", {
      metadata: {
        properties: {
          title: {
            type: "string",
            bindable: true,
            defaultValue: "Deneyiminizden memnun kaldınız mı?",
          },
          description: {
            type: "string",
            bindable: true,
            defaultValue:
              "Görüşleriniz deneyiminizi iyileştirmemiz için önemlidir.",
          },
          apiUrl: {
            type: "string",
            bindable: true,
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
          _rating: {
            type: "int",
            bindable: false,
            defaultValue: null,
          },
        },
        aggregations: {
          _timer: {
            type: "com.smod.ux.lib.controls.AppFeedbackTimer",
            multiple: false,
          },
          _preparedComments: {
            type: "com.smod.ux.lib.controls.AppFeedbackComment",
            multiple: true,
            singularName: "_preparedComment",
          },
        },
        events: {
          submit: {
            parameters: {
              rating: { type: "string" },
              comments: { type: "string" },
            },
          },
          timeIsUp: {},
        },
      },
      /**
       * Events
       */
      onAfterRendering: function () {
        if (!this._bRendered) {
          this._bRendered = true;
          this._startTimer(this._timeIsUp.bind(this), 240);
        }
      },
      init: function () {
        var t = new Timer({
          // timeLeft: TIME_LIMIT,
          remainingPathColor: COLOR_CODES.info.color,
        });

        this.setAggregation("_timer", t);

        var oModel = new sap.ui.model.json.JSONModel({
          preparedComments: [],
        });
        this.setModel(oModel);
        var oCommentTemplate = new Comment({
          text: "{text}",
        });
        this.bindAggregation("_preparedComments", {
          path: "/preparedComments",
          template: oCommentTemplate,
        });

        var l = sap.ui.getCore().getConfiguration().getLanguage() || "TR";
      },
      renderer: function (oRM, oControl) {
        oRM
          .openStart("div", oControl) //Main
          .class("tk-app-feedback-main")
          .openEnd()
          .openStart("img")
          .attr("src", `${oControl.getApiUrl()}/images/1x1.png`)
          .attr("alt", "")
          .style("display", "none")
          .openEnd()
          .close("img")
          .openStart("div")
          .class("tk-app-feedback")
          .openEnd();

        oControl._renderInner(oRM, oControl);

        oRM
          .close("div") //Control
          .close("div"); //Main
      },
      _renderInner: function (oRM, oControl) {
        const rating = this.getProperty("_rating");
        const oPlaceHolders = this.getPlaceholders() || {};
        const sPlaceholder = oPlaceHolders["value_" + rating] || null;

        const aPreparedComments = oControl.getAggregation("_preparedComments") || [];
        var logoPath =
          jQuery.sap.getModulePath("com.smod.ux.lib") +
          "/controls/images/appfeedlogo.svg";
        //<div class="tk-app-feedback_accordion">
        oRM
          .openStart("div")
          .class("tk-app-feedback-accordion")
          .openEnd()
          //<details open>
          .openStart("details")
          .attr("open")
          .openEnd()

          //<summary>
          .openStart("summary")
          .openEnd()

          //<div class="timer" id="timer"></div>
          .openStart("div")
          .attr("id", "timer")
          .class("timer")
          .openEnd()

          .renderControl(oControl.getAggregation("_timer"))

          .close("div")
          //<div class="timer" id="timer"></div>

          // <div>{0}</div>
          .openStart("div")
          .openEnd()
          .text(oControl.getTitle())
          .close("div")
          // <div>{0}</div>

          //<div class="actions"></div>
          .openStart("div")
          .class("actions")
          .openEnd()

          //<div class="arrow"></div>
          .openStart("div")
          .class("arrow")
          .openEnd()
          .close("div")
          //<div class="arrow"></div>

          // <div class="tk-app-feedback_close" onclick="appFeedback.destroy()"></div>
          .openStart("div")
          .class("tk-app-feedback_close")
          .openEnd()
          .close("div")
          // <div class="tk-app-feedback_close" onclick="appFeedback.destroy()"></div>

          .close("div")
          //<div class="actions"></div>

          .close("summary")
          //<summary>

          //<div class="tk-app-feedback_container">
          .openStart("div")
          .class("tk-app-feedback_container")
          .openEnd()

          //<div class="star-widget">
          .openStart("div")
          .class("star-widget")
          .openEnd()

          //<input type="radio" name="rate" id="rate-5" onclick="appFeedback.onValueChange(this)" value="5">
          //<label for="rate-5"></label>
          .openStart("input")
          .class("rating-button")
          .attr("type", "radio")
          .attr("name", "rate")
          .attr("id", "rate-5")
          .attr("value", 5);
        rating === 5 ? oRM.attr("checked", true) : null;
        oRM
          .openEnd()
          .close("input")
          .openStart("label")
          .class("rating-label")
          .attr("for", "rate-5")
          .openEnd()
          .close("label")
          //<input type="radio" name="rate" id="rate-5" onclick="appFeedback.onValueChange(this)" value="5">
          //<label for="rate-5"></label>

          //<input type="radio" name="rate" id="rate-4" onclick="appFeedback.onValueChange(this)" value="4">
          //<label for="rate-4"></label>
          .openStart("input")
          .class("rating-button")
          .attr("type", "radio")
          .attr("name", "rate")
          .attr("id", "rate-4")
          .attr("value", 4);
        rating === 4 ? oRM.attr("checked", true) : null;
        oRM
          .openEnd()
          .close("input")
          .openStart("label")
          .class("rating-label")
          .attr("for", "rate-4")
          .openEnd()
          .close("label")
          //<input type="radio" name="rate" id="rate-4" onclick="appFeedback.onValueChange(this)" value="4">
          //<label for="rate-4"></label>

          //<input type="radio" name="rate" id="rate-3" onclick="appFeedback.onValueChange(this)" value="3">
          //<label for="rate-3"></label>
          .openStart("input")
          .class("rating-button")
          .attr("type", "radio")
          .attr("name", "rate")
          .attr("id", "rate-3")
          .attr("value", 3);
        rating === 3 ? oRM.attr("checked", true) : null;
        oRM
          .openEnd()
          .close("input")
          .openStart("label")
          .class("rating-label")
          .attr("for", "rate-3")
          .openEnd()
          .close("label")
          //<input type="radio" name="rate" id="rate-3" onclick="appFeedback.onValueChange(this)" value="3">
          //<label for="rate-3"></label>

          //<input type="radio" name="rate" id="rate-2" onclick="appFeedback.onValueChange(this)" value="2">
          //<label for="rate-2"></label>
          .openStart("input")
          .class("rating-button")
          .attr("type", "radio")
          .attr("name", "rate")
          .attr("id", "rate-2")
          .attr("value", 2);
        rating === 2 ? oRM.attr("checked", true) : null;
        oRM
          .openEnd()
          .close("input")
          .openStart("label")
          .class("rating-label")
          .attr("for", "rate-2")
          .openEnd()
          .close("label")
          //<input type="radio" name="rate" id="rate-2" onclick="appFeedback.onValueChange(this)" value="2">
          //<label for="rate-2"></label>

          //<input type="radio" name="rate" id="rate-1" onclick="appFeedback.onValueChange(this)" value="1">
          //<label for="rate-1"></label>
          .openStart("input")
          .class("rating-button")
          .attr("type", "radio")
          .attr("name", "rate")
          .attr("id", "rate-1")
          .attr("value", 1);
        rating === 1 ? oRM.attr("checked", true) : null;
        oRM
          .openEnd()
          .close("input")
          .openStart("label")
          .class("rating-label")
          .attr("for", "rate-1")
          .openEnd()
          .close("label")
          //<input type="radio" name="rate" id="rate-1" onclick="appFeedback.onValueChange(this)" value="1">
          //<label for="rate-1"></label>

          .close("div")
          //<div class="star-widget">

          //<span class="tk-app-feedback_container-title">{1}</span>
          .openStart("span")
          .class("tk-app-feedback_container-title")
          .openEnd()
          .text(oControl.getDescription())
          .close("span")
          //<span class="tk-app-feedback_container-title">{1}</span>

          // <div id="tk-app-feedback_prepared-comments"></div>
          .openStart("div")
          .class("tk-app-feedback_prepared-comments")
          .style("display", aPreparedComments.length > 0 ? "flex" : "none" )
          .openEnd();
        aPreparedComments.forEach((oComment) => {
          oRM.renderControl(oComment);
        });
        oRM
          .close("div")
          // <div id="tk-app-feedback_prepared-comments"></div>

          //<div id="tk-app-feedback_comment-area" style="display:none;">
          .openStart("div")
          .class("tk-app-feedback_comment-area")
          .attr("id", "tk-app-feedback_comment-area")
          .style("display", rating ? "block" : "none")
          .openEnd()
          //<textarea id="tk-app-feedback_comment-textarea" name="comment-area" rows="4" placeholder="Tell us more.."></textarea>
          .openStart("textarea")
          .class("tk-app-feedback_comment-textarea")
          .attr("id", "tk-app-feedback_comment-textarea")
          .attr("name", "comment-textarea")
          .attr("rows", "3")
          .attr("maxlength", "255");
        if (sPlaceholder) {
          oRM.attr("placeholder", sPlaceholder);
        }
        oRM
          .openEnd()
          .close("textarea")
          //<textarea id="tk-app-feedback_comment-textarea" name="comment-area" rows="4" placeholder="Tell us more.."></textarea>
          .close("div")
          //<div id="comment-area" style="display:none;">
          .close("div")
          //<div class="tk-app-feedback_container">

          //     <div id="tk-app-feedback_response" class="tk-app-feedback_response-area" style="display:none;">
          .openStart("div")
          .class("tk-app-feedback_response-area")
          .attr("id", "tk-app-feedback_response")
          .style("display", "none")
          .openEnd()

          //     <svg id="tk-app-feedback_success-svg" style="display:none;" class="tk-app-feedback_checkmark tk-app-feedback_success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          .openStart("svg")
          .attr("id", "tk-app-feedback_success-svg")
          .style("display", "none")
          .class("tk-app-feedback_checkmark")
          .class("tk-app-feedback_success")
          .attr("xmlns", "http://www.w3.org/2000/svg")
          .attr("viewBox", "0 0 52 52")
          .openEnd()
          //         <circle class="tk-app-feedback_checkmark_circle_success" cx="26" cy="26" r="25" fill="white" />
          .openStart("circle")
          .attr("id", "tk-app-feedback_checkmark_circle_success")
          .attr("cx", "26")
          .attr("cy", "26")
          .attr("r", "25")
          .attr("fill", "white")
          .openEnd()
          .close("circle")
          //         <path class="tk-app-feedback_checkmark_check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" stroke-linecap="round" />
          .openStart("path")
          .class("tk-app-feedback_checkmark_check")
          .attr("fill", "none")
          .attr("d", "M14.1 27.2l7.1 7.2 16.7-16.8")
          .attr("stroke-linecap", "round")
          .openEnd()
          .close("path")
          //     </svg>
          .close("svg")

          //     <svg id="tk-app-feedback_error-svg" style="display:none;" class="tk-app-feedback_checkmark tk-app-feedback_error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          .openStart("svg")
          .attr("id", "tk-app-feedback_error-svg")
          .style("display", "none")
          .class("tk-app-feedback_checkmark")
          .class("tk-app-feedback_error")
          .attr("xmlns", "http://www.w3.org/2000/svg")
          .attr("viewBox", "0 0 52 52")
          .openEnd()
          //         <circle class="tk-app-feedback_checkmark_circle_error" cx="26" cy="26" r="25" fill="white" />
          .openStart("circle")
          .attr("id", "tk-app-feedback_checkmark_circle_error")
          .attr("cx", "26")
          .attr("cy", "26")
          .attr("r", "25")
          .attr("fill", "white")
          .openEnd()
          .close("circle")
          //         <path class="tk-app-feedback_checkmark_check" stroke-linecap="round" fill="none" d="M16 16 36 36 M36 16 16 36" />
          .openStart("path")
          .class("tk-app-feedback_checkmark_check")
          .attr("fill", "none")
          .attr("stroke-linecap", "round")
          .attr("d", "M16 16 36 36 M36 16 16 36")
          .openEnd()
          .close("path")
          //     </svg>
          .close("svg")
          //     <p id="tk-app-feedback_response-title" class="tk-app-feedback_response-title">
          .openStart("p")
          .attr("id", "tk-app-feedback_response-title")
          .class("tk-app-feedback_response-title")
          .openEnd()
          .close("p")
          //</p>

          // </div>
          .close("div")

          // <hr style="border: 1px solid #eee; margin: 0.8rem 0;">
          .openStart("hr")
          .style("border", "1px solid #eee;")
          .style("margin", "margin: 0.8rem 0;")
          .openEnd()
          .close("hr")
          // <hr style="border: 1px solid #eee; margin: 0.8rem 0;">

          //<div class="accordion-footer">
          .openStart("div")
          .class("accordion-footer")
          .openEnd()
          //<div class="accordion-footer-img">
          .openStart("div")
          .class("accordion-footer-img")
          .openEnd()
          .openStart("img")
          .attr("src", logoPath)
          .openEnd()
          .close("img")
          .close("div")
          //<div class="accordion-footer-img">

          //<div class="submit">
          .openStart("div")
          .class("submit")
          .openEnd()
          //<button class="submit-button" role="button" onclick="appFeedback.onSubmit(this)">Gönder</button>
          .openStart("button")
          .attr("id", "tk-app-feedback_submit-button")
          .class("submit-button")
          .attr("role", "button")
          .attr("data-function", "submit");
        rating > 0 ? null : oRM.attr("disabled", true);
        oRM
          .openEnd()
          .text("Gönder")
          .close("button")
          //<button class="submit-button" role="button" onclick="appFeedback.onSubmit(this)">Gönder</button>
          .close("div")
          //<div class="submit">
          .close("div")
          //<div class="accordion-footer">

          .close("details")
          //<details open>
          .close("div");
        //<div class="tk-app-feedback_accordion">
      },
      setPreparedComment: function (sCommentText) {
        const oEl = this.$().find(".tk-app-feedback_comment-textarea");

        oEl.val((oEl.val() + " " + sCommentText).trimStart(" "));
      },

      handleResult: function (bSuccess, err) {
        var container = this.$().find(".tk-app-feedback_container"),
          responseArea = this.$().find(".tk-app-feedback_response-area"),
          successSvg = this.$().find(".tk-app-feedback_success"),
          errorSvg = this.$().find(".tk-app-feedback_error"),
          responseTitle = this.$().find(".tk-app-feedback_response-title"),
          submitButton = this.$().find(".submit-button");

        if (container) {
          container.css("opacity", 0).css("display", "none");
        }

        if (responseArea) {
          responseArea.css("display", "flex");
        }

        if (submitButton) {
          submitButton
            .attr("value", "Kapat")
            .attr("data-function", "close")
            .text("Kapat")
            .removeAttr("disabled");
        }

        if (bSuccess) {
          if (successSvg) {
            successSvg.css("display", "block");
          }

          if (responseTitle) {
            responseTitle.html(this.getSuccessText());
          }
        } else {
          if (errorSvg) {
            errorSvg.css("display", "block");
          }
          if (responseTitle) {
            responseTitle.html(this.getErrorText());
          }
          console.log(err);
        }

        this._startTimer(this._timeIsUp.bind(this), 10);
      },
      _timeIsUp: function () {
        clearInterval(window.appFeedbackTimer);
        this.fireTimeIsUp();
      },
      _startTimer: function (onTimesUp, timeLimit) {
        clearInterval(window.appFeedbackTimer);

        var oTimer = this.getAggregation("_timer");

        var timePassed = 0;
        var TIME_LIMIT = timeLimit;
        var timeLeft = timeLimit;
        var remainingPathColor = COLOR_CODES.info.color;
        var that = this;

        var doStartTimer = function () {
          window.appFeedbackTimer = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            oTimer.setTimeLeft(timeLeft);
            setCircleDasharray();
            setRemainingPathColor(timeLeft);
            if (timeLeft === 0) {
              clearInterval(window.appFeedbackTimer);
              onTimesUp();
            }
          }, 1000);
        };
        var formatTime = function (time) {
          var minutes = Math.floor(time / 60);
          var seconds = time % 60;
          if (seconds < 10) {
            seconds = `0${seconds}`;
          }
          return `${minutes}:${seconds}`;
        };

        var setRemainingPathColor = function (timeLeft) {
          var c = COLOR_CODES.info.color;
          if (timeLeft <= COLOR_CODES.alert.threshold) {
            c = COLOR_CODES.alert.color;
          } else if (timeLeft <= COLOR_CODES.warning.threshold) {
            c = COLOR_CODES.warning.color;
          }
          oTimer.setRemainingPathColor(c);
        };

        var calculateTimeFraction = function () {
          var rawTimeFraction = timeLeft / TIME_LIMIT;
          return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
        };

        var setCircleDasharray = function () {
          var circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
          ).toFixed(0)} 283`;
          that
            .$()
            .find("#base-timer-path-remaining")
            .attr("stroke-dasharray", circleDasharray);
        };

        doStartTimer();
      },

      _rated: function (oRatingElement) {
        const r = parseInt(oRatingElement.val(), 10) || null;
        const oPlaceHolders = this.getPlaceholders() || {};
        const oPreparedComments = this.getPreparedComments() || {};

        //--Remove all active buttons
        this.$().find(".active").removeClass("active");

        //--Add
        oRatingElement.addClass("active");


        //--Set form elements
        //---First clear place holder
        // this.$()
        //   .find(".tk-app-feedback_comment-textarea")
        //   .removeAttr("placeholder");
        // this.$()
        //   .find(".prepared-comment-item")
        //   .css("display", "none")
        //   .removeAttr("title")
        //   .text("");
        //---First clear place holder
        if (r > 0) {
          // this.$().find(".submit-button").removeAttr("disabled");
          // this.$()
          //   .find(".tk-app-feedback_comment-area")
          //   .css("display", "block");
          // const sPlaceholder = oPlaceHolders["value_" + r];
          // if (sPlaceholder) {
          //   this.$()
          //     .find(".tk-app-feedback_comment-textarea")
          //     .attr("placeholder", sPlaceholder);
          // }

          const aComment = oPreparedComments["value_" + r] || [];

          this.getModel().setProperty("/preparedComments", aComment, null, true);
        } else {
          this.getModel().setProperty("/preparedComments", [], null, true);
          // this.$().find(".submit-button").attr("disabled");
          // this.$()
          //   .find(".tk-app-feedback_comment-area")
          //   .style("display", "none");
        }

        this.setProperty("_rating", r);

        if (r < 4) {
          this.$().find(".tk-app-feedback_comment-textarea").focus();
        }
      },
      initiateRating: function(){
        this.getModel().setProperty("/preparedComments", []);
        this.setProperty("_rating", null);
        this._bRendered = true;
        this._startTimer(this._timeIsUp.bind(this), 240);
      },
      handleSubmit: function (e, oEl) {
        e.preventDefault();
        e.stopPropagation();

        var commentTextarea = this.$().find(
          ".tk-app-feedback_comment-textarea"
        );
        var comments = commentTextarea?.val();
        var rating = this.getProperty("_rating");

        if (
          !rating ||
          !(rating > -1 && rating < 6) ||
          (rating < 4 && !comments)
        ) {
          commentTextarea.focus();
          return false;
        }
        oEl.attr("disabled", true).val("Gönderiliyor").text("Gönderiliyor");

        this.fireSubmit({
          rating: rating,
          comments: comments,
        });
      },
      handleClose: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this._timeIsUp();
      },
      ontap: function (e) {
        const oEl = $(e.target);
        if (!oEl) {
          return;
        }

        //--Rating button
        if (oEl.hasClass("rating-button")) {
          this._rated(oEl);
        }

        //--Rating label
        if (oEl.hasClass("rating-label")) {
          const oRating = this.$().find("#" + oEl.attr("for"));
          if (oRating) {
            this._rated(oRating);
          }
        }

        if (oEl.hasClass("submit-button")) {
          const f = oEl.attr("data-function");
          if (f === "submit") {
            this.handleSubmit(e, oEl);
          } else {
            this.handleClose(e);
          }
        }

        if (oEl.hasClass("tk-app-feedback_close")) {
          this.handleClose(e);
        }
      },
    });

    return AppFeedback;
  }
);
