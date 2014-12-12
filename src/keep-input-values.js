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
}