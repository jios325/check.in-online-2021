const standard = require("@neutrinojs/standardjs");
const web = require("@neutrinojs/web");
const styles = require("@neutrinojs/style-loader");
const styleMinify = require("@neutrinojs/style-minify");
const { ProvidePlugin } = require("webpack");
const htmlTemplate = require("@neutrinojs/html-template");
const html = require("@neutrinojs/html-loader");

module.exports = {
  options: {
    mains: {
      index: {
        // entry: "checkin",
        options: {
          version: "1.0",
          test: "MAX",
        },
        titleNav: "Inicio Pre-Check in",
        title: "Oasis Hotels & Resorts | Check In",
        template: "!!ejs-compiled-loader!./src/layout-index.ejs",
        APP_TITLE: "TEST",
      },
      comprobante_agencia: {
        entry: "index",
        options: {
          version: "1.0",
          test: "MAX",
        },
        titleNav: "Comprobante agencia",
        template: "!!ejs-compiled-loader!./src/layout-agencia.ejs",
        title: "Oasis Hotels & Resorts | Check In Comprobante de Agencia",
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
      comprobante_agencia_form: {
        entry: "index",
        options: {
          test: "var",
        },
        titleNav: "Comprobante agencia",
        template: "!!ejs-compiled-loader!./src/layout-agencia_form.ejs",
        title: "Oasis Hotels & Resorts | Check In Comprobante de Agencia",
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
      pasaporte: {
        options: {
          test: "var",
        },
        entry: "index",
        template: "!!ejs-compiled-loader!./src/layout-agencia_form.ejs",
        title: "Oasis Hotels & Resorts | Check In By Agency",
        titleNav: "Escaneo de pasaporte",
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
      reserva: {
        entry: "index",
        options: {
          test: "var",
        },
        titleNav: "",
        // template: "./src/res_number.ejs",
        template: "!!ejs-compiled-loader!./src/res_number.ejs",
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
        options: {
          test: "var",
        },
        title: "Oasis Hotels & Resorts | Success Page",
        // template: "./src/layout-success.ejs",
        template: "!!ejs-compiled-loader!./src/layout-success.ejs",
        entry: "index",
        titleNav: "",
        // minify: false,
      },
      unsuccessful: {
        options: {
          test: "var",
        },
        titleNav: "",
        title: "Oasis Hotels & Resorts | Unsuccess Page",
        entry: "index",
        // template: "./src/layout-unsuccess.ejs",
        template: "!!ejs-compiled-loader!./src/layout-unsuccess.ejs",
      },
    },
  },
  use: [
    // standard(),
    web({
      publicPath: "./",
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
  ],
};
