Buat folder dan file dengan susunan seperti dibawah ini :

    - webpack-project-name
        - src
            - assets
                - fonts
                - images
            - js
                - app.js
            - scss
                - styles.scss
        - index.html

    - webpack.config.js
    - Readme.md (optional)
    - .babelrc

installing webpack

    npm init

    npm i -D webpack webpack-cli
    npm i -D babel-core babel-loader babel-preset-env clean-webpack-plugin html-loader html-webpack-plugin file-loader url-loader image-webpack-loader node-sass css-loader sass-loader style-loader postcss-loader autoprefixer uglifyjs-webpack-plugin compression-webpack-plugin webpack-dev-server font-awesome

    npm i bootstrap jquery popper.js
    npm i extract-text-webpack-plugin@next

isi file .babelrc
    {
        "presets": [
            "env"
        ]
    }

isi file webpack.config.js

isi app.js
    import '../scss/styles.scss';
    import 'bootstrap';

isi _global.scss (optional)
    // css-variable
    $l-regular : 'Lato-Regular';
    $magehand : 'Magehand';

    // import fonts
    @font-face {
        font-family: $l-regular;
        src : url('../assets/fonts/Lato-Regular.ttf') format('truetype');
    }

    @font-face {
        font-family: $magehand;
        src: url('../assets/fonts/Magehand.ttf') format("truetype"),
            url('../assets/fonts/Magehand.woff') format("woff"),
            url('../assets/fonts/Magehand.woff2') format("woff2");        
    }

    // Normal CSS
    body {
        background-color: #0086d3;
        color: #eeeeee;
        font-family: $l-regular;

        img {
            height: 250px;
        }
    }

isi styles.scss
    @import "~bootstrap/scss/bootstrap";
    @import "~font-awesome/css/font-awesome.min.css";
    @import 'global';





Bugs :
    x tidak bisa background-image: '...'; di css
    x image optimizing
    x autoprefix
    x test multipages
    x test with another custom js