/* global require:true */

const jetpack = require('fs-jetpack')
const gulp = require('gulp')
const sass = require('gulp-sass')
const watch = require('gulp-watch')
const batch = require('gulp-batch')
const rename = require('gulp-rename')
// const connect = require('gulp-connect');
const webserver = require('gulp-webserver')
const process = require('process')


const bundle = require('./bundle')

// const projectDir = jetpack
const srcDir = jetpack.cwd('./src')
const destDir = jetpack.cwd('')

const beepSound = () => {
	process.stdout.write('\u0007')
}


gulp.task('bundle', () => {
	return bundle(srcDir.path('js/index.js'), destDir.path('index.js'))
})


gulp.task('html', () => {
	return gulp.src(srcDir.path('index.html'))
	.pipe(gulp.dest(destDir.path('')))
})


// Compile Our Sass
gulp.task('sass', () => {
	return gulp.src('./src/scss/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(rename('index.css'))
		.pipe(gulp.dest(destDir.path('')))
})


gulp.task('set-dev-node-env', function() {
	return process.env.NODE_ENV = 'development'
})

gulp.task('set-prod-node-env', function() {
	require('longjohn')
	return process.env.NODE_ENV = 'production'
})


gulp.task('webserver', function() {
	gulp.src('./')
		.pipe(webserver({
			livereload: true,
			directoryListing: {
				enable: false,
			},
			fallback: 'index.html',
			open: 'index.html'
		}))
})

gulp.task('generate-service-worker', function(callback) {
	const swPrecache = require('sw-precache')
	const rootDir = destDir.path('')

	swPrecache.write(`${rootDir}/service-worker.js`, {
		staticFileGlobs: [rootDir + '/doc/*.md']
		,stripPrefix: rootDir.replace(/\\/g, '/') + '/'
		,runtimeCaching:[
			{
				urlPattern: /(index|bundle)\.(min\.)?(html|css|js)/i
				,handler: 'networkFirst'
				,options: {
					debug: true
				}
			}, {
				urlPattern: /\.md$/i
				,handler: 'fastest'
				,options: {
					debug: true
				}
			}, {
				urlPattern: /font-awesome/i
				,handler: 'fastest'
			}, {
				urlPattern: /fonts\.googleapis\.com/i
				,handler: 'cacheFirst'
			}, {
				urlPattern: /fonts\.gstatic\.com/i
				,handler: 'cacheFirst'
			}, {
				urlPattern: /jubeiam\.github\.io(\/)?$/i
				,handler: 'networkFirst'
				,options: {
					debug: true
				}
			}, {
				urlPattern: '/'
				,handler: 'networkFirst'
				,options: {
					debug: true
				}
			}
		]
	}, callback)
})


gulp.task('build', ['set-prod-node-env' ,'html', 'sass', 'bundle', 'generate-service-worker'])

gulp.task('watch', ['set-dev-node-env', 'webserver'], () => {
	const beepOnError = (done) => {
		return (err) => {
			if (err) {
				beepSound()
			}

			done(err)
		}
	}



	watch('src/**/*.(js|vue)', batch((events, done) => {
		return gulp.start('bundle', beepOnError(done))
	}))

	watch('./src/scss/**/*.scss', batch((events, done) => {
		return gulp.start('sass', beepOnError(done))
	}))

	watch('src/index.html', batch((events, done) => {
		return gulp.start('html', beepOnError(done))
	}))


	gulp.start('html')
	gulp.start('sass')
	gulp.start('bundle')


})

