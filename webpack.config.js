const path = require('path');
module.exports = {
   entry: path.join(__dirname, '/src/frontend/index.js'),
   output: {
       filename: 'index.js',
       path: path.join(__dirname, '/public/js')},
   module:{
       rules:[{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
       }]
   }
}
