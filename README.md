# Test_angular

This is a collection of demos for the popular javaScript web application framework [angular.js](https://angularjs.org/). In this project I am also using [hapi](https://hapijs.com/) as my back end framework. I am also using [ejs](https://www.npmjs.com/package/ejs), as a template engine rather than having a simple static collection of files.

## Install

Clone it in with git, and use npm to install dependencies. Once that is done run the server.js file by calling directly with node, or calling start with npm.

```
$ git clone https://github.com/dustinpfister/test_angular
$ cd test_angular
$ npm install
$ npm start
```

## How to make a demo

I will leave this here as a note to myself, and anyone else that may be interested for that matter on how to do this. 

The process is basically like this.

* Create a folder in the /ejs/demos folder and give it a name such as 'test', so you have a path such as /ejs/demos/test

* Have an index.ejs file in the folder of the demo at /ejs/demos/test/index.ejs this index.ejs file will contain the html of the demo.

* Have an jsfiles.ejs file at /ejs/demos/test/jsfiles.ejs this can contain links to jsfiles in the js folder of the project, and or script tags.

* It is also possible to have a js folder for something like test.js at /ejs/demos/test/js/test.js if it is preferred to having the javaScript in the index.ejs file.

As such the index.ejs file of my 'first' demo looks like this:

```ejs
<p>This is my first angular demo, for my <a href="https://github.com/dustinpfister/test_angular">test_angular</a> project on github</p>
 
<div ng-app="HelloWorldApp">
    <div ng-controller="HelloWorldController">
        <h1>{{greeting}}</h1>
    </div>
</div>
```

and my jsfiles.ejs looks like this:

```ejs
<%- js('first.js') %>
```

I can use my js method of the ejs api I have made to grab any */js file that is in the current demo folder.

And the first.js file at /ejs/demos/first/first.js looks like this:

```js
angular.module('HelloWorldApp', [])
   .controller('HelloWorldController', function($scope) {
       $scope.greeting = "Hello World";
});
```

angular.js is loaded in the demo.ejs file in the layouts folder at /ejs/layouts, at the time of this writing I am just using angular 1.6.7 with no plains of supporting more that one version.

## EJS API

I have made my own api of methods and properties that can be used when making my ejs templates.


## EJS API Properties

here are the properties that can be used in ejs templates

* title - the title for the current page
* layout - the current layout (home or demo page)
* demoname - the name of the current demo in /ejs/demos ( '' if home layout)
* files -  a list of all demonames
* readme - the parsed markdown of the current readme file

## EJS API Methods

There are some methods that can be called from ejs templates.

### demoList 

This method is just used on the home layout at /ejs/layouts/home.ejs to render an unordered list of links to each demo that appears in /ejs/demos. This method just saves me a little time compared to manually maintaining the list.

```ejs
<%- demosList() %>
```

### js

The js method will inject a script tag for a given js file that is in the js folder of the current demo at /ejs/[demoname]/js/[filename].

```ejs
<%- js('main.js') %>
```

will give me what is at /ejs/demos/foo/js/main.js for a current demo named 'foo'

## Future Ideas For Features

If my posts on angular do well, I will continue to support this project some of the ideas I have listed here I might not ever get to if people show little interest in my sites analytics.

### Support for more than one version of angular

As of this writing test_angular just used angular 1.6.7. As such I might add a special path for many versions of angular, as well as possibly other front end dependences. The current lib path is a crud way of just grabbing at something that may be in the root path of a node module in node_modules.

### demo.json / demo.yaml files

I might want to have a demo.json file for each demo. This would contain information such as a description that will be displayed in the home page. It can also be used to declare the version of angular to use, as well as any other relevant information about a demo. I might also make them yaml files rather than the usual json.

### Demo types

Each demo can have a type that defaults to 'misc'. This might be on eof mnay values for the demo.json file if it is made.

### Demo Sorting

The index at /demos might just display all demos, but I could at least sort them in some way other than what just happens without caring about order. I might want things broken down in some way if the list grows pretty long.

### Games section

I was getting into making this project simply for the sake of getting into angular because it is just something to write about on my blog. It would be nice to also make this project just my pet project of sorts that I am doing purely for the sake of fun as well. If I get more into making simple html only style games with angular it might be a good idea to have a section for them instead of placing them along with the demos.

### 404 page

A custom 404 page for the project.

### /css path

I currently just have hard coded styles in the main index.ejs


## Versions

0.0.91 - First release

* Using angular 1.6.7
* Using hapi 16.x as the server framework in place of the usual express.js
* Using the ejs template engine for back end rendering.
* made an api (ejs-api) for use in ejs templates.
* have a /backends folder that contains scripts to be used in the /back path (backend scripts for demos)
* ten angular 1.6.7 demos
* two games in the works


0.1.x

* /css path for plain old static css files in /ejs/css
* add js-yaml as a dependency for yaml file support
* add support for demo.yaml files for demo folders
* create a /lib folder for back end scripts that are not used by front ends in the /backends folder
* more demos
* continue working on games, maybe make more.