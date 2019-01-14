var path = require('path');

module.exports = {
    entry: './es2015/index.js',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, '/release2015'),
        compress: true,
        port: 9000
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/release2015',
    }
};
