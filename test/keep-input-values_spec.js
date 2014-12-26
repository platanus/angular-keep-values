'use strict';

var TEST_SUPPORTED_ELEMENTS = ['INPUT', 'SELECT', 'TEXTAREA'];

describe('', function() {

  beforeEach(module('platanus.keepValues'));

  describe('keepInputValues directive', function() {
    var element, scope;

    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element('\
        <div keep-input-values>\
          <input type="text" value="Ignacio" ng-model="data.firstName">\
          <input type="text" value="Ochoa">\
          <select ng-model="data.city">\
            <option value="1">Santiago</option>\
            <option value="2" selected>La Serena</option>\
          </select>\
          <select>\
            <option value="3">Pedro</option>\
            <option value="4">Ramiro</option>\
          </select>\
          <textarea ng-model="data.bio">Lorem ipsum</textarea>\
          <textarea>Dolor sit amet</textarea>\
        </div>\
      ');

      scope = $rootScope.$new();
      scope.data = { nombre: '' };
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should add the keepCurrentValue directive to all supported elements  with an ngModel', function(){
      TEST_SUPPORTED_ELEMENTS.forEach(function(tagName){
        var keepCount = 0;
        var checkElements = element.find(tagName);
        angular.forEach(checkElements, function(checkElement){
          if ( angular.isDefined(angular.element(checkElement).attr('keep-current-value')) ) keepCount++;
        })
        expect(keepCount).toEqual(1);
      });
    });
    
  });

});

