'use strict';

var TEST_SUPPORTED_ELEMENTS = ['INPUT', 'SELECT', 'TEXTAREA'];

describe('', function() {

  beforeEach(module('platanus.keepValues'));

  describe('keepInputValues directive', function() {
    var element, forms, scope;

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
          <input type="radio" value="MasterCard" ng-model="data.payment" checked>\
          <input type="radio" value="Visa" ng-model="data.payment">\
          <input type="radio" value="Deposit" ng-model="data.payment">\
          <input type="radio" value="None">\
        </div>');

      forms = angular.element('<form name="myForm" keep-input-values=""><input value="123" type="text" ng-model="test" /></form>\
        <div keep-input-values>\
          <form name="formInsideDiv"></form>\
          <form></form>\
        </div>\
      ');

      scope = $rootScope.$new();
      scope.data = { nombre: '' };
      $compile(element)(scope);
      $compile(forms)(scope);
      scope.$digest();
    }));

    it('should add the keepCurrentValue directive to all supported elements (except radio) with an ngModel', function(){
      TEST_SUPPORTED_ELEMENTS.forEach(function(tagName){
        var keepCount = 0;
        var checkElements = element.find(tagName);
        var filteredCheckElements = [];
        angular.forEach(checkElements, function(element) {
          if (angular.element(element).attr('type') !== 'radio')
            filteredCheckElements.push(element);
        });

        angular.forEach(filteredCheckElements, function(checkElement){
          if ( angular.isDefined(angular.element(checkElement).attr('keep-current-value')) ) keepCount++;
        });
        expect(keepCount).toEqual(1);
      });
    });

    it('should add the keepCurrentValue directive to radio inputs with an ngModel', function(){
      var keepCount = 0;
      var checkElements = element.find('input');
      var filteredCheckElements = [];
      angular.forEach(checkElements, function(element) {
        if (angular.element(element).attr('type') === 'radio')
          filteredCheckElements.push(element);
      });

      angular.forEach(filteredCheckElements, function(checkElement){
        if ( angular.isDefined(angular.element(checkElement).attr('keep-current-value')) ) keepCount++;
      });
      expect(keepCount).toEqual(3);
    });


    it('should set form state to pristine', function(){
      expect(scope['myForm'].$pristine).toBe(true);
      expect(scope['formInsideDiv'].$pristine).toBe(true);
    });

  });

});

