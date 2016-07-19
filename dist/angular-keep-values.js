/**
 * Keep your input values in your ngModels
 * @version v0.1.12 - 2016-07-19
 * @link https://github.com/platanus/angular-keep-values
 * @author Emilio Blanco <emilioeduardob@gmail.com>, Jaime Bunzli <jpbunzli@gmail.com>, René Morales <rene.morales.sanchez@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
// via http://stackoverflow.com/a/6491621

function getObjectByString(obj, str) {
  if (!obj) return;
  str = str.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  str = str.replace(/^\./, '');           // strip a leading dot
  var arr = str.split('.');
  for (var i = 0, n = arr.length; i < n; ++i) {
      var key = arr[i];
      if (key in obj) {
          obj = obj[key];
      } else {
          return;
      }
  }
  return obj;
}
var SUPPORTED_ELEMENTS = ['INPUT', 'SELECT', 'TEXTAREA'];

angular
  .module('platanus.keepValues', []);

var getViewValueFrom = {
  SELECT: function(element) {
    var options = element.find('option');
    var values = [];
    for (var i = 0; i < options.length; i++) {
      var el = angular.element(options[i].outerHTML);
      if (el.prop('selected')) {
        values.push(el.attr('value'));
      }
    }
    if (element.prop('multiple')) {
      return values;
    } else {
      if (values[0])
        return values[0];
      else if (options[0])
        return angular.element(options[0]).attr('value');
    }
  },
  INPUT: function(element) {
    var type = element.attr('type');
    if(type === 'radio') {
        if(element.prop('checked')) {
          return element.attr('value');
        }
    }
    else if(type === 'checkbox') {
        if(element.prop('checked')) {
          return element.attr('ng-true-value') ||
                  element.attr('data-ng-true-value') ||
                  element.attr('value') ||
                  true;
        } else {
          return element.attr('ng-false-value') ||
                  element.attr('data-ng-false-value') ||
                  false;
        }
    }
    else {
        return element.attr('value');
    }
  },
  TEXTAREA: function(element) {
    return element.html();
  }
};

angular
  .module('platanus.keepValues')
  .directive('keepCurrentValue', keepCurrentValue);

function keepCurrentValue() {
  var directive = {
    link: link,
    restrict: 'A',
    require: 'ngModel'
  };

  return directive;

  function link(scope, element, attrs, controller) {
    var viewValue = getViewValueFromElement(element);
    if ( viewValue !== undefined ) {
      controller.$setViewValue(viewValue);
      controller.$setPristine();
      controller.$render();
    }
  }
}

function getViewValueFromElement(element) {
  var tagName = element[0].tagName;

  if ( SUPPORTED_ELEMENTS.indexOf(tagName) > -1 ) return getViewValueFrom[tagName](element);
  return false;
}

angular
  .module('platanus.keepValues')
  .directive('keepInputValues', keepInputValues);

function keepInputValues($compile) {
  var directive = {
    compile: compile,
    restrict: 'A',
    require: '^?ngController',
  };

  return directive;

  function compile(element, attrs) {

    SUPPORTED_ELEMENTS.forEach(function(tagName){
      var checkElements = element.find(tagName);
      angular.forEach(checkElements, function(checkElement) {
        checkElement = angular.element(checkElement);
        if (angular.isDefined(checkElement.attr('ng-model')) || angular.isDefined(checkElement.attr('data-ng-model')))
          checkElement.attr('keep-current-value', '');
      });
    });

    function postCompile(scope, element, attrs, ctrl){
      if(element[0].tagName === 'FORM') {
        setPristine(attrs.name);
      } else {
        angular.forEach(element.find('form'), function(form){
          setPristine(form.name);
        });
      }

      function setPristine(formName){
        if(formName) {
          var form = formName.substring(formName.indexOf('.') + 1);
          var formController = scope[formName] || getObjectByString(ctrl, form);
          if (formController.$setPristine) {
            formController.$setPristine();
          }
        }
      }
    }

    return {
      post: postCompile
    };
  }
}

keepInputValues.$inject = ['$compile'];
})(angular);