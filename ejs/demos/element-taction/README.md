# Element tAction

In this demo I wanted to make a timed action element. It uses a template that has an input button, and it also uses a canvas element to display the progress of a timed action. This is something that I aim to uses in one of my angularjs games, and maybe not something that involves scripting http, but we will see where it goes.

## !!! Does not work with controllers (yet)

As of this writing I do not know how to work with a situation in which I want to be able to set scope values from a controller, element attributes, and internal defaults. So far I can get one or the other to work but not all of them.

## Basic example

just use it like an element like this:

```html
<x-taction
 
    time = "1000"
 
>
</x-taction>
```

This will produce a timed action element that can be used with a controller, or old fashion event attachment style. This makes use of a canvas element to display a progress bar, and an input element that will call an internal method. onClick, onDone, and onProgress methods can be used with it.
