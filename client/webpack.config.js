const path = require("path");

const destinationDir = process.env['DIST_DIR'] || path.resolve("./dist");
console.log('Destination:', destinationDir);

module.exports = (env, argv) => ({
  entry: "./src/index.js",
  output: {
    path: destinationDir,
    filename: "weather-app-bundle.js"
  },
  watch: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
        {
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader"
            ]
        },
        {
            test: /\.(pdf|jpg|png|gif|svg|ico)$/,
            use: [
                {
                    loader: 'url-loader'
                },
            ]
        }
    ]
  }
});