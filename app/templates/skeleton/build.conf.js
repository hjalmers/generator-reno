module.exports = {
    build_dir: 'build',
    compile_dir: 'dist',
    coverage_dir: 'coverage',
    cdnPrefix: '//localhost/?cdnPrefix-in-build.conf.js/',
    app_files: {
        index: [ 'src/index.html'],
        js: [ 'src/**/*.js', '!src/**/*.spec.js'],
        jsunit: [ 'src/**/*.spec.js'],

        tpl: [ 'src/app/**/*.tpl.html' ],

        html: [ 'src/index.html' ],
        srcLess: 'src/less/base.less',

        config: [
            'src/config.json',
        ]
    },
    test_files: {
        unit: [ 'src/**/*.spec.js' ],
        js: [
            'vendor/angular-mocks/angular-mocks.js'
        ]
    },
    vendor_files: {
        js: [
            'vendor/swfobject/swfobject/swfobject.js',
            'vendor/showdown/compressed/showdown.js',
            'vendor/angular/angular.js',
            'vendor/angular-sanitize/angular-sanitize.js',
            'vendor/angular-route/angular-route.js',
            'vendor/angular-cookies/angular-cookies.js',
            'vendor/angularLocalStorage/src/angularLocalStorage.js',
            'vendor/ng-amd/dist/angular-amd.js'
        ],
        css: [
        ],
        assets: [
        ],
        publish: [
        ]
    },
};
