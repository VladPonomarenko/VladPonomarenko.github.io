const gulp = require('gulp');
const del = require('del');
const htmlMin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const imgMin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const paths = {
  root: './build',
  pages: {
	src: './src/*.html',
	dest: './build'
    },
  css: {
	src: './src/css/**/*.css',
	dest: './build/css'
    },
  scripts: {
	src: './src/js/**/*.js',
	dest: './dest/js/js'
    },
  fonts: {
	src: './src/fonts/**/*.woff*',
	dest: './build/fonts'
    },
  img: {
	src: './src/img/**/*.*',
	dest: './build/img'
  },
  php: {
  	src: './src/*.php',
    dest: './build',
    vendorSrc: './src/vendor/**/*.*',
    vendorDest: './build/vendor'
  }	
};

function deleteBuild() {
	return del(paths.root);
}

function minifyHTML() {
	return gulp.src(paths.pages.src)
		.pipe(htmlMin({collapseWhitespace: true}))
		.pipe(gulp.dest(paths.pages.dest);
}
			  
function minifyCSS() {
	return gulp.src(paths.css.src)
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest(paths.css.dest));
}
	
function minifyIMG() {
	return gulp.src(paths.img.src)
		.pipe(imgMin()
		.pipe(gulp.dest(paths.img.dest));
}
		      
function fonts() {
	return gulp.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest));
}
	
function scripts() {
	return gulp.src(paths.scripts.src)
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
			}))
		.pipe(gulp.dest(paths.scripts.dest);
}
		      
function php() {
	return gulp.src(paths.php.src)
		.pipe(gulp.dest(paths.php.dest));
}

function phpStuff() {
    return gulp.src(paths.php.vendorSrc)
        .pipe(gulp.dest(paths.php.vendorDest))
}
		      
function watch() {
	gulp.watch(paths.pages.src, minifyHTML);
	gulp.watch(paths.css.src, minifyCSS);
	gulp.watch(paths.img.src, minifyIMG);
	gulp.watch(paths.scripts.src, scripts);
	gulp.watch(paths.fonts.src, fonts);
	gulp.watch(paths.php.src, php);
}



exports.del = deleteBuild;
exports.minhtml = minifyHTML;
exports.mincss = minifyCSS;
exports.minimg = minifyIMG;
exports.fonts = fonts;
exports.scripts = scripts;
exports.php = php;
exports.watch = watch;
exports.phpstuff = phpStuff;
	
gulp.task('default', gulp.series(
	deleteBuild,
	gulp.parallel(minifyHTML, minifyCSS, minifyIMG, fonts, scripts, php, phpStuff),
	watch
));