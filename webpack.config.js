module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
        publicPath: 'dist/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: ['babel-loader', 'eslint-loader'],
            exclude: /node_modules/
        }],
    },
    devtool: 'source-map',
    watch: true,

    watchOptions: {
      aggregateTimeout: 150
    }
}
