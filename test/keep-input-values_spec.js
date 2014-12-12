'use strict';

describe('', function() {

  beforeEach(module('platanus.keepValues'));

  describe('keepInputValues directive', function() {
    var element, inputs, scope;

    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element('\
        <div keep-input-values>\
          <input type="text" value="Ignacio" ng-model="data.firstName">\
          <input type="text" value="Ochoa" ng-model="data.lastName">\
          <input type="text" value="Santiago" ng-model="data.city">\
        </div>\
      ');

      scope = $rootScope.$new();
      scope.data = { nombre: '' };
      $compile(element)(scope);
      scope.$digest();

      inputs = element.find('div').find('input');
    }));

    it('should add the keepCurrentValue directive to all children input elements', function(){
      angular.forEach(inputs, function(input) {
        expect(input.attr('keep-current-value')).toBeDefined();
      });
    });
    
  });

});

