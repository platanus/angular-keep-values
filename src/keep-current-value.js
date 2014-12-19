var getViewValueFrom = {
  SELECT: function(element) {
    var options = element.find('option');
    for (var i = 0; i < options.length; i++) {
      var el = angular.element(options[i].outerHTML);
      if ( el.attr('selected') ) return el.attr('value');
    };
    if ( options[0] ) return angular.element(options[0]).attr('value');
  },
  INPUT: function(element) {
    return element.attr('value');
  },
  TEXTAREA: function(element) {
    return element.html();
  }
}

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
      controller.$render();
    }
  }
}

function getViewValueFromElement(element) {
  var viewValue;
  var tagName = element[0].tagName;

  if ( SUPPORTED_ELEMENTS.indexOf(tagName) > -1 ) return getViewValueFrom[tagName](element);
  return false;
}

