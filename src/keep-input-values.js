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
