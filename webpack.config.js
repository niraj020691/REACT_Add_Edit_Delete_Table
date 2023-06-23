const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports={
        entry:'./src/index.js',

        output:{
            path: path.join(__dirname, '/public'),
            filename: 'bundle.js'
        },

        plugins:[
                new HTMLWebpackPlugin({
                    template: './index.html'
                })
        ],
        
        module:{
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                      // The `injectType`  option can be avoided because it is default behaviour
                      { loader: "style-loader", options: { injectType: "styleTag" } },
                      "css-loader",
                    ],
                },
                {
                    test: /\.(js|jsx)$/,    //kind of file extension this rule should look for and apply in test
                    exclude: /node_modules/, //folder to be excluded
                    use:  {
                        loader:'babel-loader',//loader which we are going to use
                        options:{
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        },
                    }
                }
                
            ]
        }
}