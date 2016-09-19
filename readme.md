# ngmaterial-mdcompiler [![Build Status](https://travis-ci.org/ajoslin/ngmaterial-mdcompiler.svg?branch=master)](https://travis-ci.org/ajoslin/ngmaterial-mdcompiler)

> The $mdCompiler service ripped from angular material

[Link to code](https://github.com/angular/material/blob/08319e7cd923b1c566f72e35a44dc2c8a4f10c74/src/core/services/compiler/compiler.js)

## Install

```
$ npm install --save ngmaterial-mdcompiler
```

## Usage

```js
const angular = require('angular')

angular.module('myApp', [
  require('ngmaterial-mdcompiler')
])
  .controller('MyCtrl', function ($mdCompiler) {
    // $mdCompiler.compile({ ... })
  })
```

## API

The module is exposed as a string representing the module's name for easy inclusion (see above).

It creates a service `$mdCompiler`.

### `$mdCompiler.compile(options) -> Promise<compileData>`

A helper to compile an HTML template/templateUrl with a given controller, locals, and scope.

#### `options`

An options object, with the following properties:

- `controller` - `{(string=|function()=}` Controller fn that should be associated with
  newly created scope or the name of a registered controller if passed as a string.
- `controllerAs` - `{string=}` A controller alias name. If present the controller will be
  published to scope under the `controllerAs` name.
- `template` - `{string=}` An html template as a string.
- `templateUrl` - `{string=}` A path to an html template.
- `transformTemplate` - `{function(template)=}` A function which transforms the template after
  it is loaded. It will be given the template string as a parameter, and should
  return a a new string representing the transformed template.
- `resolve` - `{Object.<string, function>=}` - An optional map of dependencies which should
  be injected into the controller. If any of these dependencies are promises, the compiler
  will wait for them all to be resolved, or if one is rejected before the controller is
  instantiated `compile()` will fail..
  * `key` - `{string}`: a name of a dependency to be injected into the controller.
  * `factory` - `{string|function}`: If `string` then it is an alias for a service.
    Otherwise if function, then it is injected and the return value is treated as the
    dependency. If the result is a promise, it is resolved before its value is
    injected into the controller.
 - `locals` - `{object}`: The locals which will be passed into the controller once `link` is
 called. If `bindToController` is true, they will be copied to the ctrl instead
 - `bindToController` - `bool`: bind the locals to the controller, instead of passing them in.

#### returns `Promise<compileData>`

Returns a promise, which will be resolved with a `compileData` object.
`compileData` has the following properties:

- `element` - `{element}`: an uncompiled element matching the provided template.
- `link` - `{function(scope)}`: A link function, which, when called, will compile
  the element and instantiate the provided controller (if given).

## License

[MIT © Google](https://github.com/angular/material/blob/master/LICENSE)
