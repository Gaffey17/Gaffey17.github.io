// function defaultTask(cb) {
//     // place code for your default task here
//     console.log(111);
//     cb();
//   }
  
//   exports.default = defaultTask

//公开任务、私有任务

//任务
// const {series,parallel} = require("gulp");

// function js(cb){
//     console.log("js被执行了");
//     cb();
// }
// function css(cb){
//     console.log("css被执行了");
//     cb();
// }
// function html(cb){
//     console.log("html被执行了");
//     cb();
// }

// exports.default = series(js,css);
// exports.default = parallel(js,css);
// exports.default = series(html,parallel(js,css))

//处理文件
const { src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename")
//I(input) O(ouput)
//less -> css -> css加上css3的前缀 -> 压缩 -> 输出

exports.default = function(){
    return src("src/JS/*.js")
            .pipe(dest("dist/js"))
            .pipe(uglify())
            .pipe(rename({extname: '.min.js'}))
            .pipe(dest("dist/js"))
}


//文件监控
const { watch } = require("gulp");
watch('src/css/*',{
    delay: 2000
},function(cb){
    console.log("文件被修改了");
    cb();
})