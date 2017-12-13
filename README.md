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

* Have at least an index.ejs file in the folder of the demo at /ejs/demos/test/index.ejs this index.ejs file will contain the html of the demo.

* It is also possible to have a js folder for something like test.js at /ejs/demos/test/js/test.js if it is preferred to having the javaScript in the index.ejs file.

As such the index.ejs file of my 'first' demo looks like this:

```ejs
<p>This is my first angular demo, for my <a href="https://github.com/dustinpfister/test_angular">test_angular</a> project on github</p>
 
<div ng-app="HelloWorldApp">
    <div ng-controller="HelloWorldController">
        <h1>{{greeting}}</h1>
    </div>
</div>
 
<script src="first/js/first.js"></script>
```

And the first.js file at /ejs/demos/first/first.js looks like this:

```js
angular.module('HelloWorldApp', [])
   .controller('HelloWorldController', function($scope) {
       $scope.greeting = "Hello World";
});
```

angular.js is loaded in the demo.ejs file in the layouts folder at /ejs/layouts, at the time of this writing I am just using angular 1.6.7 with no plains of supporting more that one version.