'use strict';

describe('', function() {

  beforeEach(module('platanus.keepValues'));

  describe('keepCurrentValue directive on input tag', function() {
    var element, scope;

    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element('<input type="text" keep-current-value value="Ignacio Ochoa" ng-model="data.name">');

      scope = $rootScope.$new();
      scope.data = { name: '' };
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should set the ngModel\'s value to the contents of the value attribute', function(){
      expect(scope.data.name).toEqual('Ignacio Ochoa');
      expect(element.val()).toEqual('Ignacio Ochoa');
    });
    
  });

  describe('keepCurrentValue directive on select tag', function() {
    var element, scope;

    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element('\
        <select keep-current-value ng-model="data.city">\
          <option value="25">Santiago</option>\
          <option value="58">Curicó</option>\
          <option selected="selected" value="46">Puerto Montt</option>\
        </select>');

      scope = $rootScope.$new();
      scope.data = { city: '' };
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should set the ngModel\'s value to the contents of the selected option\'s value', function(){
      expect(scope.data.city).toEqual('46');
      expect(element.val()).toEqual('46');
    });
    
  });

  describe('keepCurrentValue directive on select tag without selected option', function() {
    var element, scope;

    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element('\
        <select keep-current-value ng-model="data.city">\
          <option value="25">Santiago</option>\
          <option value="58">Curicó</option>\
          <option value="46">Puerto Montt</option>\
        </select>');

      scope = $rootScope.$new();
      scope.data = { city: '' };
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should set the ngModel\'s value to the contents of the first option\'s value', function(){
      expect(scope.data.city).toEqual('25');
      expect(element.val()).toEqual('25');
    });
    
  });

  describe('keepCurrentValue directive on textarea tag', function() {
    var element, scope;

    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element('<textarea keep-current-value ng-model="data.text">Lorem ipsum dolor sit amet</textarea>');

      scope = $rootScope.$new();
      scope.data = { text: '' };
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should set the ngModel\'s value to the contents of the textarea', function(){
      expect(scope.data.text).toEqual('Lorem ipsum dolor sit amet');
      expect(element.val()).toEqual('Lorem ipsum dolor sit amet');
    });
  });

});

