var gulp = require('gulp');
var htmlClean = require("gulp-htmlclean");      // 压缩html插件
var imagemin = require("gulp-imagemin");        // 压缩图片插件
var uglify = require('gulp-uglify');            // 压缩js
var debug = require('gulp-strip-debug');        // 去掉调试语句
// 将less转换为css
var less = require('gulp-less');
// 压缩css
var cleanCss = require('gulp-clean-css');
// 给css属性添加前缀
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');     // 执行结果作为参数放入postcss中
// 开启服务器
var connect = require('gulp-connect');

var folder = {                                  // 创建对象存储路径信息
    src:"src/",
    dist:"dist/"
}

// 判断当前是开发环境还是生产环境
var devMod = process.env.NODE_ENV == 'development';
// $ export NODE_ENV=development   // 设置环境变量
console.log(devMod);

gulp.task("html",function() {                   // 创建一个名为HTML的命令
    var page = gulp.src(folder.src + "html/*")             // 取到src目录下的所有HTML文件
        .pipe(connect.reload());                 // 自动刷新页面
        // 如果是开发环境就不压缩代码
        if(!devMod) {
            page.pipe(htmlClean())                      // 压缩html文件
        }
        page.pipe(gulp.dest(folder.dist + "html/")) // 将文件输出到src目录下的html目录(没有自动创建)

})
gulp.task("css",function() {                   // 创建一个名为css的命令
    var page = gulp.src(folder.src + "css/*")             // 取到css目录下的所有css文件
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]));       // 给css属性添加前缀（兼容性问题）
        if(!devMod) {
            page.pipe(cleanCss())                      // 压缩css文件
        }
        page.pipe(gulp.dest(folder.dist + "css/"))            

})
gulp.task("js",function() {                   // 创建一个名为js的命令
    var page = gulp.src(folder.src + "js/*")             // 取到js目录下的所有js文件
        .pipe(connect.reload());
        if(!devMod) {
            page.pipe(debug())                 // 删除调试语句
            .pipe(uglify())                    // 压缩js文件
        }
        page.pipe(gulp.dest(folder.dist + "js/"))            

})

gulp.task("img",function() {                   // 创建一个名为img的命令
    gulp.src(folder.src + "img/*")             // 取到img目录下的所有js文件
        .pipe(imagemin())                      // 压缩图片
        .pipe(gulp.dest(folder.dist + "img/"))            

})

// 开启服务器
gulp.task("server",function() {
    connect.server({
        port:'8081',         // 修改端口号
        livereload:true     // 开启自动刷新(还需在每个命令中加入connect.reload()命令)
    })
})

// 开启监听
gulp.task("watch",function() {
    gulp.watch(folder.src + "html/*",["html"]),      // watch（文件，命令），选择src目录下的所有HTML文件，文件发生改变就执行"html"命令
    gulp.watch(folder.src + "css/*",["css"]),
    gulp.watch(folder.src + "js/*",["js"])
})
gulp.task('default',["html","css","js","img","server","watch"]);                   // default任务为默认任务
