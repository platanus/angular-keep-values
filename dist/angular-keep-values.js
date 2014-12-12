/**
 * Keep your input values in your ngModels
 * @version v0.1.1 - 2014-12-12
 * @link https://github.com/platanus/angular-keep-values
 * @author Emilio Blanco <emilioeduardob@gmail.com>, Jaime Bunzli <jpbunzli@gmail.com>, René Morales <rene.morales.sanchez@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(angular, undefined) {
'use strict';
angular
  .module('platanus.keepValues', []);
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
    controller.$setViewValue(attrs.value);
  }
}
angular
  .module('platanus.keepValues')
  .directive('keepInputValues', keepInputValues);

function keepInputValues() {
  var directive = {
    link: link,
    restrict: 'A'
  };

  return directive;

  function link(scope, element, attrs) {
    var inputs = element.find('input');
    angular.forEach(inputs, function(input){
      var x = angular.element(input);
      x.attr('keep-current-value', '');
    });
  }
}})(angular);