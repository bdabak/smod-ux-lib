sap.ui.define(["sap/ui/core/Control"], function (Control) {
    "use strict";
  
    var AppFeedbackTimer = Control.extend("com.smod.ux.lib.controls.AppFeedbackTimer", {
      metadata: {
        properties: {
          remainingPathColor: {
            type: "string",
            bindable: true,
          },
          timeLeft: {
            type: "string",
            bindable: true,
          },
        },
        aggregations: {},
        events: {},
      },
     
      renderer: function(oRM, oControl){
        var remainingPathColor = oControl.getRemainingPathColor();
        var timeLeft = oControl.getTimeLeft();
  
        //--<div class="base-timer">
        oRM
        .openStart("div", oControl)
        .class("base-timer")
        .openEnd()
        //<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        .openStart("svg")
        .class("base-times___svg")
        .attr("viewBox", "0 0 100 100")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .openEnd()
        //-- <g class="base-timer__circle">
          .openStart("g")
          .class("base-timer__circle")
          .openEnd()
            //--<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            .openStart("circle")
            .class("base-timer__path-elapsed")
            .attr("cx", "50")
            .attr("cy", "50")
            .attr("r", "45")
            .openEnd()
            .close("circle")
            //--<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            //--<path id="base-timer-path-remaining" stroke-dasharray="283" class="base-timer__path-remaining ${remainingPathColor}" d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path>
            .openStart("path")
            .class("base-timer__path-remaining")
            .class(remainingPathColor)
            .attr("id", "base-timer-path-remaining" )
            .attr("stroke-dasharray", "283" )
            .attr("d", "M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0" )
            .openEnd()
            .close("path")
            //--<path id="base-timer-path-remaining" stroke-dasharray="283" class="base-timer__path-remaining ${remainingPathColor}" d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path>
  
          .close("g")
        //-- <g class="base-timer__circle">
        .close("svg")
        //<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  
        //--<span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
        .openStart("span")
        .class("base-timer__label")
        .attr("id", "base-timer-label")
        .openEnd()
        .text(timeLeft)
        .close("span")
        //--<span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
  
        .close("div");
        //--<div class="base-timer">
      }
  
    });

  
    return AppFeedbackTimer;
  });
  