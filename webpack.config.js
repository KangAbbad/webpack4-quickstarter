const   webpack = require('webpack'),
        path = require('path'),
        HtmlWebPackPlugin = require('html-webpack-plugin'),
        CleanWebpackPlugin = require('clean-webpack-plugin'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
        CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry : {
        app: './src/js/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].bundle.js'
    },
    module: {
        rules: [
            // html-loader
            { 
                test: /\.html$/, 
                use: ['html-loader'] 
            },
            // sass-loader
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        }, 
                        {
                            loader: 'sass-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            // babel-loader
            {
                test: /\.js$/,
                include: /src\js/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },

            // file-loader
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/images/[name].[ext]',
                            outputPath: './'
                        }
                    }
                ]
            },
  
            //file-loader(for fonts)
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/fonts/[name].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            }
        ]
    },
    
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebPackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'css/styles.css'
        }),
        new UglifyJsPlugin({
            sourceMap: true
        }),
        new CompressionPlugin({
            test: /\.(js|css)$/,
            threshold: 10240
        })
    ],

    devServer: {
        compress: true,
        stats: 'errors-only'
    },
  
    devtool: 'inline-source-map'
}