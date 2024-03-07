sap.ui.define(["sap/ui/core/Control"], function (Control) {
    "use strict";
  
    var AppFeedbackComment = Control.extend("com.smod.ux.lib.controls.AppFeedbackComment", {
      metadata: {
        properties: {
          text: {
            type: "string",
            bindable: true,
          },
        },
        aggregations: {},
        events: {},
      },
     
      renderer: function(oRM, oControl){
        const sText = oControl.getText(); 
        oRM.openStart("span",oControl)
         .class("prepared-comment-item")
         .attr("title", sText)
         .openEnd()
         .text(sText)
         .close("span")
      },
      ontap: function(){
        this.getParent().setPreparedComment(this.getText());
      }
  
    });

  
    return AppFeedbackComment;
  });
  