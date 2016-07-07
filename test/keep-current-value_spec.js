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


    describe('keepCurrentValue directive on input radio tag', function() {
      var element, scope;

      beforeEach(inject(function($rootScope, $compile) {
        element = angular.element('\
          <input type="radio" value="MasterCard" keep-current-value ng-model="data.payment" checked>\
          <input type="radio" value="Visa" keep-current-value ng-model="data.payment>\
          <input type="radio" value="Deposit" keep-current-value ng-model="data.payment>');

        scope = $rootScope.$new();
        scope.data = { city: '' };
        $compile(element)(scope);
        scope.$digest();
      }));

      it('should set the ngModel\'s value to the contents of the checked option\'s value', function(){
        expect(scope.data.payment).toEqual('MasterCard');
        expect(element.val()).toEqual('MasterCard');
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

  describe('keepCurrentValue directive on multiple select tag', function() {
    var element, scope;

    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element('\
        <select multiple="multiple" keep-current-value ng-model="data.city">\
          <option selected="selected" value="25">Santiago</option>\
          <option value="58">Curicó</option>\
          <option selected="selected" value="46">Puerto Montt</option>\
        </select>');

      scope = $rootScope.$new();
      scope.data = { city: '' };
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should set the ngModel\'s value to the contents of the selected options\' value', function(){
      expect(scope.data.city).toEqual(['25', '46']);
      expect(element.val()).toEqual(['25', '46']);
    });

  });

  describe('keepCurrentValue directive on multiple select tag without selected option', function() {
    var element, scope;

    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element('\
        <select multiple="multiple" keep-current-value ng-model="data.city">\
          <option value="25">Santiago</option>\
          <option value="58">Curicó</option>\
          <option value="46">Puerto Montt</option>\
        </select>');

      scope = $rootScope.$new();
      scope.data = { city: '' };
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should set the ngModel\'s value to an empty array', function(){
      expect(scope.data.city).toEqual([]);
      expect(element.val()).toEqual(null);
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


  describe('keepCurrentValue directive on checked checkboxes (single)', function() {
    var html, scope, elements=[];

    beforeEach(inject(function($rootScope, $compile) {
      elements[0] = angular.element('<input type="checkbox" keep-current-value name="car" ng-model="data.car" checked />');
      elements[1] = angular.element('<input type="checkbox" keep-current-value name="bike" ng-model="data.bike"\
                                        value="bike" checked />');
      scope = $rootScope.$new();
      scope.data = { car: undefined, bike: undefined };
      $compile(elements[0])(scope);
      $compile(elements[1])(scope);
      scope.$digest();
    }));

    describe('without value tag and checked', function() {
      it('should set the ngModel\'s value', function(){
        expect(scope.data.car).toEqual(true);
        expect(elements[0].val()).toEqual('on');
      });
    });

    describe('with value tag and checked', function() {
      it('should set the ngModel\'s value', function(){
        expect(scope.data.bike).toEqual('bike');
        expect(elements[1].val()).toEqual('bike');
      });
    });

  });

  describe('keepCurrentValue directive on unchecked checkboxes (single)', function() {
    var html, scope, elements=[];

    beforeEach(inject(function($rootScope, $compile) {
      elements[0] = angular.element('<input type="checkbox" keep-current-value name="car" ng-model="data.car" />');
      elements[1] = angular.element('<input type="checkbox" keep-current-value name="bike" ng-model="data.bike"\
                                        ng-true-value="bike" ng-false-value="not-a-bike" />');
      scope = $rootScope.$new();
      scope.data = { car: undefined, bike: undefined };
      $compile(elements[0])(scope);
      $compile(elements[1])(scope);
      scope.$digest();
    }));

    describe('without value tag and unchecked', function() {
      it('should set the ngModel\'s value', function(){
        expect(scope.data.car).toEqual(false);
        expect(elements[0].val()).toEqual('');
      });
    });

    describe('with value tag and unchecked', function() {
      it('should set the ngModel\'s value', function(){
        expect(scope.data.bike).toEqual('not-a-bike');
        expect(elements[1].val()).toEqual('');
      });
    });

  });

});

