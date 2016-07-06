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
