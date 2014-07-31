#Reno - Angular AMD Generator

>Yeoman Generator for Large Angular Projects

A fork of [generator-mrwhite](https://github.com/Iteam1337/generator-mrwhite)

Features

* Provides a directory structure geared towards large Angular projects.  
    * Each controller, service, filter, and directive are placed in their own file.  
    * All files related to a conceptual unit are placed together.  For example, the controller and HTML file for a partial are placed together in the same directory.
* Provides a ready-made Grunt build that produces an extremely optimized distribution.
* Integrates Bower for package management
* Includes Yeoman sub-generators for directives, services, partials, and filters
* Integrates LESS.
* Testable - Included Yeoman sub-generators also build test skeletons using karma, chai, sinon sinon-chai and grunt-karma.
Run test via `grunt test`.

Directory Layout - <i>Work in Progress</i>
-------------
Below is an explanation of the folder structure.

    /build ......................... runnable version created by grunt containing all files separated
    /src ........................... base folder for application
        /app ....................... main folder for applications source code
            /partial ............... example partial
                index.js ........... example partial controller
                index.spec.js ...... example partial controller unit tests
                partial.less ....... example partial specific LESS
                partial.tpl.html ... example partial HTML template
        app.js ..................... application main
        app.spec.js ................ application main unit tests
        
        **** To Be Continued ****
        
    /img ........................... images (not created by default but included in /dist if added)
    /js ............................ app global javascript files
        setup.js ................... angular module initialization and route setup
    /directive ..................... angular directives folder
        my-directive.js ............ example simple directive
        /my-directive2 ............. example complex directive (contains external partial)
            my-directive2.js ....... complex directive javascript
            my-directive2.html...... complex directive partial
            my-directive2.less ..... complex directive LESS
    /filter ........................ angular filters folder
        my-filter.js ............... example filter
    /model ......................... angular models - a factory implementation of service for non singletons
        MyModel.js ................. example model. Note the capital first letter in the naming
    /partial ....................... angular partials folder
        /my-partial ................ example partial
            my-partial.html ........ example partial html
            my-partial.js .......... example partial controller
            my-partial.less ........ example partial LESS
    /service ....................... angular services folder
        my-service.js .............. example service
    /bower_component................ 3rd party libraries managed by bower
    /node_modules .................. npm managed libraries used by grunt

The `directive`, `filter`, `model`, `partial`, and `service` directories won't exist until one of the relevant components is created using a sub-generator.

Getting Started
-------------

This generator is not ment for public use. It's a tool for new developers in an existing application and not ment to create an application from scratch.

First, clone the [reno-io repository](https://github.com/socialthrills/reno-ui)

    git clone https://github.com/socialthrills/reno-ui

This generator is included in package.json one you've run

	npm install

Grunt Tasks
-------------

Now that the project is created, you have 3 simple Grunt commands available:

    grunt         #Runs tests, and copies files to build/ folder
    grunt test    #Run headless unit tests using PhantomJS.
    grunt build   #Copies files to build/ folder
    grunt watch	  #Builds, run tests whenever files are changed.
                  #It also starts the http-server

Yeoman Subgenerators
-------------

There are a set of sub-generators to initialize empty Angular components.  Each of these generators will:

* Create one or more skeleton files (javascript, LESS, html, etc) for the component type
* For partials, update app.js and add the new module ```angular.amd.module('app', [/* -> HERE <- */])```
* Update base.less and add the @import as needed.


The generators
---------------
	yo reno:module a-module
	
Creates a module in `app/a-module/` containing the files `index.js`, `index.spec.js`, `a-module.less` and `a-module.tpl.html`

The less file is automatically included in `css/base.less` and the `app.a-module` is added to the list of modules in `app.js`.

`a-module.spec.js` contains a simple first test.

---------------------------------------------------------------

    
    yo reno:service a-service 
                               
Creates the folder `app/services/a-service/` contain the files `index.js` and `index.spec.js`.

The module created for the service, `app.a-service` is added to the list of modules in `app.js`

---------------------------------------------------------------

    yo mrwhite:directive aLittleDirective

The name of the directive is passed with camel casing with is used for the name of the directive, though all templates and references will be formatted as `a-little-directive`.

The generator require you to enter which module you want the directive to belong to. E.g. `src/app/a-module/index`. The generator will find the index.js file and append the directive. `a-little-directive.spec.js` `a-little-directive.tpl.html` and `a-little-directive.less` will also be created of which the less file will be included in `base.less`.



!Build Process - Not updated!
-------------

The project will include a ready-made Grunt build that will:

* Build all the LESS files into one minified CSS file.
* Uses [grunt-angular-templates](https://github.com/ericclemmons/grunt-angular-templates) to turn all your partials into Javascript.
* Uses [grunt-ngmin](https://github.com/btford/grunt-ngmin) to preprocess all Angular injectable methods and add the necessary Angular annotations to ensure minification will not break your app (and you don't have to use the array syntax to 
manually add the annotations nor $inject).  Read more about [ngmin](https://github.com/btford/ngmin).
* Concatenates and minifies all Javascript into one file.
* Replaces all appropriate script references in `index.html` with the minified CSS and JS files.
* Minifies any images in `/img`.
* Minifies the `index.html`.
* Copies any extra files necessary for a distributable build (ex.  Font-Awesome font files, etc).

The resulting build loads only a few highly compressed files.

The build process uses [grunt-dom-munger](https://github.com/cgross/grunt-dom-munger) to pull script references from the `index.html`.  This means that the build will always pull all Javascript loaded in your `index.html`.  Adding a new library, new controller, new directive, etc does not require that you update the build (also the order of the scripts in your `index.html` will be maintained when they're concatenated).  Importantly, `grunt-dom-munger` uses JQuery selectors to manage the parsing of the script tags. It is very easy to exclude certain scripts from the build.  For example, the project includes a references to the `livereload.js` from the `grunt-contrib-watch` task.  But this file should not be included in a production build.  Thus the `grunt-dom-munger` task is configured with a selector like `script[data-build!="exclude"]` and the script tag for `livereload.js` includes an attribute like `data-build="exclude"`.  You can use this flexibility in your project to include/exclude scripts in your production builds.

Release History
-------------
* 2014-07-30 - V0.0.1 No quite ready for public use
