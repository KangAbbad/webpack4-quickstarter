> ## **Cheatsheet!**

**1. Run these commands in the terminal to create project folders and install all dependencies**

    - mkdir project_name && cd project_name
    - mkdir src src/assets src/assets/fonts src/assets/images src/js src/scss
    - touch webpack.config.js .babelrc src/index.html src/js/app.js src/scss/styles.scss src/scss/_global.scss
    - npm init -y
    - npm i -D webpack webpack-cli
    - npm i -D babel-core babel-loader babel-preset-env clean-webpack-plugin html-loader html-webpack-plugin file-loader url-loader node-sass css-loader sass-loader style-loader postcss-loader autoprefixer uglifyjs-webpack-plugin compression-webpack-plugin webpack-dev-server font-awesome
    - npm i bootstrap jquery popper.js
    - npm i extract-text-webpack-plugin@next

**2. Configure package.json > scripts with this**

    "scripts": {
        "dev": "webpack-dev-server --mode development --open",
        "build": "webpack --mode production",
        "build:prod": "webpack -p",
        "watch": "webpack --watch"
    }

**3. Add this snippet into .babelrc**

    {
        "presets": [
            "env"
        ]
    }

**4. Populate your src/assets/fonts with your downloaded fonts (in this case we are using local font) and src/assets/images with an images**

**5. Configure your src/js/app.js**

    import '../scss/styles.scss';
    import 'bootstrap';

    // Check inspect element browser console
    console.log("Hai there!");

**6. Populate your src/index.html (with an image too)**

**7. Configure your src/scss/styles.scss**

    @import "~bootstrap/scss/bootstrap";
    @import "~font-awesome/css/font-awesome.min.css";
    @import 'global';

> Note :
> - In this case `global` is custom scss

**8. Configure your src/scss/_global.scss (for your custom scss, this is optional)**

    // import fonts
    @font-face {
        font-family: 'MyFont';
        src : url('../assets/fonts/MyFont.ttf') format('truetype');
    }

    // Custom CSS
    body {
        background-color: #0086d3;
        color: #eeeeee;
        font-family: 'MyFont';
    }

**9. Copy and paste this configuration file into your webpack.config.js (make sure that project folders hierarchy to be the same)**

    const webpack = require('webpack');
    const path = require('path');
    const HtmlWebPackPlugin = require('html-webpack-plugin');
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
    const CompressionPlugin = require("compression-webpack-plugin");

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
                                loader: 'postcss-loader', // Run post css actions
                                options: {
                                    plugins: function () { // post css plugins, can be exported to postcss.config.js
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
                // file-loader (for images)
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

**10. Run npm scripts to see your application in action in browser and in production format. And Voillaaa!! You did it! Don’t forget to inspect element in the browser console to make sure everything’s working great without any error**

> ## **End of This Long Guide**

<div align="center">
    <h1>If you find something that’s not right in this guide, mention it into the comment section. I really look forward to your feedback</h1>
    <h1>Thank you for beeing patience and If you like it, don't forget to click star button at the top</h1>
</div>
