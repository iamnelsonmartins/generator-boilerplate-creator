// Initialize modules
const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const browsersync = require('browser-sync').create()
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')

// Sass Task
function scssTask() {
  return src('app/scss/style.scss', { sourcemaps: false })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist/css', { sourcemaps: '.' }))
}

function tsTask() {
  return tsProject.src().pipe(tsProject()).js.pipe(dest('dist/code'))
}

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        animationDelay: '8s',
        display: 'block',
        fontSize: '0.8rem',
        zIndex: '9999',
        bottom: '0',
        color: '#333',
        backgroundColor: 'none',
      },
    },
  })
  cb()
}
function browserSyncReload(cb) {
  browsersync.reload()
  cb()
}

// Watch Task
function watchTask() {
  watch('dist/*.html', browserSyncReload)
  watch(
    ['app/scss/**/*.scss', 'app/ts/*.ts'],
    series(scssTask, tsTask, browserSyncReload)
  )
}

// Default Gulp Task
exports.default = series(scssTask, tsTask, browserSyncServe, watchTask)
