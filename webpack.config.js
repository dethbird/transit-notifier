const path = require('path');
module.exports = {
    entry: path.join(__dirname, '/src/frontend/index.js'),
    output: {
        filename: 'index.js',
        path: path.join(__dirname, '/public/js')},
    resolve: {
        extensions: [".js", ".json", ".css"],
            modules: [
                './node_modules',
                './src/frontend',
                './configs'
            ]
        },
    module:{
        rules:[{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        { 
            test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/,
            loader: 'url-loader?limit=100000'
        }]
    }
}
