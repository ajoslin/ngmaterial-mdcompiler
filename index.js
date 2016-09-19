'use strict'

/*
 * $mdCompiler service, pulled from [Angular Material](https://github.com/angular/material) and slightly modified.
 */

var angular = require('angular')

module.exports = angular.module('$mdCompiler', [])
  .service('$mdCompiler', mdCompilerService)
  .name

function mdCompilerService ($q, $templateRequest, $injector, $compile, $controller) {
  this.compile = function (options) {
    var templateUrl = options.templateUrl
    var template = options.template || ''
    var controller = options.controller
    var controllerAs = options.controllerAs
    var resolve = angular.extend({}, options.resolve || {})
    var locals = angular.extend({}, options.locals || {})
    var transformTemplate = options.transformTemplate || angular.identity
    var bindToController = options.bindToController

    // Take resolve values and invoke them.
    // Resolves can either be a string (value: 'MyRegisteredAngularConst'),
    // or an invokable 'factory' of sorts: (value: function ValueGetter($dependency) {})
    angular.forEach(resolve, function (value, key) {
      if (angular.isString(value)) {
        resolve[key] = $injector.get(value)
      } else {
        resolve[key] = $injector.invoke(value)
      }
    })
    // Add the locals, which are just straight values to inject
    // eg locals: { three: 3 }, will inject three into the controller
    angular.extend(resolve, locals)

    if (templateUrl) {
      resolve.$template = $templateRequest(templateUrl)
    } else {
      resolve.$template = $q.when(template)
    }

    // Wait for all the resolves to finish if they are promises
    return $q.all(resolve).then(function (locals) {
      var compiledData
      var template = transformTemplate(locals.$template, options)
      var element = options.element || angular.element('<div>').html(template.trim()).contents()
      var linkFn = $compile(element)

      // Return a linking function that can be used later when the element is ready
      compiledData = {
        locals: locals,
        element: element,
        link: link
      }

      return compiledData

      function link (scope) {
        locals.$scope = scope

        // Instantiate controller if it exists, because we have scope
        if (controller) {
          var ctrlLocals = angular.extend(locals, {
            $element: element
          })

          var invokeCtrl = $controller(controller, ctrlLocals, true, controllerAs)

          if (bindToController) {
            angular.extend(invokeCtrl.instance, locals)
          }

          var ctrl = invokeCtrl()
          // See angular-route source for this logic
          element.data('$ngControllerController', ctrl)
          element.children().data('$ngControllerController', ctrl)

          // Publish reference to this controller
          compiledData.controller = ctrl
        }

        return linkFn(scope)
      }
    })
  }
}
