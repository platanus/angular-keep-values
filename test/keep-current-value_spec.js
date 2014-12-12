'use strict';

describe('', function() {

  beforeEach(module('platanus.keepValues'));

  describe('keepCurrentValue directive', function() {
    var element, scope;

    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element('<input type="text" keep-current-value value="Ignacio Ochoa" ng-model="data.name">');

      scope = $rootScope.$new();
      scope.data = { name: '' };
      $compile(element)(scope);
      scope.$digest();

      element = element.find('input');
    }));

    it('should set the ngModel\'s value to the contents of the value attribute', function(){
      expect(scope.data.name).toEqual('Ignacio Ochoa');
    });
    
  });

});

