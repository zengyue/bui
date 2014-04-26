'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var n2a = require('gulp-native2ascii');
var through = require('through2');
var spawn = require('child_process').spawn;


//执行子任务
function subTask(isAnt) {
  // Creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, callback) {
    //src 必须使用{read: false}
    if (file.isNull()) {
      var task;
      if(isAnt){
        task = spawn('ant', ['-f', file.path, 'build']);
      }
      else{
        task = spawn('gulp', ['--gulpfile', file.path]);
      }
      task.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
      });
      task.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      });
      task.on('close', function (code) {
        console.log('child process exited with code ' + code);
        callback();
      });
    }

    //return callback();
  });

  // returning the file stream
  return stream;
};

var desDir = './build';


//清理build目录
gulp.task('prepare', function() {
  return gulp.src(desDir, {read: false})
    .pipe(clean());
});

//
gulp.task('copy', function() {
  gulp.src(['src/common/adapter.js'])
    .pipe(gulp.dest(desDir));
  gulp.src(['src/extensions/**/*.js'])
    .pipe(gulp.dest(desDir + '/extensions'));
});


// ant的子任务
gulp.task('ant', function(){
  return gulp.src([
      './**/build.xml',
      //除去根目录下的gulpfile.js
      '!./build.xml'
    ], {read: false})
    .pipe(subTask(true));
})


// gulpfile的子任务
gulp.task('sub',['ant'], function () {
  return gulp.src([
      './**/gulpfile.js',
      //除去根目录下的gulpfile.js
      '!./gulpfile.js',
      //除去node_modules目录下的gulpfile.js
      '!./node_modules/**/gulpfile.js'
    ], {read: false})
    .pipe(subTask());
});


//合并js 
gulp.task('seed.js', ['sub'], function(){
  return gulp.src([
      desDir + '/loader.js',
      desDir + '/common.js',
      desDir + '/cookie.js',
      './src/seed.js'
    ]).pipe(concat('seed.js'))
    .pipe(gulp.dest(desDir));
});

//合并bui.js
gulp.task('bui.js', ['sub'], function(){
  return gulp.src([
      desDir + '/loader.js',
      desDir + '/common.js',
      desDir + '/cookie.js',
      desDir + '/data.js',
      desDir + '/overlay.js',
      desDir + '/list.js',
      desDir + '/picker.js',
      desDir + '/form.js',
      desDir + '/select.js',
      desDir + '/mask.js',
      desDir + '/menu.js',
      desDir + '/tab.js',
      desDir + '/toolbar.js',
      desDir + '/progressbar.js',
      desDir + '/calendar.js',
      desDir + '/editor.js',
      desDir + '/grid.js',
      desDir + '/tree.js',
      desDir + '/tooltip.js',
      './src/all.js'
    ]).pipe(concat('bui.js'))
    .pipe(gulp.dest(desDir));
});


//压缩js
gulp.task('compress.js', ['seed.js', 'bui.js'], function(){
  gulp.src(desDir + '/**/*.js')
    .pipe(uglify({
      output: {
        ascii_only: true
      },
      mangle:{
        except: ['require']
      }
      })
    )
    .pipe(rename({suffix: '-min'}))
    .pipe(gulp.dest(desDir));
});


gulp.task('minify-css', ['sub'], function() {
  // gulp.src([
  //     //build目录下面所有的css文件
  //     desDir + '/**/*.css',
  //     //非-min文件
  //     '!' + desDir + '/**/*-min.css',
  //   ])
  //   .pipe(minifyCSS())
  //   .pipe(rename({suffix: '-min'}))
  //   .pipe(gulp.dest(desDir));
  
  //拷贝assets目录下面的css文件
  gulp.src([
      './assets/css/**/*.css'
    ])
    .pipe(gulp.dest(desDir + '/css'));
  //拷贝assets目录下面的图片文件
  gulp.src([
      './assets/img/**/*.*'
    ])
    .pipe(gulp.dest(desDir + '/img'));

});

// 默认任务
gulp.task('default', ['prepare'], function() {
  gulp.start('copy', 'compress.js', 'minify-css');
  // gulp.start('sub');
});
