import imagemin from 'gulp-imagemin';
import imageminWebp from 'imagemin-webp';

export function images() {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(imagemin([
            imageminWebp({
                quality: 70
            })
        ]))
        .pipe(app.plugins.rename({ extname: '.webp' }))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.gulp.src(app.path.src.images))
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeVievBox: false }],
            interlaced: true,
            optimizationLevel: 3 // from 0 to 7
        }))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.gulp.src(app.path.src.svg))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.sync.stream());
}