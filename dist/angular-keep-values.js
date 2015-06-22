/**
 * Keep your input values in your ngModels
 * @version v0.1.6 - 2015-06-22
 * @link https://github.com/platanus/angular-keep-values
 * @author Emilio Blanco <emilioeduardob@gmail.com>, Jaime Bunzli <jpbunzli@gmail.com>, René Morales <rene.morales.sanchez@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
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
    return element.attr('value');
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
    if ( viewValue ) {
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
    link: link,
    restrict: 'A'
  };

  return directive;

  function link(scope, element, attrs) {
    SUPPORTED_ELEMENTS.forEach(function(tagName){
      var checkElements = element.find(tagName);
      angular.forEach(checkElements, function(checkElement) {
        var checkElement = angular.element(checkElement);
        if ( angular.isDefined(checkElement.attr('ng-model')))
          checkElement
            .attr('keep-current-value', '')
            .replaceWith($compile(checkElement)(scope));
      })
    });
  }
}

keepInputValues.$inject = ['$compile'];
})(angular);