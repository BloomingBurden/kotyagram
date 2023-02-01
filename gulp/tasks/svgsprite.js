import gulpSvgSprite from 'gulp-svg-sprite';

export function svgSprite() {
    return app.gulp.src(app.path.src.svgicons, {})
        .pipe(gulpSvgSprite({
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,
                }
            }
        }))
        .pipe(app.gulp.dest(app.path.build.images))
}