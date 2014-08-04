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

Getting Started
-------------

Create a directory for your app

Then install the generator:

	npm install git://github.com/socialthrills/generator-reno.git
	
You're now ready to generate you new app:

	yo reno
	
Grunt Tasks
-------------

Now that the project is created, you have 3 simple Grunt commands available:

    grunt         #Runs tests, and copies files to build/ folder
    grunt test    #Run headless unit tests using PhantomJS.
    grunt build   #Copies files to build/ folder
    grunt watch	  #Builds, run tests whenever files are changed.
                  #It also starts the http-server

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

The name of the directive is entered with camel casing which is used for the name of the directive, though all templates and references will be formatted as `a-little-directive`.

The generator require you to enter which module you want the directive to belong to. E.g. `src/app/a-module/index`. The generator will find the index.js file and append the directive. `a-little-directive.spec.js` `a-little-directive.tpl.html` and `a-little-directive.less` will also be created, and the less file will be included in `base.less`.



Directory Layout - <i>Work in Progress</i>
-------------
Below is an explanation of the folder structure.

    /build ......................... runnable version created by grunt
    /src ........................... base folder for application
        /app ....................... main folder for applications source code
            /module ................ example partial
                index.js ........... example module controller
                index.spec.js ...... example module controller unit tests
                module.less ........ example module specific LESS
                module.tpl.html .... example module HTML template
        app.js ..................... application main
        app.spec.js ................ application main unit tests
        
Release History
-------------
* 2014-07-30 - V0.0.1 No quite ready for public use
