const standard = require("@neutrinojs/standardjs");
const web = require("@neutrinojs/web");
const styles = require("@neutrinojs/style-loader");
const styleMinify = require("@neutrinojs/style-minify");
const { ProvidePlugin } = require("webpack");
const htmlTemplate = require("@neutrinojs/html-template");

module.exports = {
  options: {
    mains: {
      index: {
        // entry: "checkin",
        title: "Oasis Hotels & Resorts | Check In",
        // template: "./src/layout-index.ejs",
        template: "!!ejs-compiled-loader!./src/layout-index.ejs",
        APP_TITLE: "TEST",
        // '!!handlebars-loader!src/index.hbs'
        // minify: false,
        // inject: false,
      },
      checkin: {
        entry: "index",
        template: "./src/layout.ejs",
        title: "Oasis Hotels & Resorts | Check In Data",
        // minify: false,
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: false, // do not remove type="text"
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      },
      checkin_agency: {
        entry: "index",
        template: "./src/layout-agencia.ejs",
        title: "Oasis Hotels & Resorts | Check In By Agency",
        // minify: false,
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: false, // do not remove type="text"
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      },
      res_number: {
        entry: "index",
        template: "./src/res_number.ejs",
        title: "Oasis Hotels & Resorts | Get Reservation Number",
        // minify: false,
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: false, // do not remove type="text"
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      },
      success: {
        title: "Oasis Hotels & Resorts | Success Page",
        template: "./src/layout-success.ejs",
        entry: "index",
        // minify: false,
      },
      success2: {
        title: "Oasis Hotels & Resorts | Success Page",
        template: "./src/layout-success2.ejs",
        entry: "index",
        // minify: false,
      },
      unsuccessful: {
        title: "Oasis Hotels & Resorts | Unsuccess Page",
        entry: "index",
        template: "./src/layout-unsuccess.ejs",
      },
    },
  },
  use: [
    // standard(),
    web({
      // publicPath: "./",
      minify: {
        // Javascript minification occurs only in production by default.
        // To change uglify-es options or switch to another minifier, see below.
        source: true,
      },
    }),
    (neutrino) => {
      console.log(neutrino);
      neutrino.config.plugin("provide").use(ProvidePlugin, [
        {
          $: "jquery",
          jQuery: "jquery",
        },
      ]);
      neutrino.config.module
        .rule("ejs")
        .use()
        .loader("ejs-compiled-loader")
        .options({
          htmlmin: true,
          htmlminOptions: {
            removeComments: true,
          },
        })
        .end();
      neutrino.config.optimization.merge({
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/].*\.js$/,
              name: "vendors",
              chunks: "all",
            },
          },
        },
      });
    },
    styles({
      loaders: ["sass-loader"],
      test: /\.(css|sass|scss)$/,
      ruleId: "sass",
    }),
    styleMinify({
      pluginId: "optimize-css",
      plugin: {
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {},
        canPrint: true,
      },
    }),
    // htmlTemplate({
    //   pluginId: "html-new",
    //   templateParameters: {
    //     foo: "bar",
    //   },
    // }),
  ],
};
