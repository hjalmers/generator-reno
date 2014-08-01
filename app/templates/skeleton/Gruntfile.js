module.exports = function (grunt) {
    'use strict';
    var amd = require('angular-amd');

    require('load-grunt-tasks')(grunt);

    var buildConfig = require('./build.conf.js');
    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            banner: '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                ' */\n'
        },
        /**
         * The directories to delete when `grunt clean` is executed.
         */
        clean: [
            '<%= build_dir %>',
            '<%= compile_dir %>',
            '<%= coverage_dir %>'
        ],

        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            app: {
                options: {
                    base: 'src/app',
                    process: function (html, filePath) {
                        grunt.log.writeln('File "' + filePath + '" created.');
                        return grunt.template.process(html, {
                            data: {
                                staticPrefix: ''
                            }
                        });
                    }
                },
                src: ['<%= app_files.tpl %>'],
                dest: '<%= build_dir %>/templates-app.js'
            },
            dist: {
                options: {
                    base: 'src/app',
                    process: function (html, filePath) {
                        grunt.log.writeln('File "' + filePath + '" created.');
                        return grunt.template.process(html, {
                            data: {
                                staticPrefix: buildConfig.cdnPrefix
                            }
                        });
                    }
                },
                src: ['<%= app_files.tpl %>'],
                dest: '<%= compile_dir %>/templates-app.js'
            }
        },

        jsbeautifier: {
            modify: {
                src: [
                    '<%= app_files.js %>',
                    '<%= test_files.unit %>',
                    'Gruntfile.js'
                ],
                options: {
                    config: '.jsbeautifyrc'
                }
            },
            verify: {
                src: [
                    '<%= app_files.js %>',
                    '<%= test_files.unit %>',
                    'Gruntfile.js'
                ],
                options: {
                    mode: 'VERIFY_ONLY',
                    config: '.jsbeautifyrc'
                }
            }
        },

        jshint: {
            src: [
                '<%= app_files.js %>'
            ],
            test: [
                '<%= test_files.unit %>'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        recess: {
            lint: {
                src: ['<%= app_files.srcLess %>'],
                dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css',
                options: {
                    noOverqualifying: false
                }
            },
            build: {
                src: ['<%= app_files.srcLess %>'],
                dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css',
                options: {
                    compile: true,
                    compress: false,
                    noUnderscores: true,
                    noIDs: true,
                    zeroUnits: true
                }
            },
            compile: {
                src: '<%= recess.build.dest %>',
                dest: '<%= recess.build.dest %>',
                options: {
                    compress: true,
                    noUnderscores: false,
                    noIDs: true,
                    zeroUnits: false
                }
            }
        },

        concat: {
            build_css: {
                src: [
                    '<%= vendor_files.css %>',
                    '<%= recess.build.dest %>'
                ],
                dest: '<%= recess.build.dest %>'
            },
            compile_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },

        copy: {
            build_app_assets: {
                files: [{
                    src: ['**', '!*.less'],
                    dest: '<%= build_dir %>/assets/',
                    cwd: 'src/assets',
                    expand: true
                }]
            },
            build_app_contents: {
                files: [{
                    src: ['**', '!*.less'],
                    dest: '<%= build_dir %>/content/',
                    cwd: 'src/content',
                    expand: true
                }]
            },
            build_vendor_assets: {
                files: [{
                    src: ['<%= vendor_files.assets %>'],
                    dest: '<%= build_dir %>/assets/',
                    cwd: '.',
                    expand: true,
                    flatten: true
                }]
            },
            publish_vendor_assets: {
                files: [{
                    src: ['<%= vendor_files.publish %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true,
                    flatten: false
                }]
            },
            build_appindex: {
                files: [{
                    src: ['<%= app_files.index %>'],
                    dest: '<%= build_dir %>/index.html',
                    cwd: '.',
                    flatten: true
                }]
            },
            build_appjs: {
                files: [{
                    src: ['<%= app_files.js %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true
                }]
            },
            build_vendorjs: {
                files: [{
                    src: ['<%= vendor_files.js %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true
                }]
            },
            build_vendorcss: {
                files: [{
                    src: ['<%= vendor_files.css %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true
                }]
            },
            compile_assets: {
                files: [{
                    src: ['**'],
                    dest: '<%= compile_dir %>/assets',
                    cwd: '<%= build_dir %>/assets',
                    expand: true
                }]
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                singleRun: true
            },
            continuous: {
                logLevel: 'error',
                client: {
                    captureConsole: false
                },
                coverageReporter: {
                    reporters: [{
                        type: 'html',
                        dir: 'coverage/'
                    }, {
                        type: 'cobertura'
                    }],
                },
                htmlReporter: {
                    outputDir: 'karma_html',
                    templatePath: 'node_modules/karma-html-reporter/jasmine_template.html'
                },
                plugins: ['karma-jasmine', 'karma-sinon-chai', 'karma-html-reporter', 'karma-coverage', 'karma-phantomjs-launcher', 'karma-junit-reporter'],
                reporters: ['html', 'dots', 'coverage', 'junit'],
                singleRun: true
            }
        },

        angularamd: {
            compile: {
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true
                },
                src: [
                    'src/'
                ],

                dest: '<%= compile_dir %>/<%= pkg.name %>-app.js'
            }
        },

        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },

        index: {
            build: {
                dir: '<%= build_dir %>',
                static: '',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= vendor_files.css %>',
                    '<%= recess.build.dest %>'
                ]
            },
            compile: {
                dir: '<%= compile_dir %>',
                static: buildConfig.cdnPrefix,
                src: [
                    '<%= concat.compile_js.dest %>',
                    '<%= html2js.dist.dest %>',
                    '<%= vendor_files.css %>',
                    '<%= recess.compile.dest %>'
                ]
            }
        },
        'http-server': {

            'dev': {

                // the server root directory
                root: '<%= build_dir %>',

                port: 8080,
                // port: function() { return 8282; }

                host: '127.0.0.1',

                cache: 60,
                showDir: true,
                autoIndex: true,
                defaultExt: 'html',

                // run in parallel with other tasks
                runInBackground: true

            }
        },
        delta: {
            /**
             * By default, we want the Live Reload to work for all tasks; this is
             * overridden in some tasks (like this file) where browser resources are
             * unaffected. It runs by default on port 35729, which your browser
             * plugin should auto-detect.
             */
            options: {
                livereload: true
            },

            /**
             * When the Gruntfile changes, we just want to lint it. In fact, when
             * your Gruntfile changes, it will automatically be reloaded!
             */
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile'],
                options: {
                    livereload: false
                }
            },

            /**
             * When our JavaScript source files change, we want to run lint them and
             * run our unit tests.
             */
            jssrc: {
                files: [
                    '<%= app_files.js %>'
                ],
                tasks: ['jshint:src', 'karma:unit', 'copy:build_appjs']
            },

            /**
             * When assets are changed, copy them. Note that this will *not* copy new
             * files, so this is probably not very useful.
             */
            assets: {
                files: [
                    'src/assets/**/*'
                ],
                tasks: ['copy:build_app_assets']
            },

            /**
             * When index.html changes, we need to compile it.
             */
            html: {
                files: ['<%= app_files.html %>'],
                tasks: ['index:build']
            },

            /**
             * When our templates change, we only rewrite the template cache.
             */
            tpls: {
                files: [
                    '<%= app_files.tpl %>'
                ],
                tasks: ['html2js']
            },

            /**
             * When the CSS files change, we need to compile and minify them.
             */
            less: {
                files: ['src/**/*.less'],
                tasks: ['recess:lint', 'recess:build']
            },

            /**
             * When a JavaScript unit test file changes, we only want to lint it and
             * run the unit tests. We don't want to do any live reloading.
             */
            jsunit: {
                files: [
                    '<%= app_files.jsunit %>'
                ],
                tasks: ['jshint:test', 'karma:unit'],
                options: {
                    livereload: false
                }
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, buildConfig));

    grunt.registerTask('cleanUpJs', [
        'jsbeautifier:modify'
    ]);

    grunt.registerTask('verifyJs', [
        'jsbeautifier:verify',
        'jshint'
    ]);

    grunt.registerTask('build', [
        'clean',
        'html2js:app',
        'cleanUpJs',
        'verifyJs',
        'recess:lint',
        'recess:build',
        'concat:build_css',
        'copy:build_app_assets',
        'copy:build_app_contents',
        'copy:build_vendor_assets',
        'copy:publish_vendor_assets',
        'copy:build_appindex',
        'copy:build_appjs',
        'copy:build_vendorjs',
        'copy:build_vendorcss',
        'index:build'
    ]);

    grunt.registerTask('test', ['karma:unit']);

    grunt.registerTask('compile', [
        'html2js:dist',
        'recess:compile',
        'copy:compile_assets',
        'angularamd:compile',
        'concat:compile_js',
        'uglify',
        'index:compile'
    ]);
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask('test-continuous', ['karma:continuous']);
    grunt.registerTask('build-continuous', ['build', 'test-continuous', 'compile']);

    grunt.registerTask('pre-commit', ['verifyJs', 'recess:lint', 'test']);

    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build', 'test', 'http-server:dev', 'delta']);

    grunt.registerTask('default', ['build', 'test', 'compile']);

    grunt.registerMultiTask('index', 'Process index.html template', function (target) {
        function filterForJSTemplate(files) {
            return files.filter(function (file) {
                return file.match(/templates\-\w+.*\.js$/);
            });
        }

        function filterForCSS(files) {
            return files.filter(function (file) {
                return file.match(/\.css$/);
            });
        }

        var staticPrefix = this.data.static;
        var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');
        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });

        var templateFiles = filterForJSTemplate(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: buildConfig.vendor_files.js.concat(templateFiles),
                        styles: cssFiles,
                        staticPrefix: staticPrefix,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });

    grunt.registerMultiTask('angularamd', 'Compile angular-amd', function (target) {
        var options = this.options({
            sourceFolder: '',
            banner: '',
            footer: '',
            compress: {
                warnings: false
            },
            mangle: {},
            beautify: false,
            report: false
        });

        // Iterate over all src-dest file pairs.
        this.files.forEach(function (file) {
            var output = '',
                src = file.src.filter(function (filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                });

            src.forEach(function (filePath) {
                options.sourceFolder = filePath;
                output += amd.start(options);
            });

            grunt.file.write(file.dest, output);

            // Print a success message.
            grunt.log.writeln('File "' + file.dest + '" created.');
        });
    });
};
