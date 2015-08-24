module.exports = {
    entry: {
        app: ['./index.js']
    },
    output: {
        path: __dirname + '/',
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