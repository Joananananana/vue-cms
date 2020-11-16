// 由于webpack是基于Node进行构建的，所有webpack的配置文件中，任何合法的Node代码都是支持的

// 配置文件通过node中的模块操作 向外暴露了一个配置对象
const path = require('path')

//启用热更新 第二步
// const webpack = require('webpack')

// 导入在内存中生成HTML页面的 html-webpack-plugin 插件
// 只要是插件 就要放到module.exports的plugin中去
// 这个插件的两个作用 在内存中生成首页 且自动把bundle.js引入到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 指定入口和出口
    entry: path.join(__dirname, './src/main.js'), //要打包的文件
    output: {
        path: path.join(__dirname, './dist'), //输出目录
        filename: 'bundle.js' //指定输出的文件名称
     },
    //  //配置webpack-dev-server命令参数的第二种方式  第一种在package.json中
    // devServer:{     
    //     // --open --port 3000 --contentBase src
    //     open:true,
    //     port:3000,
    //     contentBase:'src',
    //     hot:true  //启用热更新 第一步
    // },
    // // 配置插件的节点
    // plugins:[
    //     new webpack.HotModuleReplacementPlugin() //new一个热更新的模块对象 这是启用热更新的第三步
    // ]
    plugins:[
        new htmlWebpackPlugin({
            // 创建一个在内存中生成HTML页面的插件
            template:path.join(__dirname,'./src/index.html'), //指定模板页面 将来会根据指定的页面路径去生成内存中的页面
            filename:'index.html' //指定生成的页面的名称
        }),
        new VueLoaderPlugin()
    ],
    // 这个节点用于配置所有 第三方模块加载器
    module:{
        rules:[  //所有第三方模块的匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']},   //匹配所有以.css结尾的文件,配置处理第三方loader规则
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=380,397&name=[hash:8]-[name].[ext]'},  //处理图片路径的loader 
            // limit给定的值是图片的大小 单位是byte 如果我们引用的图片大小 大于或等于limit值 则不会被转为base64格式的字符串 如果小于limit值 则会被转为base64的字符串
            // name=[name].[ext] 文件名后缀名保持不变
            // [hash:8] 八位哈希值  解决同名文件显示同一张图片的问题 index.scss

            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'}, //处理字体文件的loader
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/}, //配置Babel来转化高级的ES语法
            {test:/\.vue$/,use:'vue-loader'}
        ]
    },
    resolve:{
        alias:{
            //设置Vue被导入时候的包的路径
            // "vue$":"vue/dist/vue.js"
        }
    }
}