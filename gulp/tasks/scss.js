import dartSass from 'sass';
import gulpSass from 'gulp-sass';

import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import tildeImporter from 'node-sass-tilde-importer';

const sass = gulpSass(dartSass);

export function scss() {
    return app.gulp.src(app.path.src.scss, { sourcemaps: true })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(sass({
            outputStyle: 'expanded',
            importer: tildeImporter
        }))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(groupCssMediaQueries())
        .pipe(webpcss({
            webpClass: '.webp',
            noWebpClass: '.no-webp',
        }))
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 5 versions"],
            cascade: true,
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(cleanCss())
        .pipe(app.plugins.rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.sync.stream());
}