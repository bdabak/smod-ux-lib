sap.ui.define(["sap/ui/core/Control"], function (Control) {
	"use strict";

	return Control.extend("com.smod.ux.lib.controls.TriggerEvent", {
		metadata: {
			properties: {
				duration: {
					type: "int",
					bindable: true
				},
				timeLeft: {
					type: "int",
					bindable: true
				},
				pause: {
					type: "boolean",
					bindable: true
				}
			},
			events: {
				trigger: {},
			},
		},
		init: function () {
			var sLibraryPath = jQuery.sap.getModulePath("com.smod.ux.lib"); //get the server location of the ui library
			jQuery.sap.includeStyleSheet(sLibraryPath + "/controls/TriggerEvent.css");
			this.clearTriggerInterval();
		},
		onDestroy: function () {
			this.clearTriggerInterval();
		},
		onExit: function () {
			this.clearTriggerInterval();
		},

		countDown: function () {
			var bPause = this.getPause() || false;
			if (!bPause) {
				this.setProperty("timeLeft", this.getProperty("timeLeft") - 1000);
			}
		},
		pauseCounter: function () {
			this.setPause(true);
		},
		unpauseCounter: function () {
			this.setPause(false);
		},
		setTriggerInterval: function () {
			var that = this;

			this.clearTriggerInterval();
			this._interval = setInterval(
				this.triggerFunction.bind(this),
				this.getProperty("duration")
			);

			this.setProperty("timeLeft", this.getProperty("duration"), true);
			this._counterInterval = setInterval(that.countDown.bind(that), 1000);
			// console.log("Reset");
		},
		clearTriggerInterval: function () {
			if (this._interval) {
				clearInterval(this._interval);
			}
			if (this._counterInterval) {
				clearInterval(this._counterInterval);
			}
		},
		triggerFunction: function () {
			this.setProperty("timeLeft", 0);
			this.clearTriggerInterval();
			this.fireTrigger();
		},
		renderer: function (oRM, oControl) {
			oRM.openStart("div");
			oRM.writeControlData(oControl);
			oRM.class("smod-trigger-event-container");
			oRM.openEnd();
			oRM.openStart("div");
			oRM.class("smod-trigger-event");
			oRM.openEnd();
			oRM.text(oControl.convertMsToTime(oControl.getProperty("timeLeft")));
			oRM.close("div");
			oRM.close("div");
		},
		padTo2Digits: function (num) {
			return num.toString().padStart(2, "0");
		},

		convertMsToTime: function (milliseconds) {
			var seconds = Math.floor(milliseconds / 1000);
			var minutes = Math.floor(seconds / 60);
			var hours = Math.floor(minutes / 60);

			seconds = seconds % 60;
			minutes = minutes % 60;

			// 👇️ If you don't want to roll hours over, e.g. 24 to 00
			// 👇️ comment (or remove) the line below
			// commenting next line gets you `24:00:00` instead of `00:00:00`
			// or `36:15:31` instead of `12:15:31`, etc.
			hours = hours % 24;
			/* eslint-disable */
			return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`;
			/* eslint-enable */
		},
	});
});