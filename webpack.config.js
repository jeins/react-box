var path = require('path');

var SRC_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: SRC_DIR + '/app/index.js',
    output: {
        path: SRC_DIR,
        filename: 'app.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: SRC_DIR,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'react'], plugins: ["transform-decorators-legacy", "transform-class-properties"] }
            }
        ]
    }
};

module.exports = config;
