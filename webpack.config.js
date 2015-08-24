module.exports = {
    entry: {
        app: ['webpack/hot/dev-server', './es2015/index.js']
    },
    output: {
        path: __dirname + '/release2015',
        filename: 'app.js'
    },
    devtool: 'source-map',
    resolve: {
        modulesDirectories: ['web_modules', 'node_modules']
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    }
}