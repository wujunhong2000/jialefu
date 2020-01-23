const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports = {
    mode:"development",
    entry:"./src/script/main.js",
    output:{
       path: path.resolve(__dirname, 'dist'),
       filename:"bundle.js"
    },
    module:{
        rules: [
            {
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        options: '$'
                    },
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }
                ]
            },
            {//加载css
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index1.html",
            template:'./src/index1.html',
            chunks:["index1","vendor"],
            minify:{
                removeComment:true,
                collapseWhitespace:true
            }
        }),
        new HtmlWebpackPlugin({
            filename:"cartlist.html",
            template:'./src/cartlist.html',
            chunks:["cartlist","vendor"],
            minify:{
                removeComment:true,
                collapseWhitespace:true
            }
        }),
        new HtmlWebpackPlugin({
            filename:"registry.html",
            template:'./src/registry.html',
            chunks:["registry","vendor"],
            minify:{
                removeComment:true,
                collapseWhitespace:true
            }
        }),
        new HtmlWebpackPlugin({
            filename:"login.html",
            template:'./src/login.html',
            chunks:["login","vendor"],
            minify:{
                removeComment:true,
                collapseWhitespace:true
            }
        }),
        new HtmlWebpackPlugin({
            filename:"details.html",
            template:'./src/details.html',
            chunks:["details","vendor"],
            minify:{
                removeComment:true,
                collapseWhitespace:true
            }
        })
    ]
}