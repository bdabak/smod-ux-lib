sap.ui.define(
  ["sap/ui/core/Control", "com/smod/ux/lib/controls/AppFeedbackTimer"],
  function (Control, Timer) {
    "use strict";

    var FULL_DASH_ARRAY = 283;
    var WARNING_THRESHOLD = 90;
    var ALERT_THRESHOLD = 30;

    var COLOR_CODES = {
      info: { color: "green" },
      warning: { color: "orange", threshold: WARNING_THRESHOLD },
      alert: { color: "red", threshold: ALERT_THRESHOLD },
    };

    var TIME_LIMIT = 240;

    var AppFeedback = Control.extend("com.smod.ux.lib.controls.AppFeedback", {
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
          _rating: {
            type: "string",
            bindable: false
          }
        },
        aggregations: {
          _timer: {
            type: "com.smod.ux.lib.controls.AppFeedbackTimer",
            multiple: false,
          },
        },
        events: {
          submit: {
            parameters:{
              rating: { type: "string"},
              explanation: { type: "string" }
            }
          },
          timeIsUp: {

          }
        },
      },
      /**
       * Events
       */
      onAfterRendering: function () {
        if (!this._bRendered) {
          this._bRendered = true;
          this._startTimer(this._timeIsUp);
        }
      },
      init: function () {
        var t = new Timer({
          timeLeft: TIME_LIMIT,
          remainingPathColor: COLOR_CODES.info.color
        });
        this.setAggregation("_timer", t);

        var l = sap.ui.getCore().getConfiguration().getLanguage() || "TR";
        this._sExpPlaceholder = (function(){
          if(l.toLowerCase() === "tr"){
            return "Düşüncelerin nelerdir?"
          }else{
            return "Tell us more..."
          }
        })();
        this._sSubmitButton = (function(){
          if(l.toLowerCase() === "tr"){
            return "Gönder"
          }else{
            return "Submit"
          }
        })();
      },
      renderer: function (oRM, oControl) {
        
        oRM.openStart("div", oControl) //Main
           .class("tk-app-feedback-main")
           .openEnd()
           .openStart("img")
           .attr("src",`${oControl.getApiUrl}/images/1x1.png`)
           .attr("alt","")
           .style("display","none")
           .openEnd()
           .close("img")
           .openStart("div")
           .class("tk-app-feedback")
           .openEnd();
        
        oControl._renderInner(oRM, oControl);

        oRM.close("div") //Control
           .close("div"); //Main
      },
      _renderInner: function (oRM, oControl) {
        
        var logoPath =
          jQuery.sap.getModulePath("com.smod.ux.lib") + "/controls/images/logo.svg";
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

          //<div class="arrow"></div>
          .openStart("div")
          .class("arrow")
          .openEnd()
          .close("div")
          //<div class="arrow"></div>

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
          .attr("type", "radio")
          .attr("name", "rate")
          .attr("id", "rate-5")
          .attr("value", "5")
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
          .attr("type", "radio")
          .attr("name", "rate")
          .attr("id", "rate-4")
          .attr("value", "4")
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
          .attr("type", "radio")
          .attr("name", "rate")
          .attr("id", "rate-3")
          .attr("value", "3")
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
          .attr("type", "radio")
          .attr("name", "rate")
          .attr("id", "rate-2")
          .attr("value", "2")
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
          .attr("type", "radio")
          .attr("name", "rate")
          .attr("id", "rate-1")
          .attr("value", "1")
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

          //<div id="comment-area" style="display:none;">
          .openStart("div")
          .attr("id", "comment-area")
          .style("display", "none")
          .openEnd()
          //<textarea id="comment-textarea" name="comment-area" rows="4" placeholder="Tell us more.."></textarea>
          .openStart("textarea")
          .attr("id", "comment-textarea")
          .attr("name", "comment-textarea")
          .attr("rows", "4")
          .attr("placeholder", oControl._sExpPlaceholder)
          .openEnd()
          .close("textarea")
          //<textarea id="comment-textarea" name="comment-area" rows="4" placeholder="Tell us more.."></textarea>
          .close("div")
          //<div id="comment-area" style="display:none;">
          .close("div")
          //<div class="tk-app-feedback_container">

          //<hr style="border: 1px solid #eee;">
          .openStart("hr")
          .style("border", "1px solid #eee;")
          .openEnd()
          .close("hr")
          //<hr style="border: 1px solid #eee;">

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
          .class("submit-button")
          .attr("role", "button")
          .openEnd()
          .text(oControl._sSubmitButton)
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

      _timeIsUp: function () {
        clearInterval(window.appFeedbackTimer);
        this.fireTimeIsUp();
      },
      _startTimer: function (onTimesUp) {
        clearInterval(window.appFeedbackTimer);

        var oTimer = this.getAggregation("_timer");

        var timePassed = 0;
        var timeLeft = TIME_LIMIT;
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
    });

    AppFeedback.prototype.ontap = function(e){
      // e.preventDefault();
      // e.stopPropagation();

      console.log(e.target);
      console.log(e.target.classList);

      if($(e.target).hasClass("rating-label")){
        var r = this.$().find("#" + $(e.target).attr("for")).val() || null;
        this.setProperty("_rating", r, true);
        // console.log(this.$().find("#" + $(e.target).attr("for")).val());
        // debugger;
      }

      var rating = this.getProperty("_rating");

      if(rating !== null){
        if(parseInt(rating,10)<4){
          this.$().find("#comment-area").removeAttr("style").show();
        }else{
          this.$().find("#comment-area").removeAttr("style").hide();
          this.$().find("#comment-textarea").val("");
        }
      }

      if($(e.target).hasClass("submit-button")){
        e.preventDefault();
        e.stopPropagation();
        this.fireSubmit({
          rating: rating,
          explanation: this.$().find("#comment-textarea").val()
        });
      }
    }

    return AppFeedback;
  }
);
