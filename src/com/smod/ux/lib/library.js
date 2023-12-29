/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library com.smod.ux.lib.
 */
sap.ui.define(
  ["sap/ui/core/library"], // library dependency
  function () {
    "use strict";

    /**
     * SMOD UX library
     *
     * @namespace
     * @name com.smod.ux.lib
     * @author SAP SE
     * @version 2.0.0
     * @public
     */

    // delegate further initialization of this library to the Core
    sap.ui.getCore().initLibrary({
      name: "com.smod.ux.lib",
      version: "2.0.0",
      dependencies: ["sap.ui.core"],
      types: [],
      interfaces: [],
      controls: [
        "com.smod.ux.lib.controls.PieChart",
        "com.smod.ux.lib.controls.HierarchyView",
        "com.smod.ux.lib.controls.SideNavigation",
        "com.smod.ux.lib.controls.SideNavigationItem",
        "com.smod.ux.lib.controls.SideNavigationHeader",
        "com.smod.ux.lib.controls.SmodApexChart",
        "com.smod.ux.lib.controls.BudgetIndicator",
        "com.smod.ux.lib.controls.CandidateCard",
        "com.smod.ux.lib.controls.CompletionCard",
        "com.smod.ux.lib.controls.CompletionIndicator",
        "com.smod.ux.lib.controls.FlipCard",
        "com.smod.ux.lib.controls.FooterNotice",
        "com.smod.ux.lib.controls.StatisticCard",
        "com.smod.ux.lib.controls.ComparisonTable",
        "com.smod.ux.lib.controls.ComparisonTableColumn",
        "com.smod.ux.lib.controls.ComparisonTableFooter",
        "com.smod.ux.lib.controls.ComparisonTableCell",
        "com.smod.ux.lib.controls.CustomSideBar",
        "com.smod.ux.lib.controls.CustomSideBarStatus",
        "com.smod.ux.lib.controls.CustomSideBarProfile",
        "com.smod.ux.lib.controls.HapIndicatorPanel",
        "com.smod.ux.lib.controls.HapMessageStrip",
        "com.smod.ux.lib.controls.SmodPage",
        "com.smod.ux.lib.controls.SmodPageHeader",
        "com.smod.ux.lib.controls.SmodPageSideBar",
        "com.smod.ux.lib.controls.SmodPageSideBarItem",
        "com.smod.ux.lib.controls.SmodProfileInfo",
        "com.smod.ux.lib.controls.SmodStatusInfo",
        "com.smod.ux.lib.controls.FloatingButton",
        "com.smod.ux.lib.controls.ResultBoard",
        "com.smod.ux.lib.controls.ScaleEntrance",
        "com.smod.ux.lib.controls.SmodCalibrationGrid",
        "com.smod.ux.lib.controls.SmodCalibrationGridBlock",
        "com.smod.ux.lib.controls.SmodCalibrationGridBlockItem",
        "com.smod.ux.lib.controls.SmodCalibrationGridFilter",
        "com.smod.ux.lib.controls.SmodCalibrationGridFilterBlock",
        "com.smod.ux.lib.controls.SmodCalibrationGridHeader",
        "com.smod.ux.lib.controls.StarRating",
        "com.smod.ux.lib.controls.StarRatingItem",
        "com.smod.ux.lib.controls.Switch",
        "com.smod.ux.lib.controls.TriggerEvent",
        "com.smod.ux.lib.controls.AppFeedbackDialog",
        "com.smod.ux.lib.controls.AppFeedback",
        "com.smod.ux.lib.controls.AppFeedbackTimer",
        "com.smod.ux.lib.controls.BusyDialog",
        "com.smod.ux.lib.controls.BusyIndicator",
      ],
      elements: [],
    });

    /* eslint-disable */
    return com.smod.ux.lib;
    /* eslint-enable */
  },
  /* bExport= */ false
);
