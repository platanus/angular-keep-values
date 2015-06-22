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
