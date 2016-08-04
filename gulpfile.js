var gulp = require('gulp');
var phpcs = require('gulp-phpcs');
var eslint = require('gulp-eslint');

gulp.task('phpcs', function () {
    return gulp.src(['**/*.php', '!tgmpa/**/*.php', '!wpcs/**/*.*', '!node_modules/**/*.*'])
        // Validate files using PHP Code Sniffer
        .pipe(phpcs({
            bin: 'wpcs/vendor/bin/phpcs',
            standard: 'WordPress-Extra',
            warningSeverity: 0
        }))
        // Log all problems that was found
        .pipe(phpcs.reporter('log'));
});

gulp.task('eslint', function () {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['js/**/*.js', '!js/**/vendor/*.js', '!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});
