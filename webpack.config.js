const path = require('path');
// Will create an index.html file and put it in `dist` with a link to the bundled js.
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },

    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },

    // Needed for refreshing the page.
    // This tells webpack to get the assets from the publicPath, and then react-router kicks in and
    // loads the /popular assets or wherever you were when the refresh occurred.
    devServer: {
        historyApiFallback: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        })
    ]
};

