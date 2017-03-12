const { mix } = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
	resolve: {
		alias: {
			'src': path.resolve(__dirname, './resources/assets/js/src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: [
					path.resolve(__dirname, 'nod_modules'),
				],
				loader: 'babel-loader',
				options: {
					presets: [
						["env", {
							targets: {
								browsers: ["last 1 versions"]
							},
							useBuiltIns: true,
						}],
						'stage-2',
						'react',
					],
				},
			},
		],
	},
}).react('resources/assets/js/src/app.jsx', 'public/js');
   //.sass('resources/assets/sass/app.scss', 'public/css');
