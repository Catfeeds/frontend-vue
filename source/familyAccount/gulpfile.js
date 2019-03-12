/* eslint-disable */
var gulp=require('gulp');
var del=require('del');
var gulpReplace=require('gulp-replace');
var rename=require('gulp-rename');
var version='1.0.2';

//1.backupDist
gulp.task('taskBackupDistSIT',function(){
  //delete(agent/)
  return del(['../../release/sit/familyAccount/**/*'],{force:true}).then(function(){
    //mind: index.html need to change
    gulp.src(['./dist/**/*','!./dist/index.html'],{base:'./dist/'}).pipe(gulp.dest('../../release/sit/familyAccount/'));

    //copy index.html, replace v=1.5.9(lodash.ili.js)
    gulp.src('./dist/index.html',{base:'./dist/'})
    .pipe(gulpReplace('<!DOCTYPE html><html>','<!DOCTYPE html><html v="'+version+'">'))
    .pipe(gulp.dest('../../release/sit/familyAccount/'));
  }); //end of del
});

//backupYApijs
gulp.task('taskApijsSIT',function(){
  //delete(y_api.js)
	return del(['./src/api/api.js'],{force:true}).then(function(){
	  gulp.src('./src/api/sit/api.js').pipe(gulp.dest('./src/api/'));
	}); //end of del
});

//backup_vimrc
// gulp.task('backup_vimrc',function(){
//   gulp.src(['../../../_vimrc']).pipe(gulp.dest('./vim_editor/'));
// });
// //backupEditorConfig
// gulp.task('backupEditorConfig',function(){
//   //:Sublime Text 3
//   //copy from /home/ili/.config/sublime-text-3/Packages/User
//   //          /home/ili/.config/sublime-text-3/Packages/User
//   gulp.src([
//     '/home/ili/.config/sublime-text-3/Packages/User/*.sublime-keymap',
//     '/home/ili/.config/sublime-text-3/Packages/User/*.sublime-snippet',
//     '/home/ili/.config/sublime-text-3/Packages/User/*.sublime-settings'
//   ]).pipe(gulp.dest('./sublime_editor/'));
//   //:vim
//   //delete(vim_editor)
//   del(['./vim_editor/**/*']).then(function(){
//     //copy from /home/ili
//     gulp.src([
//       '/home/ili/.vimrc'
//     ]).pipe(gulp.dest('./vim_editor/'));
//   });
// });

gulp.task('taskSIT', gulp.series('taskApijsSIT', 'taskBackupDistSIT'));

