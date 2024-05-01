const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development", // Set the mode to development
    entry: {
      main: "./src/js/index.js", // Entry point for main JavaScript bundle
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js", // Output filename with dynamic name based on entry key
      path: path.resolve(__dirname, "dist"), // Output directory path
    },
    plugins: [
      // HTMLWebpackPlugin configuration
      new HtmlWebpackPlugin({
        template: "./index.html", // Path to HTML template
        title: "Webpack Plugin", // HTML title
      }),
      // Workbox InjectManifest configuration
      new InjectManifest({
        swSrc: "./src-sw.js", // Service worker source file
        swDest: "src-sw.js", // Destination file for injected service worker
      }),
      // WebpackPwaManifest configuration
      new WebpackPwaManifest({
        fingerprints: false, // Disable file fingerprinting
        inject: true, // Inject manifest information into HTML
        name: "Just Another Text Editor", // Application name
        short_name: "JATE", // Short name
        description: "Offline text editor", // Description
        background_color: "#225ca3", // Background color
        theme_color: "#225ca3", // Theme color
        start_url: "/", // Start URL
        publicPath: "/", // Public path
        icons: [
          {
            src: path.resolve("src/images/logo.png"), // Path to application icon
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join("assets", "icons"), // Destination folder for icons
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i, // CSS file rule
          use: ["style-loader", "css-loader"], // Loaders for CSS files
        },
        {
          test: /\.m?js$/, // JavaScript file rule
          exclude: /node_modules/, // Exclude node_modules folder
          use: {
            loader: "babel-loader", // Babel loader for JavaScript files
            options: {
              presets: ["@babel/preset-env"], // Babel presets
              plugins: [
                "@babel/plugin-proposal-object-rest-spread", // Babel plugin for object rest spread
                "@babel/transform-runtime", // Babel plugin for runtime transformation
              ],
            },
          },
        },
      ],
    },
  };
};
