angular
  .module('platanus.keepValues')
  .directive('keepInputValues', keepInputValues);

function keepInputValues($compile) {
  var directive = {
    compile: compile,
    restrict: 'A'
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

    function postCompile(scope, element, attrs){
      if(element[0].tagName === 'FORM') {
        setPristine(attrs.name);
      } else {
        angular.forEach(element.find('form'), function(form){
          setPristine(form.name);
        });
      }

      function setPristine(formName){
        if(formName && scope[formName])
          scope[formName].$setPristine();
      }
    }

    return {
      post: postCompile
    };
  }
}

keepInputValues.$inject = ['$compile'];
