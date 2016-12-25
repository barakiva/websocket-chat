var webpack = require('webpack');

module.exports = {
	entry:{
		vendor: "./app/js/vendor",
		app: "./app/js/main"
	},
	output: {
		path: __dirname,
		filename: "./dist/[name].js"
	},
	resolve: {
		extensions: ['', '.js', '.ts']
	},
	module: {
		loaders: [{
			test: /\.ts/, loaders: ['ts-loader'], exclude: /node_modules/
		}]
	},
	plugins: [	  
      new webpack.optimize.UglifyJsPlugin({
    	  mangle: {
    		  props: false
    	  }
      })
    ]
};