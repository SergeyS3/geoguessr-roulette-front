const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
	const config = {
		mode: 'development',
		entry: {
			panel: './src/panel/index.jsx',
			overlay: './src/overlay/index.jsx',
		},
		output: {
			filename: '[contenthash].js',
			
			publicPath: '/build/',
			path: path.join(__dirname, './public/build')
		},
		resolve: {
			extensions: ['.js', '.jsx']
		},
		module: {
			rules: [
				{
					test: /\.jsx$/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-react']
						}
					}
				}, {
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader'
					]
				},
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: '[contenthash].css'
			}),
			new HtmlWebpackPlugin({
				title: 'Geoguessr roulette',
				filename: 'index.html',
				chunks: ['panel']
			}),
			new HtmlWebpackPlugin({
				title: '',
				filename: 'overlay.html',
				chunks: ['overlay']
			}),
		],
		stats: {
			children: false,
			version: false,
			hash: false,
			modules: false,
		},
	}
	
	if(argv.mode === 'production') {
		config.plugins.push(
			new CssMinimizerPlugin({
				minimizerOptions: {
					preset: [ 'default', {
						discardComments: {removeAll: true}, 
						cssDeclarationSorter: true,
					}],
				},
			}),
		)
		config.optimization = {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					minify: TerserPlugin.uglifyJsMinify,
					extractComments: 'false',
				}),
			],
		}
	}
	else
		config.module.rules.push({
			test: /\.js$/,
			enforce: 'pre',
			use: ['source-map-loader'],
		})
	
	return config
}
