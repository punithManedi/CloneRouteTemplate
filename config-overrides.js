const path = require("path");
const {
  override,
  addWebpackAlias
} = require("customize-cra");
const webpack = require("webpack");

module.exports = override(
  addWebpackAlias({
    "@components": path.resolve(__dirname, "src/components/"),
    "@hooks": path.resolve(__dirname, "src/hooks/"),
    "@pages": path.resolve(__dirname, "src/pages/"),
    "@utils": path.resolve(__dirname, "src/utils/"),
    // Add more aliases as needed
  }),
  (config) => {
    // Update the entry based on the WIDGET_ENTRY environment variable.
 
      config.entry = {
        main: "./src/index.js", // Entry for Revision Float widget
      };
    

    // Remove the DefinePlugin that sets process.env.WIDGET_ENTRY if it exists
    config.plugins = config.plugins.filter(
      (plugin) => !(plugin instanceof webpack.DefinePlugin)
    );

    // Define externals for the 3DEXPERIENCE modules
    config.externals = {
      "DS/DataDragAndDrop/DataDragAndDrop":
        "DS/DataDragAndDrop/DataDragAndDrop",
      "DS/PlatformAPI/PlatformAPI": "DS/PlatformAPI/PlatformAPI",
      "DS/TagNavigatorProxy/TagNavigatorProxy":
        "DS/TagNavigatorProxy/TagNavigatorProxy",
        "DS/WAFData/WAFData": "DS/WAFData/WAFData",
      "UWA/Utils/InterCom": "UWA/Utils/InterCom",
    };

    return config;
  }
);